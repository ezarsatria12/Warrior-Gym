import React, { useState } from "react";

import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { Avatar, Button, Card } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons";
import CustomSnackbar from "./component/Snackbar";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native"; 

import Workoutcard from "./component/Workoutcard";

const Workoutsscreen = () => {
    const [search, setSearch] = useState("");
    const insets = useSafeAreaInsets();
    const navigation = useNavigation(); 
    
  const workouts = [
    {
      title: "Chest Workout",
      date: "2024-06-30",
      time: "10:00 AM",
      note: "Focus on upper chest",
      progress: 90,
    },
    {
      title: "Leg Day",
      date: "2024-07-01",
      time: "8:00 AM",
      note: "Squats and lunges",
      progress: 75,
    },
    {
      title: "Back Workout",
      date: "2024-07-02",
      time: "6:00 PM",
      note: "Deadlifts and rows",
      progress: 60,
    },
    // Tambahkan data latihan lainnya di sini
  ];

  const filteredWorkouts = workouts.filter((workout) =>
    workout.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top + 20 }]}>
      <View style={styles.head}>
        <Text style={styles.header}>Workout</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddWorkout")}>
          <Icon name="add" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search"
        value={search}
        onChangeText={(text) => setSearch(text)}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {filteredWorkouts.map((workout, index) => (
          <Workoutcard
            key={index}
            title={workout.title}
            date={workout.date}
            time={workout.time}
            note={workout.note}
            progress={workout.progress}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
    
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  searchInput: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
});

export default Workoutsscreen;
