import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { MainScreen } from './src/screens/MainScreen';
import { SummaryScreen } from './src/screens/SummaryScreen';
import { RecommendationScreen } from './src/screens/RecommendationScreen.js';
import { QuizScreen } from './src/screens/QuizScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen name="Main" component={MainScreen} options={{ title: 'Academic Advisor' }} />
        <Stack.Screen name="Summary" component={SummaryScreen} options={{ title: 'Course Summary' }} />
        <Stack.Screen name="Recommendation" component={RecommendationScreen} options={{ title: 'Recommendations' }} />
        <Stack.Screen name="Quiz" component={QuizScreen} options={{ title: 'Quiz Generator' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}