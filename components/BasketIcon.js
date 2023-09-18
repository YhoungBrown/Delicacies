import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigation } from '@react-navigation/native'
import { selectBasketTotal } from '../features/basketSlice'
import { ShoppingCartIcon} from 'react-native-heroicons/outline';

const BasketIcon = () => {

const basketItems = useSelector((state) => state.basket.items)
const navigation = useNavigation()
const basketTotal = useSelector(selectBasketTotal)

if (basketItems.length === 0) return null; 

  return (
    <View className="absolute bottom-10 w-full z-50">
    <TouchableOpacity 
    onPress={() => navigation.navigate("Basket")} 
    className="mx-5 bg-[#00CCBB] p-4 rounded-lg flex-row items-center space-x-1">
      <Text className="font-extrabold text-white text-lg bg-[#01A296] py-1 px-2">{basketItems.length}</Text>
      <View className="flex-1 flex-row justify-center space-x-2">
        <ShoppingCartIcon size={30} color="white"/>
        <Text className="font-extrabold text-white text-lg text-center">View Basket</Text>
      </View>
        <Text className="font-extrabold text-lg text-white">£{basketTotal}</Text>
    </TouchableOpacity>
    </View>
  );
};

export default BasketIcon