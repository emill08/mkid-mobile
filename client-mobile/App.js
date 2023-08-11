import LandingPage from "./views/LandingPage";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import ProductPage from "./views/ProductPage";
import DetailPage from "./views/DetailPage";
import { ApolloProvider } from "@apollo/client";
import client from "./config";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              name="Home"
              component={LandingPage}
              options={{
                // title: 'My home',
                headerStyle: {
                  backgroundColor: "#D60D00",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Items"
              component={ProductPage}
              options={{
                // title: 'My home',
                headerStyle: {
                  backgroundColor: "#D60D00",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
            <Stack.Screen
              name="Detail"
              component={DetailPage}
              options={{
                // title: 'My home',
                headerStyle: {
                  backgroundColor: "#D60D00",
                },
                headerTintColor: "#fff",
                headerTitleStyle: {
                  fontWeight: "bold",
                },
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}
