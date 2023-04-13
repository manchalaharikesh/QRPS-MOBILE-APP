import { View, Text, ActivityIndicator, StyleSheet, Dimensions, Button, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import { decode } from 'js-base64'
import firestore from '@react-native-firebase/firestore'
import { DataTable } from 'react-native-paper'

const CompleteTransactionScreen = ({route, navigation}) => {

    const recipientId = route.params.recipientId
    let transactionData = route.params.transactionData
    const [stallCode, setStallCode] = useState('')
    const [recipientDocId, setRecipientDocId] = useState('')
    const [recipientDocData, setRecipientDocData] = useState({})
    const [userId, setUserId] = useState('')
    const [pin, setPin] = useState('')
    const [orderData, setOrderData] = useState({})
    const [grandTotal, setGrandTotal] = useState(0)

    const [isLoading, setIsLoading] = useState(true)
    const [customerDocId, setCustomerDocId] = useState('')
    const [customerDocData, setCustomerDocData] = useState({})
    const [isTransactionComplete, setIsTransactionComplete] = useState(false)

    const foodItemsCode = require('../assets/stallsdata/RevFoodItemsCode.json')

    const prepareData = () => {
        transactionData = decode(transactionData).split('_')
        setStallCode(transactionData[0])
        transactionData.shift()
        setUserId(transactionData[0])
        transactionData.shift()
        setPin(transactionData[0])
        transactionData.shift()
        setGrandTotal(transactionData.pop())
        let order = {}
        for(let i=0; i<transactionData.length-1; i+=2){
            let item = transactionData[i]
            let quantity = transactionData[i+1]
            order[item]={quantity: quantity}
        }
        setOrderData(order)
    }

    const getCustomerData = async () => {
        try{
            await firestore()
                  .collection('users')
                  .where('username', '==', userId)
                  .get()
                  .then(data => {
                    setCustomerDocId(data._docs[0]._ref._documentPath._parts[1])
                    setCustomerDocData(data._docs[0]._data)
                  })
            await firestore()
                  .collection('users')
                  .where('username', '==', recipientId)
                  .get()
                  .then(data => {
                    setRecipientDocId(data._docs[0]._ref._documentPath._parts[1])
                    setRecipientDocData(data._docs[0]._data)
                  })
            setIsLoading(false)
        }
        catch (err){
            console.log('Error', err)
        }
    }

    const CompleteTransaction = async () => {
        setIsLoading(true)
        if(customerDocData.balance < grandTotal){
            Alert.alert('No Sufficient Funds 😞')
        }
        else if(!isTransactionComplete){
            try {
                await firestore()
                    .collection('users')
                    .doc(customerDocId)
                    .update({
                        balance: customerDocData.balance - grandTotal
                    })
                await firestore()
                    .collection('users')
                    .doc(recipientDocId)
                    .update({
                        balance: Number(recipientDocData.balance) + Number(grandTotal)
                    })
                Alert.alert('Transaction Successful 🤩')  
                setIsTransactionComplete(true) 
            } catch (error) {
                console.log(error)
            }
        }
        else{
            Alert.alert('Already Transaction Done!!!')
        }
        setIsLoading(false)
    }

    useEffect( () => {
        prepareData()
        if(userId){
            setTimeout(getCustomerData, 1000)
        }
    }, [userId])

    return (
        <View style={styles.container}>
            {isLoading ? 
            <ActivityIndicator style={styles.horizontal} size="large" /> 
            : 
            <View>
                <DataTable>
                    <DataTable.Header>
                        <DataTable.Title>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Item</Text>
                        </DataTable.Title>
                        <DataTable.Title numeric>
                            <Text style={{fontSize: 20, fontWeight: 'bold'}}>Quantity</Text>
                        </DataTable.Title>
                    </DataTable.Header>
                    {Object.keys(orderData).map((item, idx) => (
                        <DataTable.Row key={idx}>
                            <DataTable.Cell>{foodItemsCode[item]}</DataTable.Cell>
                            <DataTable.Cell numeric>{orderData[item]["quantity"]}</DataTable.Cell>
                        </DataTable.Row>
                    ))}
                </DataTable>
                <View style={styles.button}>
                <Text style={styles.grandTotal}>Grand Total: {grandTotal}</Text>
                    {!isTransactionComplete ? 
                        <Button title='Complete Transaction' onPress={() => CompleteTransaction()} />
                        : <Text style={{fontSize: 20, fontWeight: 'bold', color: 'green'}}>Transaction Successful</Text>
                    }
                </View>
            </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: Dimensions.get('screen').height
    },
    horizontal: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      padding: 10,
      justifyContent: 'center',
      alignItems: 'center'
    },
    button: {
        alignItems: 'center',
        marginTop: 15
    },
    grandTotal: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: 'green'
    }
});

export default CompleteTransactionScreen