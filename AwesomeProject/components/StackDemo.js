import * as React from 'react';
import {Button,Text,View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Calculator from './Calculator'
import QuickNotes from './QuickNotes';

const Stack = createNativeStackNavigator();

const HomeScreen = ({navigation}) => {
    return (
     <View>
            <Button
                title="Your Profile!"
                onPress={() =>
                navigation.navigate('Profile', {name: 'TBD'})
                }
            />
            <Button
                title="Calculator"
                onPress={() =>
                navigation.navigate('Calculator') 
                }
            />
            <Button
                title="Off the top"
                onPress={() =>
                navigation.navigate('QuickNotes') 
                }
            />
      </View>
    );
  };
  const ProfileScreen = ({navigation, route}) => {
    return <Text>Welcome {route.params.name}! Here you will be able to keep track of your stats and achievements!</Text>;
  };

const MyStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{title: 'What do you want to do today?'}}
        />
        <Stack.Screen name="Profile" component={ProfileScreen} />
        <Stack.Screen name="Calculator" component={Calculator} />
        <Stack.Screen name="QuickNotes" component={QuickNotes} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MyStack;
