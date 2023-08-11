import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { AntDesign, Feather } from "@expo/vector-icons";
import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../query/index";

export default function ProductPage({ navigation }) {
  const { data, error } = useQuery(GET_PRODUCTS);
  // console.log(data.Products);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "black",
        }}
      >
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  if (data) {
    const renderItem = ({ item }) => (
      <TouchableOpacity
        className="bg-gray-800 rounded-lg shadow-lg mx-4 p-6 mt-5 flex"
        onPress={() => navigation.navigate("Detail", { id: item.id })}
      >
        <View className="grid grid-cols-2 gap-4">
          <View>
            <Text className="text-xl text-white font-semibold">
              {item.name}
            </Text>
            <Text className="mt-2 text-gray-400">{item.description}</Text>
            <Text className="text-gray-400 mt-2">
              {item.price.toLocaleString(undefined, {
                style: "currency",
                currency: "IDR",
              })}
            </Text>
          </View>
          <View className="flex justify-center items-center">
            <Image
              className="mt-1"
              source={{ uri: item.mainImage }}
              style={{ height: 100, width: 160 }}
            />
          </View>
        </View>
      </TouchableOpacity>
    );

    return (
      <View className="flex-1 items-center bg-black">
        {/* Add paddingBottom */}
        <FlatList
          data={data?.Products}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
        />
        {/* <View className="bg-white w-full absolute inset-x-0 bottom-0 rounded-t-full h-24">
        <View className="p-7 flex flex-row justify-center">
          <TouchableOpacity
            onPress={() => navigation.navigate("Home")}
            className="items-center mr-28"
          >
            <AntDesign name="home" size={48} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Items")}
            className="items-center"
          >
            <Feather name="shopping-bag" size={48} color="red" />
          </TouchableOpacity>
        </View>
      </View> */}
        <StatusBar style="auto" />
      </View>
    );
  }
}
