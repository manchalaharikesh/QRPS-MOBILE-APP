import { View, Text, StyleSheet, Button } from 'react-native'
import React, {useEffect, useState} from 'react'

// import components

import Card from '../components/Card'

const FoodOrderScreen = ({route, navigation}) => {
  const stallName = route.params.stallName
  const [cartData, setCartData] = useState({})
  const [grandTotal, setGrandTotal] = useState(0)

  const incrementQuantity = (productName) => {
    let temp = {...cartData}
    temp[productName].quantity += 1
    if(!(temp[productName].isSelected)) temp[productName].isSelected=true
    setCartData(temp)
    handleGrandTotal()
  }

  const decrementQuantity = (productName) => {
    let temp = {...cartData}
    if(temp[productName].quantity > 0){
      temp[productName].quantity -= 1
    }
    if(temp[productName].quantity == 0){
      temp[productName].isSelected = false
    }
    setCartData(temp)
    handleGrandTotal()
  }

  const handleGrandTotal = () => {
    let temp = 0
    let price = 0
    let quantity = 0
    Object.keys(cartData).map((item) => {
      quantity = cartData[item].quantity
      price = cartData[item].price

      temp += quantity*price
    })
    setGrandTotal(temp)
  }
  
  useEffect(() => {
    if(Object.keys(cartData).length==0){
      let items = []
      let prices = []
      let cartItems = {}
      const data = require('../assets/stallsdata/FoodDetails.json')
      const stallData = data[stallName]
      Object.keys(stallData).map((item) => {
        items.push(stallData[item]["name"])
        prices.push(stallData[item]["price"])
        cartItems[stallData[item]["name"]]={}
        cartItems[stallData[item]["name"]]["isSelected"]=false
        cartItems[stallData[item]["name"]]["quantity"]=0
        cartItems[stallData[item]["name"]]["price"]=stallData[item]["price"]
        cartItems[stallData[item]["name"]]["subtotal"]=0
      })
      setCartData(cartItems)
    }
  }, [])

  return (
    <View style={styles.cartContainer}>
      {
        Object.keys(cartData).map((item, id) => (
          <Card 
            keys={id} 
            productName = {item} 
            productDetails = {cartData[item]} 
            incrementQuantity = {incrementQuantity} 
            decrementQuantity = {decrementQuantity} 
          />
        ))
      }
      {grandTotal ? <Text style={styles.grandTotal}>Grand Total: {grandTotal}</Text> : <></>}
      {grandTotal ? <Button title="Proceed" onPress={() => navigation.navigate('PinScreen', {cartData: cartData, stallName: stallName})} /> : <></>}
    </View>
  )
}

const styles = StyleSheet.create({
  cartContainer: {
    alignItems: 'center'
  },
  grandTotal: {
    fontSize: 25,
    marginTop: 40,
    fontWeight: 'bold',
    color: 'black'
  }

})

export default FoodOrderScreen