import React, { useState, useEffect } from 'react'
import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'

// import stalls list data
import data from '../assets/stallsdata/StallsList.json'

const StallsScreen = ({navigation}) => {

  const [stallsList, setStallsList] = useState(data)

  return (
    <View style={styles.StallsScreenContainer}>
      {
        Object.keys(stallsList).map((stallId, id) => (
          <View style={styles.ButtonStyles}>
            <Button key={id} title={stallsList[stallId]["stallName"]} onPress={() => navigation.navigate('FoodOrderScreen', {stallName:stallsList[stallId]["stallName"]})} />
          </View>
        ))
      }
    </View>
  )
}

const deviceHeight = Math.round(Dimensions.get('screen').height)
const styles = StyleSheet.create({
  StallsScreenContainer: {
    height: deviceHeight,
    marginTop: deviceHeight/3,
    alignItems: 'center'
  },
  ButtonStyles: {
    marginTop: 7,
    marginBottom: 7
  },
})

export default StallsScreen