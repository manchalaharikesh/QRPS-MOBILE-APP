import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'

// import screens

import HomeScreen from '../screens/HomeScreen'
import StallsScreen from '../screens/StallsScreen'
import QrGenerator from '../components/QrGenerator'
import SendMoneyScreen from '../screens/SendMoneyScreen'
import FoodOrderScreen from '../screens/FoodOrderScreen'
import PinScreen from '../screens/PinScreen'
import RecipientDetailsScreen from '../screens/RecipientDetailsScreen'
import CompleteTransactionScreen from '../screens/CompleteTransactionScreen'

const HomeNavigation = () => {
  const Stack = createNativeStackNavigator()
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} options={{headerShown: false}} />
      <Stack.Screen name='QrGenerator' component={QrGenerator} />
      <Stack.Screen name='StallsScreen' component={StallsScreen} />
      <Stack.Screen name='SendMoneyScreen' component={SendMoneyScreen} />
      <Stack.Screen name='FoodOrderScreen' component={FoodOrderScreen} />
      <Stack.Screen name='PinScreen' component={PinScreen} />
      <Stack.Screen name='RecipientDetailsScreen' component={RecipientDetailsScreen} />
      <Stack.Screen name='CompleteTransactionScreen' component={CompleteTransactionScreen} />
    </Stack.Navigator>
  )
}

export default HomeNavigation