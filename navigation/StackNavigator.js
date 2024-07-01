import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "../page/Home"; // Pindahkan HomeScreen ke folder screens
import WorkoutsScreen from "../page/Workouts";
import Navbar from "../page/component/Navbar";
import Addworkout from "../page/Addworkout";
import Detailworkout from "../page/Detailworkout";
import Editworkout from "../page/Editworkout";
import Userprofile from "../page/Userprofile";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

// Home Stack Navigator
const HomeStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Home" component={HomeScreen} />
  </Stack.Navigator>
);

// Workouts Stack Navigator
const WorkoutsStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="Workouts" component={WorkoutsScreen} />
    <Stack.Screen name="AddWorkout" component={Addworkout} />
    <Stack.Screen name="DetailWorkout" component={Detailworkout} />
    <Stack.Screen name="EditWorkout" component={Editworkout} />
  </Stack.Navigator>
);

// User Profile Stack Navigator
const UserProfileStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="UserProfile" component={Userprofile} />
  </Stack.Navigator>
);

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
          <Tab.Screen name="Home" component={HomeStack} />
          <Tab.Screen name="Workouts" component={WorkoutsStack} />
          <Tab.Screen name="Userprofile" component={UserProfileStack} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default StackNavigator;
