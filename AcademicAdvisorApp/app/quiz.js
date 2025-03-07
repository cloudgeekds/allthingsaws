import { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function QuizScreen() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  // Placeholder quiz data - will be replaced with AI-generated questions
  const quizQuestions = [
    {
      question: "What is the primary purpose of a database index?",
      options: [
        "To improve query performance",
        "To store data",
        "To backup data",
        "To validate data"
      ],
      correctAnswer: 0
    },
    {
      question: "Which data structure is commonly used in implementing indexes?",
      options: [
        "Array",
        "Linked List",
        "B-tree",
        "Queue"
      ],
      correctAnswer: 2
    },
    // Add more questions as needed
  ];

  const handleAnswerClick = (selectedOption) => {
    if (selectedOption === quizQuestions[currentQuestion].correctAnswer) {
      setScore(score + 1);
    }

    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < quizQuestions.length) {
      setCurrentQuestion(nextQuestion);
    } else {
      setShowScore(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Practice Quiz</Text>

      <ScrollView style={styles.scrollView}>
        {showScore ? (
          <View style={styles.scoreCard}>
            <Text style={styles.scoreText}>
              You scored {score} out of {quizQuestions.length}
            </Text>
            <Pressable 
              style={styles.button}
              onPress={() => {
                setCurrentQuestion(0);
                setScore(0);
                setShowScore(false);
              }}>
              <Text style={styles.buttonText}>Try Again</Text>
            </Pressable>
          </View>
        ) : (
          <View style={styles.questionCard}>
            <Text style={styles.questionNumber}>
              Question {currentQuestion + 1}/{quizQuestions.length}
            </Text>
            <Text style={styles.questionText}>
              {quizQuestions[currentQuestion].question}
            </Text>
            <View style={styles.optionsContainer}>
              {quizQuestions[currentQuestion].options.map((option, index) => (
                <Pressable
                  key={index}
                  style={styles.optionButton}
                  onPress={() => handleAnswerClick(index)}>
                  <Text style={styles.optionText}>{option}</Text>
                </Pressable>
              ))}
            </View>
          </View>
        )}
      </ScrollView>

      <Link href="/" asChild>
        <Pressable style={styles.backButton}>
          <Text style={styles.backButtonText}>Back to Menu</Text>
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  questionCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  questionNumber: {
    fontSize: 16,
    color: '#6c757d',
    marginBottom: 10,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 20,
  },
  optionsContainer: {
    gap: 10,
  },
  optionButton: {
    backgroundColor: '#e9ecef',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  optionText: {
    fontSize: 16,
  },
  scoreCard: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  backButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
