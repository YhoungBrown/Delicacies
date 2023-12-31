import { View, Text, SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import { useNavigation } from '@react-navigation/native';


const PreparingOrderScreen = () => {
const navigation = useNavigation()

useEffect(() => {
    setTimeout(() => {
        navigation.navigate("Delivery")
    }, 4000)
}, [])

  return (
    <SafeAreaView className="py-5 bg-[#00CCBB] flex-1 justify-center items-center">
      <Animatable.Image 
        source={require("../assets/carton-bike.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="w-96 h-60"
      />
       
      <Animatable.Text 
        animation="slideInUp"
        iterationCount={1}
        className="text-lg my-10 text-center text-white font-bold"
      >
        Waiting For Restaurant to place your order
      </Animatable.Text>

      <Progress.Bar size={60} indeterminate={true} borderColor='white' color='white'/>
      

      
    </SafeAreaView>
  )
}

export default PreparingOrderScreen