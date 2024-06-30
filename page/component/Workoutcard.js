import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Workoutcard = ({ title, date, time, note, progress, onPress }) => {
  return (
    <TouchableOpacity  onPress={onPress}>
      <View style={styles.card}>
        <View style={styles.cardContent}>
          <View>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.date}>{date}</Text>
            <Text style={styles.time}>{time}</Text>
            <Text style={styles.note}>{note}</Text>
          </View>
          <View style={styles.progressContainer}>
            <Text style={styles.progress}>{progress}%</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#f9f9f9",
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  cardContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  date: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  time: {
    fontSize: 14,
    color: "#888",
    marginBottom: 5,
  },
  note: {
    fontSize: 16,
    color: "#333",
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#bbf246",
    borderRadius: 50,
    padding: 10,
  },
  progress: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

export default Workoutcard;
