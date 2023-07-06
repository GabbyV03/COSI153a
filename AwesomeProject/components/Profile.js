import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { Provider, Context } from './Context';

// Profile screen
function ProfileScreen() {
  const { state, updateProfile } = useContext(Context);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const saveProfile = () => {
    updateProfile({ name, phoneNumber });
  };

  return (
    <View style={{ flex: 1, justifyContent: 'space-evenly', alignItems: 'center' }}>
      <Text>Name: {state.name}</Text>
      <Text>Phone Number: {state.phoneNumber}</Text>
      <TextInput
        style={{ width: 500, height: 40, backgroundColor: '#A6EC99' }}
        onChangeText={setName}
        value={name}
        placeholder="Enter your name"
      />
      <TextInput
        style={{ width: 500, height: 40, backgroundColor: '#AAC9D5' }}
        onChangeText={setPhoneNumber}
        value={phoneNumber}
        placeholder="Enter your phone number"
        keyboardType="phone-pad"
      />
      <Button onPress={saveProfile} title="Save Profile" />
    </View>
  );
}

// Stats screen
function StatsScreen() {
  const { state } = useContext(Context);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Name: {state.name}</Text>
      <Text>Phone Number: {state.phoneNumber}</Text>
    </View>
  );
}

// Add Bank screen
function AddBankScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Add Bank Screen</Text>
    </View>
  );
}

const Tab = createBottomTabNavigator();

// App component
function App() {
  return (
    <Provider>
      <Tab.Navigator>
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="Stats" component={StatsScreen} />
        <Tab.Screen name="Add Bank" component={AddBankScreen} />
      </Tab.Navigator>
    </Provider>
  );
}

export default App;