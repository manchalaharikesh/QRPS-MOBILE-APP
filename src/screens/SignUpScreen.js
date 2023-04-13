import { 
        View, 
        Text, 
        Button, 
        TextInput, 
        Dimensions, 
        StyleSheet, 
        ScrollView, 
        Image } from 'react-native'
import React, {useState, useEffect} from 'react'

const SignUpScreen = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rePassword, setRePassword] = useState('')
  const [pin, setPin] = useState('')
  const [rePin, setRePin] = useState('')
  const [appLogo, setAppLogo] = useState('')

  useEffect(() => {
     setAppLogo(require('../assets/images/applogo.png'))
  }, [])

  const handleSignIn = () => {
    console.log(username, password)
  }

  return (
    <ScrollView style={styles.signupContainer}>
      <View style={styles.image}>
        <Image style={{width: 100, height: 100}} source={appLogo} />
      </View>
      <Text style={styles.text}>🆂🅸🅖🅽 🆄🅿</Text>
      <TextInput 
        style={styles.username} 
        inputMode='text' 
        placeholder='Enter Username' 
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput 
        style={styles.password} 
        inputMode='text' 
        secureTextEntry={true} 
        placeholder='Enter Password' 
        onChangeText={(text) => setPassword(text)}
      />
      <TextInput 
        style={styles.password} 
        inputMode='text' 
        secureTextEntry={true} 
        placeholder='Re-Enter Password' 
        onChangeText={(text) => setRePassword(text)}
      />
      <TextInput 
        style={styles.password} 
        inputMode='text' 
        secureTextEntry={true} 
        placeholder='Enter Pin' 
        onChangeText={(text) => setPin(text)}
      />
      <TextInput 
        style={styles.password} 
        inputMode='text' 
        secureTextEntry={true} 
        placeholder='Re-Enter Pin' 
        onChangeText={(text) => setRePin(text)}
      />
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <Button style={styles.button} title='Sign Up' onPress={handleSignIn} />
      </View>
    </ScrollView>
  )
}

const deviceHeight = Math.round(Dimensions.get("screen").height)

const styles = StyleSheet.create({
  signupContainer: {
    height: deviceHeight,
  },
  image: {
    marginTop: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 25
  },
  username: {
    borderWidth: 1,
    borderColor: 'back',
    borderRadius: 5,
    margin: 10
  },
  password: {
    borderWidth: 1,
    borderColor: 'back',
    borderRadius: 5,
    margin: 10,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    elevation: 3,
  },
  buttonText: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
  }
})

export default SignUpScreen