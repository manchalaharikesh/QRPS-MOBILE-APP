import { View, Text, StyleSheet, TextInput, Button } from 'react-native'
import React, {useState} from 'react'

const RecipientDetailsScreen = ({route, navigation}) => {
  
    const [username, setUsername] = useState('')
    const [reUsername, setReUsername] = useState('')
    const transactionData = route.params.transactionData

    const handleProceed = () => {
        if(username === reUsername){
            navigation.pop()
            navigation.navigate('CompleteTransactionScreen', {transactionData:transactionData, recipientId:username})
            console.log(username, reUsername, transactionData)
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
            <TextInput 
                style={styles.username} 
                inputMode='text' 
                placeholder='Re-Enter Username' 
                onChangeText={(text) => setReUsername(text)}
            />
            <Button title='Proceed' onPress={() => handleProceed()} />
        </View>
  )
}

const styles = StyleSheet.create({
    username: {
        borderWidth: 1,
        borderColor: 'black',
        borderRadius: 5,
        margin: 10,
    }
})

export default RecipientDetailsScreen