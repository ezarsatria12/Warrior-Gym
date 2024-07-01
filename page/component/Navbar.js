import React from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

const Navbar = ({ navigation }) => {
  return (
    <View style={styles.navbar}>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Icon name="home" size={30} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Workouts")}>
        <Icon name="list" size={30} color="#FFF" />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate("Userprofile")}>
        <Icon name="person" size={30} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  navbar: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#333",
    padding: 16,
  },
});

export default Navbar;
