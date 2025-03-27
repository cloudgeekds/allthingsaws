import { useState } from "react";
import { 
  Box, 
  Header, 
  Container, 
  SpaceBetween,
  Button,
  TextContent
} from "@cloudscape-design/components";
import BaseAppLayout from "../components/base-app-layout";
import { ChatMessages } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';
import LoadingBar from "@cloudscape-design/chat-components/loading-bar";
import { agentService } from '../bedrock-agent';

interface Chat {
  role: string;
  text: string;
}

export default function HomePage() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessageAgent = async (messageText: string) => {
    const response = await agentService.invokeAgent(
      messageText,
      "chat-session",
      undefined,
      undefined,
      "SIBJXIZWJM"
    );
    return response;
  };

  const handleSendMessage = async (message: string) => {
    if (message.trim() !== "") {
      setIsLoading(true);
      
      try {
        // Add user message to chat
        const newChats = [...chats, { role: "user", text: message.trim() }];
        setChats(newChats);
        setInputMessage("");

        // Get response from Bedrock Agent
        const response = await sendMessageAgent(message.trim());

        // Add bot response to chat
        setChats(prevChats => [...prevChats, {
          role: 'assistant',
          text: response.completion
        }]);

      } catch (error) {
        console.error('Error in handleSendMessage:', error);
        setChats(prevChats => [...prevChats, {
          role: 'assistant',
          text: "Lo siento, hubo un error al procesar tu mensaje. Por favor intenta de nuevo."
        }]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <BaseAppLayout
      content={
        <Container
          header={
            <Header
              variant="h1"
              description="🚀 Tu éxito estudiantil es nuestra prioridad"
            >
               🤖 Tutor Académico LatamAI
            </Header>
          }
        >
          <SpaceBetween size="l">
            {/* Chat Container */}
            <Box>
              {/* Chat Messages Area */}
              <div style={{
                height: '60vh',
                overflowY: 'auto',
                marginBottom: '20px',
                padding: '20px',
                display: 'flex',
                flexDirection: 'column-reverse',
                backgroundColor: '#f8f8f8',
                borderRadius: '8px',
                border: '1px solid #eaeded'
              }}>
                {/* Loading Indicator */}
                {isLoading && (
                  <Container>
                    <Box
                      margin={{ bottom: "xs", left: "l" }}
                      color="text-body-secondary"
                    >
                      Generando respuesta...
                    </Box>
                    <LoadingBar variant="gen-ai" />
                  </Container>
                )}

                {chats
                  .slice()
                  .reverse()
                  .map((chat, index) => (
                    <ChatMessages
                      key={index}
                      messages={[{
                        type: chat.role === 'user' ? 'user' : 'bot',
                        content: chat.text,
                        timestamp: new Date().toISOString()
                      }]}
                    />
                  ))}
              </div>
              
              {/* Input and Controls Area */}
              <SpaceBetween size="m">
                {/* Chat Input Area */}
                <ChatInput
                  value={inputMessage}
                  onChange={setInputMessage}
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
                
                {/* Clear Chat Button */}
                <Box textAlign="right">
                  <Button
                    onClick={() => setChats([])}
                    disabled={chats.length === 0 || isLoading}
                    variant="link"
                  >
                    Limpiar conversación
                  </Button>
                </Box>
              </SpaceBetween>
            </Box>
          </SpaceBetween>
        </Container>
      }
    />
  );
}