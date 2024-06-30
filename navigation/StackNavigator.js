import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import HomeScreen from "../page/Home"; // Pindahkan HomeScreen ke folder screens
import WorkoutsScreen from "../page/Workouts";
import Navbar from "../page/component/Navbar";
import Addworkout from "../page/Addworkout";
import Detailworkout from "../page/Detailworkout";
import Editworkout from "../page/Editworkout";

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
          <Tab.Screen name="Workouts" component={WorkoutsScreen} />
          <Stack.Screen name="AddWorkout" component={Addworkout} />
          <Stack.Screen name="Detailworkout" component={Detailworkout} />
          <Stack.Screen name="Editworkout" component={Editworkout} />
          {/* Tambahkan screen lainnya di sini */}
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default StackNavigator;
