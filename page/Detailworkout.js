import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-elements";

const Detailworkout = ({ route, navigation }) => {
  const { workout } = route.params;
  const [checkedExercises, setCheckedExercises] = useState(
    workout.exercises.map(() => false)
  );
  const [progress, setProgress] = useState(workout.progress);

  useEffect(() => {
    updateProgress();
  }, [checkedExercises]);

  const updateProgress = () => {
    const completedExercises = checkedExercises.filter((checked) => checked).length;
    const totalExercises = checkedExercises.length;
    const newProgress = Math.round((completedExercises / totalExercises) * 100);
    setProgress(newProgress);

    // Update progress in backend
    fetch(`http://192.168.18.7:3000/workouts/${workout.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ progress: newProgress }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Progress updated in backend:", data);
      })
      .catch((error) => {
        console.error("Failed to update progress in backend", error);
        Alert.alert("Error", "Failed to update progress in backend");
      });
  };

  const handleCheckboxToggle = (index) => {
    const newCheckedExercises = [...checkedExercises];
    newCheckedExercises[index] = !newCheckedExercises[index];
    setCheckedExercises(newCheckedExercises);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>{workout.title}</Text>
        <TouchableOpacity onPress={() => navigation.navigate("EditWorkout", {workout})}>
          <Icon name="pencil" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Date:</Text>
        <Text style={styles.value}>{workout.date}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Time:</Text>
        <Text style={styles.value}>{workout.time}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Note:</Text>
        <Text style={styles.value}>{workout.note}</Text>
      </View>
      <View style={styles.details}>
        <Text style={styles.label}>Progress:</Text>
        <Text style={styles.value}>{progress}%</Text>
      </View>
      <Text style={styles.subHeader}>Exercises</Text>
      {workout.exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseCard}>
          <View>
            <Text style={styles.exerciseText}>{exercise.name}</Text>
            <Text style={styles.exerciseText}>Reps: {exercise.reps}</Text>
            <Text style={styles.exerciseText}>Sets: {exercise.sets}</Text>
          </View>
          <CheckBox
            checked={checkedExercises[index]}
            onPress={() => handleCheckboxToggle(index)}
            checkedColor="#6F763F"
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 50,
    backgroundColor: "#fff",
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  details: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    fontWeight: "bold",
    marginRight: 10,
  },
  value: {
    fontSize: 16,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginVertical: 20,
  },
  exerciseCard: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  exerciseText: {
    fontSize: 16,
  },
});

export default Detailworkout;
