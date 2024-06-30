import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";

const Addworkout = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [note, setNote] = useState("");
  const [exercises, setExercises] = useState([
    { name: "", reps: "", sets: "" },
  ]);

  const handleAddExercise = () => {
    setExercises([...exercises, { name: "", reps: "", sets: "" }]);
  };

  const handleExerciseChange = (index, field, value) => {
    const newExercises = [...exercises];
    newExercises[index][field] = value;
    setExercises(newExercises);
  };

  const handleSaveWorkout = () => {
    // Save the workout (you might want to integrate with a backend or state management)
    console.log("Workout saved:", { title, date, time, note, exercises });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.head}>
        <TouchableOpacity onPress={() => navigation.navigate("AddWorkout")}>
          <Icon name="left" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Workout</Text>
        <TouchableOpacity onPress={() => navigation.navigate("AddWorkout")}>
          <Icon name="add" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Date"
        value={date}
        onChangeText={setDate}
      />
      <TextInput
        style={styles.input}
        placeholder="Time"
        value={time}
        onChangeText={setTime}
      />
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={note}
        onChangeText={setNote}
      />
      <Text style={styles.subHeader}>Exercises</Text>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseContainer}>
          <TextInput
            style={styles.input}
            placeholder="Exercise Name"
            value={exercise.name}
            onChangeText={(text) => handleExerciseChange(index, "name", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Reps"
            value={exercise.reps}
            onChangeText={(text) => handleExerciseChange(index, "reps", text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Sets"
            value={exercise.sets}
            onChangeText={(text) => handleExerciseChange(index, "sets", text)}
          />
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={handleAddExercise}>
        <Text style={styles.addButtonText}>Add Exercise</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSaveWorkout}>
        <Text style={styles.saveButtonText}>Save Workout</Text>
      </TouchableOpacity>
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
  head: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exerciseContainer: {
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Addworkout;
