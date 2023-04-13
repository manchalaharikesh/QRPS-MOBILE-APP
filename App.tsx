/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import AsyncStorage from '@react-native-async-storage/async-storage';

// import screens

import HomeNavigation from './src/navigation/HomeNavigation';
import QrScanScreen from './src/screens/QrScanScreen'
import SignInScreen from './src/screens/SignInScreen';
import SignUpScreen from './src/screens/SignUpScreen';

function App(): JSX.Element {
  
  const homeNavigation = 'Lander'
  const scannerName = 'Scanner'
  const signInName = 'SignIn'
  const signUpName = 'SignUp'
  const storeUsername = 'storeUsername'
  const Tab = createBottomTabNavigator();
  const [hasLoggedIn, setHasLoggedIn] = useState(false)
  const sessionData = require('./src/assets/sessiondata/logindata.json')

  // useEffect(() => {
  //   setHasLoggedIn(sessionData["hasLoggedIn"])
  // }, [])

  return (
    <NavigationContainer>

      {/* {hasLoggedIn ?  */}

      <Tab.Navigator
        initialRouteName={homeNavigation}
        screenOptions={({route})=>({
          tabBarIcon: ({focused, color, size}) => {
            let iconName='home'
            let rn = route.name

            if(rn === route.name){
              iconName = focused ? 'home' : 'home-outline'
            }
            else if(rn === route.name){
              iconName = focused ? 'ios-qr-scanner' : 'ios-qr-scanner'
            }
            return <Ionicons name={iconName} color={color} size={size} />
          },
        })}
      >
        <Tab.Screen name={homeNavigation} component={HomeNavigation} options={{headerShown: false}} />
        <Tab.Screen name={scannerName} component={QrScanScreen} />
      </Tab.Navigator> 

      {/* :
      <Tab.Navigator
        initialRouteName={signInName}
        screenOptions={({route})=>({
          tabBarIcon: ({focused, color, size}) => {
            let iconName='home'
            let rn = route.name

            if(rn === route.name){
              iconName = focused ? 'home' : 'home-outline'
            }
            else if(rn === route.name){
              iconName = focused ? 'ios-qr-scanner' : 'ios-qr-scanner'
            }
            return <Ionicons name={iconName} color={color} size={size} />
          },
        })}
      >
        <Tab.Screen name={signInName} component={SignInScreen} options={{headerShown: false}} initialParams={{setHasLoggedIn: setHasLoggedIn}} />
        <Tab.Screen name={signUpName} component={SignUpScreen} options={{headerShown: false}} />
      </Tab.Navigator>
      } */}
      
    </NavigationContainer>
  )
}

export default App;
