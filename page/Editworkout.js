import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import RNPickerSelect from "react-native-picker-select";
import { useNavigation } from "@react-navigation/native";
import Modal from "react-native-modal";

const Editworkout = ({ route}) => {
  const navigation = useNavigation();
  const [workout, setWorkout] = useState(route.params?.workout || {});
  const [title, setTitle] = useState(workout.title || "");
  const [date, setDate] = useState(workout.date ? new Date(workout.date) : new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState(workout.time ? new Date(workout.time) : new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [note, setNote] = useState(workout.note || "");
  const [exercises, setExercises] = useState(workout.exercises || []);
  const [showModal, setShowModal] = useState(false);
  const [newExercise, setNewExercise] = useState({
    name: "",
    reps: "",
    sets: "",
  });

  useEffect(() => {
    if (route.params?.workout) {
      const { workout } = route.params;
      setWorkout(workout);
      setTitle(workout.title);
      setDate(new Date(workout.date));
      setTime(new Date(workout.time));
      setNote(workout.note);
      setExercises(workout.exercises);
    }
  }, [route.params?.workout]);

  const handleAddExercise = () => {
    setExercises([...exercises, newExercise]);
    setNewExercise({ name: "", reps: "", sets: "" });
    setShowModal(false);
  };

  const handleSaveWorkout = () => {
    const updatedWorkout = { ...workout, title, date, time, note, exercises };
    console.log("Workout updated:", updatedWorkout);
  
    // Kirim permintaan HTTP untuk memperbarui data di server
    fetch(`http://192.168.18.7:3000/workouts/${workout.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedWorkout),
    })
      .then(response => {
        console.log("Response status:", response.status);
        console.log("Response headers:", response.headers);
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        return response.text().then(text => {
          try {
            return JSON.parse(text);
          } catch (error) {
            console.error("JSON parse error:", error);
            console.error("Response text:", text);
            throw new Error('Failed to parse JSON response');
          }
        });
      })
      .then(data => {
        console.log('Success:', data);
        navigation.goBack();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };
  

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon name="arrow-back" size={30} color="#000" />
        </TouchableOpacity>
        <Text style={styles.header}>Edit Workout</Text>
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
              items={[
                { label: "Push Up", value: "Push Up" },
                { label: "Squat", value: "Squat" },
                // Add more exercise options here
              ]}
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
    borderColor: "#ccc",
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

export default Editworkout;
