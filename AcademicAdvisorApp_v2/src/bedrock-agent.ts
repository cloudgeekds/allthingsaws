/**
 * @fileoverview Service for interacting with AWS Bedrock Agents
 * This service handles all communication with Bedrock Agents, including the Creative Explorer
 * and Unblocker agents. It manages agent sessions, handles return controls, and processes
 * agent responses.
 */

import {
    BedrockAgentRuntimeClient,
    InvokeAgentCommand,
    type SessionState,
    type InvocationResultMember,
  } from "@aws-sdk/client-bedrock-agent-runtime";
  import { fetchAuthSession } from "aws-amplify/auth";

  
  /**
   * Represents the rationale provided by the agent for its actions
   * @interface TraceRationale
   */
  interface TraceRationale {
    /** The explanatory text provided by the agent */
    text: string;
    /** Unique identifier for the trace */
    traceId: string;
  }
  
  /**
   * Represents the orchestration trace from the agent
   * @interface OrchestrationTrace
   */
  interface OrchestrationTrace {
    /** Optional rationale for the agent's decisions */
    rationale?: TraceRationale;
  }
  
  /**
   * Extended trace information from the agent
   * @interface ExtendedTracePart
   */
  interface ExtendedTracePart {
    /** Orchestration trace containing decision rationale */
    orchestrationTrace?: OrchestrationTrace;
    /** Additional trace information */
    [key: string]: OrchestrationTrace | undefined;
  }
  
  /**
   * Response type for agent invocations
   * @interface AgentResponse
   */
  interface AgentResponse {
    /** Unique identifier for the agent session */
    sessionId: string;
    /** The agent's response text */
    completion: string;
  }
  
  /**
   * Service class for managing interactions with AWS Bedrock Agents
   * @class AgentService
   */
  class AgentService {
    /** Bedrock client instance for API communication */
    private bedrockClient: BedrockAgentRuntimeClient;
    /** Alias ID for the Bedrock agent */
    private readonly agentAliasId = "SIBJXIZWJM";
  
    /**
     * Creates an instance of AgentService.
     * Initializes the Bedrock client with AWS credentials.
     */
    constructor() {
      this.bedrockClient = new BedrockAgentRuntimeClient({
        region: "us-east-2",
        credentials: async () => {
          const { credentials } = await fetchAuthSession();
          if (!credentials) throw new Error("No credentials available");
          return credentials;
        },
      });
    }
  
    /**
     * Logs an activity to the application store
     * @param message - The activity message to log
     * @param status - The status of the activity
     * @param type - The type of activity
     */
    private logActivity(message: string, status: 'running' | 'waiting' | 'complete', type: any) {
    //  const addActivity = useAppStore.getState().addActivity;
    //  addActivity(message, status, type);
    }
  
    /**
     * Invokes a Bedrock agent with the specified prompt and handles the response
     * @param prompt - The prompt to send to the agent
     * @param sessionId - Unique identifier for the session
     * @param invocationId - Optional ID for continuing a conversation
     * @param returnControlResults - Optional results from previous return control actions
     * @param agentId - Optional ID for the agent
     * @returns Promise resolving to an AgentResponse
     * @throws Error if the agent invocation fails or completion is undefined
     */
    async invokeAgent(
      prompt: string, 
      sessionId: string, 
      invocationId?: string,
      returnControlResults?: InvocationResultMember[],
      agentId?: string,
    ): Promise<AgentResponse> {
      this.logActivity(`Agent is thinking`, 'running', 'agent');
  
      const sessionState: SessionState | undefined = invocationId && returnControlResults 
        ? {
            invocationId,
            returnControlInvocationResults: returnControlResults,
          }
        : undefined;
  
      try {
        let completion = "";
        let isFirstChunk = true;
  
        if (!agentId) {
          throw new Error("Agent ID is required");
        }
  
        const command = new InvokeAgentCommand({
          agentId: "ISAOJB31TG",
          agentAliasId: this.agentAliasId,
          sessionId,
          inputText: prompt,
          sessionState,
          enableTrace: true
        });
  
        const response = await this.bedrockClient.send(command);
  
        if (!response.completion) {
          const error = "Agent completion is undefined";
          this.logActivity(`Error: ${error}`, 'complete', 'error');
          throw new Error(error);
        }
  
        for await (const event of response.completion) {
          if (event.chunk?.bytes) {
            if (isFirstChunk) {
              isFirstChunk = false;
            }
            const decodedChunk = new TextDecoder().decode(event.chunk.bytes);
            completion += decodedChunk;
          } else if (event.trace) {
            console.log('Trace event received:', JSON.stringify(event.trace, null, 2));
            const trace = event.trace.trace as ExtendedTracePart;
            const rationale = trace.orchestrationTrace?.rationale?.text;
            console.log('Rationale:', trace, rationale);
            if (rationale) {
              // Process rationale if it contains [Summary]
              let processedRationale = rationale.includes('[Summary]') 
                ? rationale.split('[Summary]')[1]?.trim() 
                : rationale;
              
              // Remove numbered points like (1), (2), etc. and convert to paragraph
              processedRationale = processedRationale
                ?.replace(/\(\d+\)\s*/g, '') // Remove (number) patterns
                ?.replace(/\n+/g, ' ') // Replace line breaks with spaces
                ?.trim();
                
              this.logActivity(processedRationale || rationale, 'running', 'trace');
            }
          } else if (event.returnControl) {
            // Handle tool invocation using the tool handler
          
  
            // Continue the conversation with the tool result
          
          }
        }
  
        this.logActivity(`Agent response complete`, 'complete', 'agent');
        
        return {
          sessionId,
          completion
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        this.logActivity(`Error: ${errorMessage}`, 'complete', 'error');
        console.error("Agent invocation error:", error);
        throw error;
      }
    }
  }
  
  export const agentService = new AgentService(); 