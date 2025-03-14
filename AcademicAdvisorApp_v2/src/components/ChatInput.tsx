import { Button, Input, SpaceBetween } from "@cloudscape-design/components";

interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: (message: string) => void;
  isLoading: boolean;
}

export const ChatInput = ({ value, onChange, onSend, isLoading }: ChatInputProps) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (value.trim()) {
      onSend(value);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <SpaceBetween direction="horizontal" size="xs">
        <Input
          value={value}
          onChange={({ detail }) => onChange(detail.value)}
          placeholder="Escribe tu mensaje aquí..."
          disabled={isLoading}
        />
        <Button
          variant="primary"
          loading={isLoading}
          disabled={!value.trim() || isLoading}
          formAction="submit"
        >
          Enviar
        </Button>
      </SpaceBetween>
    </form>
  );
};
