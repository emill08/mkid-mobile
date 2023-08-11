import { StatusBar } from "expo-status-bar";
import React, { useEffect, useState } from "react";
import { Text, View, Image, ActivityIndicator } from "react-native";
import { useQuery } from "@apollo/client";
import { PER_PRODUCT } from "../query/index";

export default function DetailPage({ route }) {
  const { id } = route.params;
  // console.log(id);
  const [loading, setLoading] = useState(true);

  const { data, error } = useQuery(PER_PRODUCT, {
    variables: { productId: id },
  });
  // console.log(data?.perProduct);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);

  const product = data?.perProduct;

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
    return (
      <View className="flex-1 items-center justify-center bg-black">
        <View className="container ml-3 py-8">
          <View className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <View>
              <Image
                className="mt-1"
                source={{ uri: product?.mainImage }}
                style={{ height: 300, width: 400 }}
              />
            </View>
            <View>
              <Text className="text-2xl font-semibold text-white mb-2">
                {product?.name}
              </Text>
              <Text className="text-white mb-2">
                Owner: {product?.User.email}
              </Text>
              <Text className="text-white mb-2">{product?.Category.name}</Text>
              <Text className="text-green-600 text-lg font-semibold mb-4">
                {product?.price.toLocaleString(undefined, {
                  style: "currency",
                  currency: "IDR",
                })}
              </Text>
              <Text className="text-white mb-4">{product?.description}</Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {product?.Images.map((image, index) => (
                  <Image
                    key={index} // Make sure to use a unique key for each dynamic image
                    className="mt-1"
                    source={{ uri: image?.imageUrl }}
                    style={{
                      height: 130,
                      width: "50%",
                      margin: 5,
                    }}
                  />
                ))}
              </View>
            </View>
          </View>
        </View>

        <StatusBar style="auto" />
      </View>
    );
  }
}
