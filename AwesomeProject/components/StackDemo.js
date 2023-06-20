import * as React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './Calculator';
import QuickNotes from './QuickNotes';
import BudgetTracker from './BudgetTracker';

const Stack = createNativeStackNavigator();

const HomeScreen = ({ navigation }) => {
  const navigateToProfile = () => {
    navigation.navigate('Profile', { name: 'TBD' });
  };

  const navigateToCalculator = () => {
    navigation.navigate('Calculator');
  };

  const navigateToQuickNotes = () => {
    navigation.navigate('QuickNotes');
  };

  const navigateToBudgetTracker = () => {
    navigation.navigate('BudgetTracker');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>What do you want to do today?</Text>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#007BFF'}]}
          onPress={navigateToProfile}
        >
          <Text style={styles.buttonText}>Your Profile!</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#FFC107'}]}
          onPress={navigateToCalculator}
        >
          <Text style={styles.buttonText}>Calculator</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#DC3545'}]}
          onPress={navigateToQuickNotes}
        >
          <Text style={styles.buttonText}>Off the top</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, {backgroundColor: '#8AFF8A'}]}
          onPress={navigateToBudgetTracker}
        >
          <Text style={styles.buttonText}>Budget Tracker</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProfileScreen = ({ navigation, route }) => {
  return <Text>Welcome {route.params.name}! Here you will be able to keep track of your stats and achievements!</Text>;
};

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="QuickNotes" component={QuickNotes} />
        <Stack.Screen name="BudgetTracker" component={BudgetTracker} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  buttonContainer: {
    marginBottom: 16,
  },
  button: {
    borderRadius: 50,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderWidth: 2,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000', // Shadow color
    textShadowOffset: { width: 1, height: 1 }, // Shadow offset
    textShadowRadius: 2, // Shadow radius
  },
});

export default MyStack;