import { StatusBar } from "expo-status-bar";
import {
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  Linking,
} from "react-native";
import { MaterialCommunityIcons, Feather } from "@expo/vector-icons";

export default function LandingPage({ navigation }) {
  return (
    <View className="flex-1 bg-gray-950">
      <ImageBackground
        source={{
          uri: "https://w.wallha.com/ws/13/mjJCwpUu.png",
        }}
        className="flex-1"
      >
        <View className="flex flex-1 items-center justify-center opacity-75 bg-black">
          <Text className="text-4xl font-bold text-white">Hi There!</Text>
          <Text className="text-md text-justify mx-5 py-5 text-white">
            Welcome to the MKID Application! Explore our collection of
            mechanical keyboards designed for optimal typing experiences. From
            satisfying clicks to smooth precision, discover a range of designs
            and customizable features to suit your style. Find the perfect
            keyboard to elevate your typing to new heights. Welcome to a world
            where precision meets passion.
          </Text>
          <Image
            source={require("../assets/logomkid.png")}
            style={{ height: 70, width: 160 }}
          />
        </View>

        <View className="bg-white w-full absolute inset-x-0 bottom-0 rounded-t-full h-24">
          <View className="p-7 flex flex-row justify-center">
            <TouchableOpacity
              onPress={() =>
                Linking.openURL("https://www.mechanicalkeyboards.co.id")
              }
              className="items-center mr-28"
            >
              <MaterialCommunityIcons name="web" size={44} color="red" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Items")}
              className="items-center"
            >
              <Feather name="shopping-bag" size={42} color="red" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="auto" />
    </View>
  );
}
