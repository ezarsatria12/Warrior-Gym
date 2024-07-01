import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  TextInput,
  Text,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import Workoutcard from "./component/Workoutcard";

const Workoutsscreen = () => {
  const [search, setSearch] = useState("");
  const [workouts, setWorkouts] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [workoutToDelete, setWorkoutToDelete] = useState(null);
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
  useEffect(() => {
    fetchWorkouts();
  }, []);
      useFocusEffect(

    useCallback(() => {
      fetchWorkouts();
    }, [])
  );

  const handleLongPress = (workout) => {
    setWorkoutToDelete(workout);
    setModalVisible(true);
  };

  const handleDeleteWorkout = () => {
    if (workoutToDelete) {
      fetch(`http://192.168.18.7:3000/workouts/${workoutToDelete.id}`, {
        method: "DELETE",
      })
        .then(() => {
          setWorkouts(
            workouts.filter((workout) => workout.id !== workoutToDelete.id)
          );
          setModalVisible(false);
          setWorkoutToDelete(null);
          Alert.alert("Success", "Workout deleted successfully");
          fetchWorkouts(); // Fetch data again after deletion

        })
        .catch((error) => {
          console.error("Failed to delete workout:", error);
          Alert.alert("Error", "Failed to delete workout");
        });
    }
  };

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
            onPress={() => navigation.navigate("DetailWorkout", { workout })}
            onLongPress={() => handleLongPress(workout)}
          />
        ))}
      </ScrollView>
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Apakah Anda ingin menghapus {workoutToDelete?.title}?
            </Text>
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.okButton]}
                onPress={handleDeleteWorkout}
              >
                <Text style={styles.buttonText}>OK</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
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
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    alignItems: "center",
    borderRadius: 5,
  },
  cancelButton: {
    backgroundColor: "#ccc",
    marginRight: 10,
  },
  okButton: {
    backgroundColor: "#bbf246",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
});

export default Workoutsscreen;
