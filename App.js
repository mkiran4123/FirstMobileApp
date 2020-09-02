import "react-native-gesture-handler";
import React, { Component } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "./pages/LoginScreen";
import MovieScreen from "./pages/AddScreen";
import MovieDisplay from "./pages/DisplayScreen";

const Stack = createStackNavigator();

export default class App extends Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Movie" component={MovieScreen} />
          <Stack.Screen name="Display" component={MovieDisplay} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
