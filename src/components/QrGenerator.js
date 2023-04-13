import { View, Text, Button, StyleSheet, Dimensions } from 'react-native'
import React, {useState, useEffect} from 'react'
import {encode} from 'js-base64'
import QrCode from 'react-native-qrcode-svg'

export default function QrGenerator({route, navigation}) {
  const username = route.params.username
  const pin = route.params.pin
  const stallName = route.params.stallName
  const cartData = route.params.cartData
  const itemCodes = require('../assets/stallsdata/FoodItemsCode.json')
  const stallsCodes = require('../assets/stallsdata/StallsCode.json')
  const stallCode = stallsCodes[stallName]
  const [dataString, setDataString] = useState('')
  let grandTotal = 0

  useEffect(() => {
    let data = ''
    data += stallCode + '_' + username + '_' + pin + '_'

    Object.keys(cartData).map((item) => {
      if(cartData[item].isSelected){
        data += itemCodes[item] + '_'
        data += cartData[item].quantity + '_'
        grandTotal += cartData[item]["price"] * cartData[item].quantity
      }
    })

    data += grandTotal
    data = encode(data)
    setDataString(data)

  }, []);

  return (
    <View style={styles.qrGeneratorContainer}>
      <Text style={styles.text}>Scan QR to complete the Transaction! 😍</Text>
      <View style={styles.qr}>
        {dataString!=='' ? 
          <QrCode 
            value = {dataString}
            size = {250}
            color = 'black'
            backgroundColor = 'white'
          />
        : <></>}
       </View>
    </View>
  )
}

const deviceHeight = Math.round(Dimensions.get('window').height)
const styles = StyleSheet.create({
  qrGeneratorContainer: {
    alignItems: 'center',
    marginTop: deviceHeight/6,
    height: deviceHeight,
  },
  text: {
    color: 'black',
    fontSize: 18, 
    marginBottom: 20
  },
  qr: {
    borderWidth: 1,
    borderColor: 'black'
  }
})