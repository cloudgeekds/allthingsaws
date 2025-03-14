import { Box, Header, Container, SpaceBetween} from "@cloudscape-design/components";
import BaseAppLayout from "../components/base-app-layout";
import { useState } from "react";
import { ChatMessages } from '../components/ChatMessages';
import { ChatInput } from '../components/ChatInput';

export default function HomePage() {
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (message: string) => {
    if (!message.trim()) return;

    setIsLoading(true);
    // Add user message to chat
    const userMessage = {
      type: 'user',
      content: message,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMessage]);

    try {
      // Your existing chat API call logic here
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();
      
      // Add bot response to chat
      const botMessage = {
        type: 'bot',
        content: data.message,
        timestamp: new Date().toISOString(),
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setIsLoading(false);
      setInputMessage('');
    }
  };
 
  return (
    <BaseAppLayout
      content={
        <Container>
          <SpaceBetween size="l">
            <Box margin={{ top: 'l' }}>
              <Header
                variant="h1"
                description="🚀 Tu éxito estudiantil es nuestra prioridad"
              >
                🤖 Tutor Académico LatamAI
              </Header>
            </Box>
            
            {/* Chat Container */}
            <Box>
              {/* Chat Messages Area */}
              <div style={{ height: '30vh', overflowY: 'auto', marginBottom: '20px' }}>
                <ChatMessages messages={messages} />
              </div>
              
              {/* Chat Input Area */}
              <Box>
                <ChatInput
                  value={inputMessage}
                  onChange={setInputMessage}
                  onSend={handleSendMessage}
                  isLoading={isLoading}
                />
              </Box>
            </Box>
          </SpaceBetween>
        </Container>
      }
    />
  );
}
