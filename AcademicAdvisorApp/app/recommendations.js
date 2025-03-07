import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { Link } from 'expo-router';

export default function RecommendationScreen() {
  // Placeholder data - will be replaced with real data later
  const recommendations = [
    {
      id: 1,
      title: 'Introduction to Machine Learning',
      description: 'Based on your interest in Data Science',
      level: 'Intermediate',
      credits: 3
    },
    {
      id: 2,
      title: 'Advanced Database Systems',
      description: 'Complements your current coursework',
      level: 'Advanced',
      credits: 4
    },
    // Add more recommendations as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Recommendations</Text>
      
      <ScrollView style={styles.scrollView}>
        {recommendations.map((course) => (
          <View key={course.id} style={styles.courseCard}>
            <Text style={styles.courseTitle}>{course.title}</Text>
            <Text style={styles.courseDescription}>{course.description}</Text>
            <View style={styles.courseDetails}>
              <Text style={styles.detailText}>Level: {course.level}</Text>
              <Text style={styles.detailText}>Credits: {course.credits}</Text>
            </View>
          </View>
        ))}
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
    fontSizeize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  scrollView: {
    flex: 1,
    marginBottom: 20,
  },
  courseCard: {
    backgroundColor: '#f8f9fa',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e9ecef',
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  courseDescription: {
    fontSize: 14,
    color: '#495057',
    marginBottom: 8,
  },
  courseDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  detailText: {
    fontSize: 14,
    color: '#6c757d',
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
