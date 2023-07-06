import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Calculator from './Calculator';
import QuickNotes from './QuickNotes';
import BudgetTracker from './BudgetTracker';
import Receipt from './Receipt';
import Profile from './Profile';

const Stack = createNativeStackNavigator();

const ButtonWithIcon = ({ text, icon, onPress, backgroundColor }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Image source={icon} style={styles.icon} />
      </View>
      <Text style={styles.label}>{text}</Text>
    </TouchableOpacity>
  );
};

const HomeScreen = ({ navigation }) => {
  const navigateToProfile = () => {
    navigation.navigate('Profile');
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

  const navigateToReceipt = () => {
    navigation.navigate('Receipt');
  };

  return (
    <View style={styles.container}>
      <ButtonWithIcon
        text="Your Profile!"
        icon={require('../assets/ProfileIcon.png')}
        onPress={navigateToProfile}
        backgroundColor="#007BFF"
      />
      <ButtonWithIcon
        text="Calculator"
        icon={require('../assets/CalculatorIcon.png')}
        onPress={navigateToCalculator}
        backgroundColor="#FFC107"
      />
      <ButtonWithIcon
        text="Quick Notes"
        icon={require('../assets/QuickListIcon.png')}
        onPress={navigateToQuickNotes}
        backgroundColor="#DC3545"
      />
      <ButtonWithIcon
        text="Budget Tracker"
        icon={require('../assets/BudgetTrackerIcon.png')}
        onPress={navigateToBudgetTracker}
        backgroundColor="#8AFF8A"
      />
      <ButtonWithIcon
        text="Receipt Manager"
        icon={require('../assets/ReceiptIcon.png')}
        onPress={navigateToReceipt}
        backgroundColor="#A287D0"
      />
    </View>
  );
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
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="QuickNotes" component={QuickNotes} />
        <Stack.Screen name="BudgetTracker" component={BudgetTracker} />
        <Stack.Screen name="Receipt" component={Receipt} />
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
    backgroundColor: '#EBEAEA',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  button: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconContainer: {
    width: 120,
    height: 120,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  icon: {
    width: 120,
    height: 120,
    borderRadius: 20,
    borderColor: '#000000',
  },
  label: {
    fontSize: 14,
    textAlign: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});

export default MyStack;