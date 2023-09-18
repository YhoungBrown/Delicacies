import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, {useState} from 'react'
import { urlFor } from '../sanity'
import { useDispatch, useSelector } from 'react-redux'


import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/solid'
import { addToBasket, removeFromBasket } from '../features/basketSlice'




const DishRow = (props) => {
const {id, name, description, price, image} = props

const [isPressed, setisPressed] = useState(false)

const dispatch = useDispatch()
//const itemsWithId = useSelector((state, id) => state.basket.items.filter((item) => item.id === id))
const basketItems = useSelector((state) => state.basket.items)
const itemsWithId = basketItems.filter((item) => item.id === id)

const addItemToBasket = () => {
  dispatch(addToBasket({id, name, description, price, image}))
}

const removeItemFromBasket = () => {

  dispatch(removeFromBasket({id}))
  
  if(!itemsWithId.length > 0) return;
}

//console.log(items)
  return (
    <>
    <TouchableOpacity onPress={() => setisPressed(!isPressed)} className={`bg-white border p-4 border-gray-200 ${isPressed && "border-b-0"}`}>
      <View className="flex-row">
        <View className="flex-1 pr-2">
          <Text className="text-xl mb-1">{name}</Text>
          <Text className="text-gray-400">{description}</Text>
          <Text className="text-gray-400 mt-2">
              <Text>£{price}</Text>
          </Text>
        </View>
      
        <View className="justify-center">
          <Image 
          style={{borderWidth: 1, borderColor:"#F3F3F4" }}
          source={{uri: urlFor(image).url()}} 
          className="h-20 w-20 bg-gray-300 p-4"
          />
        </View>
      </View>
    </TouchableOpacity>

    {isPressed && (
      <View className="bg-white px-4">
        <View className="flex-row space-x-2 items-center pb-3">
          <TouchableOpacity disabled={!itemsWithId.length} onPress={removeItemFromBasket}>
              <MinusCircleIcon
              color={itemsWithId.length > 0 ? "#00CCBB" : "gray"}
              size={40}
               />
          </TouchableOpacity>

          <Text>{itemsWithId.length}</Text>

          <TouchableOpacity onPress={addItemToBasket}>
              <PlusCircleIcon
              color="#00CCBB"
              size={40}
               />
          </TouchableOpacity>
        </View>
      </View>
    )}
    </>
  )
}

export default DishRow