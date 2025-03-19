import { Box, Cards } from "@cloudscape-design/components";

interface Message {
  type: 'user' | 'bot';
  content: string;
  timestamp: string;
}

interface ChatMessagesProps {
  messages: Message[];
}

export const ChatMessages = ({ messages }: ChatMessagesProps) => {
  return (
    <Cards
      items={messages}
      cardsPerRow={[{ cards: 1 }]}
      cardDefinition={{
        header: (item) => (
          <Box variant="strong">
            {item.type === 'user' ? '👤 Tú' : '🤖 LatamAI'}
          </Box>
        ),
        sections: [
          {
            id: "message",
            content: (item) => (
              <div style={{
                backgroundColor: item.type === 'user' ? '#f0f0f0' : '#e1f5fe',
                padding: '10px',
                borderRadius: '8px',
                marginBottom: '4px'
              }}>
                {item.content}
              </div>
            ),
          },
        ],
      }}
    />
  );
};
