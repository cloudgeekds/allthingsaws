// import { useEffect, useState } from 'react'
import { TextContent, Box, Header, Container, SpaceBetween, Button } from "@cloudscape-design/components";
import BaseAppLayout from "../components/base-app-layout";

export default function HomePage() {
  const handleLink = (url: string) => {
    window.open(url, '_blank');
  };

  return (
    <BaseAppLayout
      content={
        <Container>
          <SpaceBetween size="l">
            <Box margin={{ top: 'l' }}>
              <Header
                variant="h1"
                description="Tutor académico de LatamU"
              >
                🤖Tutor Académico LatamAI
              </Header>
            </Box>
          </SpaceBetween>
        </Container>
      }
    />
  );
}