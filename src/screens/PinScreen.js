import React, { useRef, useState } from 'react'
import { TextInput, View, StyleSheet, Text, Button, Alert } from 'react-native'

const PinScreen = ({route, navigation}) => {
  const inputRefs = useRef([])
  let disabled = false
  let cartData = route.params.cartData
  let stallName = route.params.stallName
  const [pincode, setPincode] = useState(['', '', '', '', '', ''])
  const [username, setUsername] = useState('')

  const onChangeValue = (text, index) => {
    const newValue = pincode.map((item, valueIndex) => {
      if (valueIndex === index) {
          return text
      }
      return item
    })
    setPincode(newValue)
  }

  const handleChange = (text, index) => {
    onChangeValue(text, index)

    if (text.length !== 0) {
      return inputRefs?.current[index + 1]?.focus()
    }

    return inputRefs?.current[index - 1]?.focus()
  }

  const handleBackspace = (event, index) => {
    const { nativeEvent } = event

    if (nativeEvent.key === 'Backspace') {
      handleChange('', index)
    }
  }

  const handleSubmitPin = () => {
    let pin =''
    pincode.map((digit) => {
      pin+=digit
    })
    if(pin.length===6){
      navigation.pop();
      let name = username.toLowerCase()
      setUsername(name)
      navigation.navigate('QrGenerator', {cartData: cartData, username: username, pin: pin, stallName: stallName})
    }
    else{
      Alert.alert('Enter Pin Completely ✏️')
    }
  }

  return (
    <View>
      <TextInput 
        style={styles.username} 
        inputMode='text' 
        placeholder='Enter Username' 
        onChangeText={(text) => setUsername(text)}
      />
      <View style={styles.container}>
        {[0, 1, 2, 3, 4, 5].map((item, index) => (
          <TextInput
            ref={ref => {
              if (ref && !inputRefs.current.includes(ref)) {
                inputRefs.current = [...inputRefs.current, ref]
              }
            }}
            key={index}
            inputMode='numeric'
            secureTextEntry
            maxLength={1}
            contextMenuHidden
            selectTextOnFocus
            editable={!disabled}
            style={styles.input}
            keyboardType="decimal-pad"
            testID={`OTPInput-${index}`}
            onChangeText={text => handleChange(text, index)}
            onKeyPress={event => handleBackspace(event, index)}
          />
        ))}
      </View>
      <View style={styles.button}>
        <Button title = 'Generate QR' onPress = {() => handleSubmitPin()} />   
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 25,
    padding: 10
  },
  input: {
    fontSize: 24,
    textAlign: 'center',
    width: 45,
    height: 55,
    borderColor: 'black',
    borderWidth: 1
  },
  button: {
    alignItems: 'center',
    marginTop: 15
  },
  username: {
    borderWidth: 1,
    borderColor: 'back',
    borderRadius: 5,
    margin: 10,
  },
})

export default PinScreen