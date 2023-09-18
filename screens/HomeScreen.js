import { View, Text, SafeAreaView, Image, TextInput, ScrollView, } from 'react-native'
import React, {useEffect, useLayoutEffect, useState} from 'react'
import { useNavigation } from '@react-navigation/native'

import { UserIcon, ChevronDownIcon, MagnifyingGlassIcon, AdjustmentsVerticalIcon} from 'react-native-heroicons/outline';

import Categories from '../components/Categoriess';
import FeaturedRow from '../components/FeaturedRow';
import sanityClient from '../sanity';


export default function HomeScreen() {
  const navigation = useNavigation();
  const [featuredCategories, setFeaturedCategories] = useState([])

  useLayoutEffect(()=> {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    sanityClient.fetch(`*[_type == "featured"]{
      ..., restaurants[]-> {
        ..., dishes[]->
      }
    }`).then(data => {setFeaturedCategories(data)})
  }, [])
  {/**the stuffs(path) inside the backticks above is our sanity.io path to our data generated from sanity vision using groq query*/}
  {/**console.log(featuredCategories)*/}

  return (
    <SafeAreaView className="bg-white pt-5" > 
       {/*Header*/}
          <View className= "flex flex-row items-center mx-4 px-4">
              <Image 
                source={{
                  uri: "https://links.papareact.com/wru"
                }}
                className="h-7 w-7 bg-gray-300 p-4 rounded-full"
              />

                <View className="p-2 flex-1 ">
                  <Text className="font-bold text-gray-400 text-xs">
                      Deliver Now!
                  </Text>
                  
                  <Text className="font-bold text-xl">
                    Current Location
                    <ChevronDownIcon size={20} color="#00CCBB"/>
                  </Text>
                </View>
                
                <UserIcon size={30} color="#00CCBB"/>
          </View>

          {/*search Section*/}

          <View className="flex-row  items-center space-x-2 pb-2 mx-4 px-2">
                <View className="flex-row space-x-2 bg-gray-200 p-3 flex-1">
                  <MagnifyingGlassIcon size={20} color="gray"/>
                  <TextInput 
                    placeholder='Restaurant and Cuisines'
                    keyboardType='default'
                  />
                </View>
                <AdjustmentsVerticalIcon color="#00CCBB"/>
          </View>

          {/*Body*/}

          <ScrollView className="bg-gray-100">
         
              {/**Categories */}
                <Categories />
                

              {/** Featured */}
              {featuredCategories?.map(category =>(
                <FeaturedRow
                key={category._id} 
                id={category._id}
                title={category.name}
                description={category.short_discription}
                
              /> 
              ))}
              


             
          </ScrollView>
    </SafeAreaView>
  )
}
