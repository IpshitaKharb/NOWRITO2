import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import TypingScreen from '../screens/TypingScreen'
import HomeScreen from '../screens/HomeScreen'

const Stack = createStackNavigator()

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen name="TypingScreen" component={TypingScreen} />
    </Stack.Navigator>
  )
}

export default StackNavigator
