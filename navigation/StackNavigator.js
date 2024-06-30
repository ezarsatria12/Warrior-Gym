import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../page/Home"; // Pindahkan HomeScreen ke folder screens
import Workouts from "../page/Workouts";
import Navbar from "../page/component/Navbar";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const StackNavigator = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: { display: "none" },
          }}
          tabBar={(props) => <Navbar {...props} />}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Workouts" component={Workouts} />
          {/* Tambahkan screen lainnya di sini */}
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default StackNavigator;
