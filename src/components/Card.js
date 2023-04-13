import { DarkTheme } from '@react-navigation/native'
import React from 'react'
import { View, Text, StyleSheet, Dimensions, Button } from 'react-native'

const Card = (props) => {
    let productName = props.productName
    let productDetails = props.productDetails

    return (
        <View style={styles.cardContainer}>
            <Text style={styles.title}>
                {productName}
            </Text>
            <Text style={styles.price}>
                Price: {productDetails["price"]}
            </Text>
            <View style={styles.selector}>
                <Button title='-' onPress={() => props.decrementQuantity(productName)} />
                <Text style={styles.quantity}>{productDetails.quantity}</Text>
                <Button title='+' onPress={() => props.incrementQuantity(productName)} />    
            </View>
        </View>
    )
}

const deviceHeight = Math.round(Dimensions.get("window").height)
const deviceWidth = Math.round(Dimensions.get("window").width)

const styles = StyleSheet.create({
    cardContainer: {
        width: deviceWidth - 25,
        height: deviceHeight / 6,
        marginTop: 15,
        borderRadius: 15,
        borderColor: 'black',
        borderWidth: 2,
        shadowColor: 'grey',
        shadowOffset: {
            width: 2,
            height: 2
        },
        opacity: 0.75,
        elevation: 2
    },
    title: {
        paddingLeft: 10,
        fontWeight: 'bold',
        fontSize: 25,
        fontFamily: 'times',
        color: 'black'
    },
    price: {
        paddingLeft: 10,
        fontWeight: 'bold',
        color: 'black'
    },
    selector: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        flexDirection: 'row',
        marginTop: 20,
        marginRight: 10
    },
    quantity: {
        width: 35,
        textAlign: 'center',
        fontWeight: 'bold',
        color: 'black',
        fontSize: 15
    }
})

export default Card