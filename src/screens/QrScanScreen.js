import { 
        View, 
        Text, 
        StyleSheet, 
        Dimensions, 
        Button,
        TouchableOpacity,
        Alert} from 'react-native'
import NetInfo from '@react-native-community/netinfo'
import React, {useState, useEffect} from 'react'
import QRCodeScanner from 'react-native-qrcode-scanner';
import { RNCamera } from 'react-native-camera';

const QrScanScreen = ({navigation}) => {

  const [connectionStatus, setConnectionStatus] = useState(false)
  const [isReactive, setIsReactive] = useState(true)
  const [openScanner, setOpenScanner] = useState(false)
  
  const verifyConnection = () => {
    NetInfo.fetch().then(networkState => {
      let status = networkState.isConnected ? true : false
      setConnectionStatus(status)
    })
  }
  
  useEffect(() => {
    verifyConnection()
    setOpenScanner(false)
  }, [])

  const onSuccess = (qrdata) => {
    setIsReactive(false)
    setOpenScanner(false)
    navigation.navigate('RecipientDetailsScreen', {transactionData: qrdata.data})
  }

  const startScanner = () => {
    setOpenScanner(true)
    setIsReactive(true)
  }
  
  return (
    <View>
      {
        connectionStatus ?
        <View>
          { openScanner ?
          <QRCodeScanner
            onRead={data => onSuccess(data)}
            reactivate={isReactive}
            topContent={
              <Text style={styles.centerText}>
                Go to{' '}
                <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on
                your computer and scan the QR code.
              </Text>
            }
            bottomContent={
              <TouchableOpacity style={styles.buttonTouchable}>
                <Text style={styles.buttonText}>OK. Got it!</Text>
              </TouchableOpacity>
            }
          /> : <></>}
          <Button title='Open QR Scanner' onPress={() => startScanner()} />
        </View>
        :
        <View style={styles.noInternetContainer}>
          <Text style={styles.noInternet}>🅽🅾 🅸🅽🆃🅴🆁🅽🅴🆃</Text>
          <Button title={'Retry'} onPress={() => verifyConnection()} />
        </View>
      }
    </View>
  )
}

const deviceHeight = Dimensions.get('screen').height
const deviceWidth = Dimensions.get('screen').width

const styles = StyleSheet.create({
  noInternetContainer: {
    fontSize: 25,
    alignItems: 'center',
    justifyContent: 'center',
    height: deviceHeight / 2
  },
  noInternet: {
    fontSize: 25
  },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: 'black'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  }
})

export default QrScanScreen