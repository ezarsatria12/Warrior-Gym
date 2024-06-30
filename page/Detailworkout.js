import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { CheckBox } from "react-native-elements";

const Detailworkout = ({ route, navigation }) => {
    const { workout } = route.params;

    const [checkedExercises, setCheckedExercises] = useState(
      workout.exercises.map(() => false)
    );
    
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
        <TouchableOpacity>
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
      <Text style={styles.subHeader}>Exercises</Text>
      {workout.exercises.map((exercise, index) => (
        <View key={index} style={styles.exerciseCard}>
          <Text style={styles.exerciseText}>{exercise.name}</Text>
          <Text style={styles.exerciseText}>Reps: {exercise.reps}</Text>
          <Text style={styles.exerciseText}>Sets: {exercise.sets}</Text>
          <CheckBox
            style={styles.checkbox}
            checked={checkedExercises[index]}
            onPress={() => handleCheckboxToggle(index)}
            disabled={false}
            tintColors={{ true: "#fff" }}
            onCheckColor={"#6F763F"}
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
  checkbox: {
    alignSelf: "center",
    Color: "#bbf246",
  },
});

export default Detailworkout;
