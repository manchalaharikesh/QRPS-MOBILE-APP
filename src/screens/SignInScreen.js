import { 
        View, 
        Text, 
        Button, 
        TextInput, 
        StyleSheet, 
        Dimensions,
        Image,
        ScrollView } from 'react-native'
import React, {useState, useEffect} from 'react'

const SignInScreen = ({route, navigation}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [appLogo, setAppLogo] = useState('')
  const [sessionData, setSessionData] = useState({})

  useEffect(() => {
    setAppLogo(require('../assets/images/applogo.png'))
    setSessionData(require('../assets/sessiondata/logindata.json'))
  }, []);

  const handleSignIn = () => {
    if(username!=='' && password!=''){
      
      sessionData["username"] = username
      sessionData["hasLoggedIn"] = true
      fs.writeFile("./newClient.json", data, err=>{
        if(err){
          console.log("Error writing file" ,err)
        } else {
          console.log('JSON data is written to the file successfully')
        }
      })
      
    }
    navigation.navigate('Lander')
  }

  return (
    <ScrollView style={styles.signinContainer}>
      <View style={styles.image}>
        <Image style={{width: 100, height: 100}} source={appLogo} />
      </View>
      <Text style={styles.text}>🆂🅸🅖🅽 🅸🅽</Text>
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
      <View style={{marginLeft: 10}}>
        <Text onPress={() => navigation.navigate('SignUp')}>Create an Account?</Text>
      </View>
      <View style={{alignItems: 'flex-end', marginRight: 10}}>
        <Button style={styles.button} title='Sign In' onPress={handleSignIn} />
      </View>
    </ScrollView>
  )
}

const deviceHeight = Math.round(Dimensions.get("screen").height)

const styles = StyleSheet.create({
  signinContainer: {
    height: deviceHeight,
  },
  image: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    fontSize: 30,
    textAlign: 'center',
    marginTop: 15
  },
  username: {
    borderWidth: 1,
    borderColor: 'back',
    borderRadius: 5,
    margin: 10,
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

export default SignInScreen