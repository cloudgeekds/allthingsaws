import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { ChatInput } from '../components/ChatInput';

export const SummaryScreen = () => {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');

  const generateSummary = async () => {
    // Here we'll later integrate with Bedrock
    // For now, just show a placeholder response
    setSummary('Summary will be generated using Bedrock...');
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.summaryContainer}>
        {summary ? (
          <Text style={styles.summaryText}>{summary}</Text>
        ) : (
          <Text style={styles.placeholder}>
            Enter text or upload course material to generate a summary
          </Text>
        )}
      </ScrollView>
      <ChatInput
        value={text}
        onChangeText={setText}
        onSubmit={generateSummary}
        placeholder="Enter text to summarize..."
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  summaryContainer: {
    flex: 1,
    padding: 15,
  },
  summaryText: {
    fontSize: 16,
    lineHeight: 24,
  },
  placeholder: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});