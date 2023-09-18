import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ArrowRightIcon } from 'react-native-heroicons/outline'

import RestaurantCard from './RestaurantCard'
import sanityClient from '../sanity'

const FeaturedRow = ({id, title, description}) => {
  const [restaurants, setRestaurants] = useState([])

  useEffect(() => {
    sanityClient.fetch(`*[_type == "featured" && _id == $id]{
      ..., restaurants[]-> {
        ..., dishes[]->
      }
    }[0]
    `, {id}).then(data => {
      setRestaurants(data?.restaurants);
    })
  }, [id])
  {/**the second parameter above id ought to be written like this id : id meaning the first one taliking aboult the id with the dollar sign and the second talking about the id passed as props. however since they have same name, we can just write one more reason we wrote just id */}

  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold text-lg">{title}</Text>
        <ArrowRightIcon color="#00CCBB"/>
      </View>

      <Text className="text-xs text-gray-500 px-4">{description}
      </Text>

      <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      showsHorizontalScrollIndicator={false}

      className="pt-4"
      >
            {restaurants?.map(restaurant => (
              // return (
                <RestaurantCard
                key={restaurant._id} 
                id={restaurant._id}
                imgUrl={restaurant.image}
                title={restaurant.name}
                rating={restaurant.rating}
                gendre={restaurant.type?.name}
                address={restaurant.address}
                short_description={restaurant.short_description}
                dishes={restaurant.dishes}
                long={restaurant.long}
                lat={restaurant.lat}
                />
                //);
  //console.log(restaurant.name)
            ))}

      </ScrollView>

    </View>
  )
}

export default FeaturedRow