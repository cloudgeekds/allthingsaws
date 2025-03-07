import { View, Text, StyleSheet } from 'react-native';
import { Link } from 'expo-router';

export default function SummaryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Course Summary</Text>
      <Link href="/" style={styles.link}>Go back</Link>
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
  link: {
    color: '#007AFF',
    fontSize: 16,
  },
});
