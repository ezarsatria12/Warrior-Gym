import React, { useState } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Modal from "react-native-modal";
import { Snackbar } from "react-native-paper";

const Addworkout = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [note, setNote] = useState("");
  const [progress, setProgress] = useState(0);
  const [exercises, setExercises] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    reps: "",
    sets: "",
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const exerciseOptions = [
    { label: "Battle Ropes", value: "Battle Ropes" },
    { label: "Bench Press", value: "Bench Press" },
    { label: "Bicep Curls", value: "Bicep Curls" },
    { label: "Box Jumps", value: "Box Jumps" },
    { label: "Burpees", value: "Burpees" },
    { label: "Calf Raises", value: "Calf Raises" },
    { label: "Cable Crossovers", value: "Cable Crossovers" },
    { label: "Cable Rows", value: "Cable Rows" },
    { label: "Chest Press", value: "Chest Press" },
    { label: "Deadlift", value: "Deadlift" },
    { label: "Decline Bench Press", value: "Decline Bench Press" },
    { label: "Dumbbell Flyes", value: "Dumbbell Flyes" },
    { label: "Face Pulls", value: "Face Pulls" },
    { label: "Farmer's Walk", value: "Farmer's Walk" },
    { label: "Hammer Curls", value: "Hammer Curls" },
    { label: "High Knees", value: "High Knees" },
    { label: "Hip Thrusts", value: "Hip Thrusts" },
    { label: "Incline Bench Press", value: "Incline Bench Press" },
    { label: "Jumping Jacks", value: "Jumping Jacks" },
    { label: "Kettlebell Swings", value: "Kettlebell Swings" },
    { label: "Lat Pulldowns", value: "Lat Pulldowns" },
    { label: "Leg Curls", value: "Leg Curls" },
    { label: "Leg Extensions", value: "Leg Extensions" },
    { label: "Leg Press", value: "Leg Press" },
    { label: "Leg Raises", value: "Leg Raises" },
    { label: "Lunges", value: "Lunges" },
    { label: "Mountain Climbers", value: "Mountain Climbers" },
    { label: "Overhead Tricep Extension", value: "Overhead Tricep Extension" },
    { label: "Plank", value: "Plank" },
    { label: "Pull Ups", value: "Pull Ups" },
    { label: "Push Ups", value: "Push Ups" },
    { label: "Russian Twists", value: "Russian Twists" },
    { label: "Seated Rows", value: "Seated Rows" },
    { label: "Shoulder Press", value: "Shoulder Press" },
    { label: "Sit Ups", value: "Sit Ups" },
    { label: "Skull Crushers", value: "Skull Crushers" },
    { label: "Squats", value: "Squats" },
    { label: "T-Bar Rows", value: "T-Bar Rows" },
    { label: "Tricep Dips", value: "Tricep Dips" },
  ];


  const handleAddExercise = () => {
    if (newExercise.name && newExercise.reps && newExercise.sets) {
      setExercises([...exercises, newExercise]);
      setNewExercise({ name: "", reps: "", sets: "" });
      setShowModal(false);
    } else {
      Alert.alert("Error", "Please fill all exercise details.");
    }
  };

  const handleSaveWorkout = async () => {
    if (!title || !date || !time || !note) {
      setSnackbarMessage("Please fill in all fields.");
      setSnackbarVisible(true);
      return;
    }
    const newWorkout = {
      id,
      title,
      date: date.toDateString(),
      time: time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      note,
      progress,
      exercises: [...exercises],
    };

    try {
      const existingWorkouts = await AsyncStorage.getItem("workouts");
      const workouts = existingWorkouts ? JSON.parse(existingWorkouts) : [];
      workouts.push(newWorkout);
      await AsyncStorage.setItem("workouts", JSON.stringify(workouts));
      console.log("Workout saved locally:", newWorkout);
    } catch (error) {
      console.error("Failed to save workout locally", error);
    }

    fetch("http://192.168.18.25:3000/workouts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newWorkout),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Workout saved to backend:", data);
      })
      .catch((error) => {
        console.error("Failed to save workout to backend", error);
        Alert.alert("Error", "Failed to save workout to backend");
      });

    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Add Workout</Text>
        <TouchableOpacity onPress={handleSaveWorkout}>
          <Icon name="checkmark" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity onPress={() => setShowDatePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Date"
          value={date.toDateString()}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showDatePicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={(event, selectedDate) => {
            setShowDatePicker(false);
            if (selectedDate) setDate(selectedDate);
          }}
        />
      )}
      <TouchableOpacity onPress={() => setShowTimePicker(true)}>
        <TextInput
          style={styles.input}
          placeholder="Time"
          value={time.toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}
          editable={false}
          pointerEvents="none"
        />
      </TouchableOpacity>
      {showTimePicker && (
        <DateTimePicker
          value={time}
          mode="time"
          display="default"
          onChange={(event, selectedTime) => {
            setShowTimePicker(false);
            if (selectedTime) setTime(selectedTime);
          }}
        />
      )}
      <TextInput
        style={styles.input}
        placeholder="Note"
        value={note}
        onChangeText={setNote}
      />
      <View style={styles.addExerciseHeader}>
        <Text style={styles.subHeader}>Exercises</Text>
        <TouchableOpacity onPress={() => setShowModal(true)}>
          <Icon name="add-circle" size={30} color="#000" />
        </TouchableOpacity>
      </View>
      {exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseCard}>
          <Text style={styles.exerciseText}>{exercise.name}</Text>
          <Text style={styles.exerciseText}>Reps: {exercise.reps}</Text>
          <Text style={styles.exerciseText}>Sets: {exercise.sets}</Text>
        </View>
      ))}
      <Modal
        isVisible={showModal}
        onBackdropPress={() => setShowModal(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Add Exercise</Text>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Icon name="close" size={30} color="#000" />
              </TouchableOpacity>
            </View>
            <RNPickerSelect
              onValueChange={(value) =>
                setNewExercise({ ...newExercise, name: value })
              }
              items={exerciseOptions}
              style={pickerSelectStyles}
              placeholder={{ label: "Select Exercise", value: null }}
            />
            <TextInput
              style={styles.input}
              placeholder="Reps"
              value={newExercise.reps}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, reps: text })
              }
              keyboardType="numeric"
            />
            <TextInput
              style={styles.input}
              placeholder="Sets"
              value={newExercise.sets}
              onChangeText={(text) =>
                setNewExercise({ ...newExercise, sets: text })
              }
              keyboardType="numeric"
            />
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleAddExercise}
            >
              <Text style={styles.saveButtonText}>Save Exercise</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        action={{
          label: "OK",
          onPress: () => {
            setSnackbarVisible(false);
          },
        }}
      >
        {snackbarMessage}
      </Snackbar>
    </ScrollView>
  );
};

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
  inputAndroid: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
    fontSize: 16,
  },
});

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
  },
  input: {
    height: 40,
    borderColor: "#000",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  addExerciseHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
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
  },
  exerciseText: {
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  saveButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default Addworkout;
