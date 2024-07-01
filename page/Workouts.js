import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Workoutcard from "./component/Workoutcard";

const Workoutsscreen = () => {
  const [search, setSearch] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const fetchWorkouts = async () => {
    try {
      const response = await fetch("http://192.168.18.7:3000/workouts");
      const data = await response.json();
      setWorkouts(data);
    } catch (error) {
      console.error("Failed to fetch workouts:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchWorkouts();
    }, [])
  );

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
            onPress={() => navigation.navigate("Detailworkout", { workout })}
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
