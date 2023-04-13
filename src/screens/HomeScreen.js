import React from 'react'
import {View, Text, Button, StyleSheet, Dimensions} from 'react-native'

const HomeScreen = ({navigation}) => {

  return (
    <View style={styles.HomeScreenContainer}>
      <Button title='View Stalls' onPress={() => navigation.navigate('StallsScreen')} />
      <Button title='Send Money' onPress={() => navigation.navigate('SendMoneyScreen')} />
    </View>
  )  
}

const styles = StyleSheet.create({
  HomeScreenContainer: {
    height: Math.round(Dimensions.get('window').height),
    justifyContent: 'space-around',
    alignItems: 'center'
  }
})

export default HomeScreen