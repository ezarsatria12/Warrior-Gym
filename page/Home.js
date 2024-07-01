import React, { useState } from "react";

import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Avatar, Button, Card } from "react-native-elements";
import CustomSnackbar from "./component/Snackbar";

const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Avatar
          rounded
          source={require("../image/local/profile.jpg")} // Perbarui jalur gambar
          size="medium"
        />
        <View style={styles.greeting}>
          <Text style={styles.greetingText}>Good Morning 🔥</Text>
          <Text style={styles.userName}>David Lee</Text>
        </View>
      </View>

      <Card containerStyle={styles.card}>
        <Card.Title>CrossFit</Card.Title>
        <Card.Image source={require("../image/local/user.jpg")} />
        <Button
          title="See more"
          buttonStyle={styles.button}
          onPress={() => {}}
        />
      </Card>

      <Text style={styles.sectionTitle}>Popular Workouts</Text>
      <ScrollView horizontal>
        <View style={styles.workoutCard}>
          <Image
            style={styles.workoutImage}
            source={require("../image/local/user.jpg")}
          />
          <Text style={styles.workoutTitle}>Abs Beginner</Text>
          <Text style={styles.workoutDetail}>20 Min</Text>
          <Text style={styles.workoutDetail}>95 Kcal</Text>
        </View>
        <View style={styles.workoutCard}>
          <Image
            style={styles.workoutImage}
            source={require("../image/local/user.jpg")}
          />
          <Text style={styles.workoutTitle}>Handstand Training</Text>
          <Text style={styles.workoutDetail}>15 Min</Text>
          <Text style={styles.workoutDetail}>70 Kcal</Text>
        </View>
      </ScrollView>

      <Text style={styles.sectionTitle}>Today Plan</Text>
      <Card containerStyle={styles.card}>
        <View style={styles.todayPlan}>
          <Image
            style={styles.planImage}
            source={require("../image/local/user.jpg")}
          />
          <View>
            <Text style={styles.planTitle}>Running</Text>
            <Text style={styles.planDetail}>Burn belly fat by running</Text>
            <Text style={styles.planProgress}>45%</Text>
          </View>
        </View>
      </Card>
      <Card containerStyle={styles.card}>
        <View style={styles.todayPlan}>
          <Image
            style={styles.planImage}
            source={require("../image/local/user.jpg")}
          />
          <View>
            <Text style={styles.planTitle}>Running</Text>
            <Text style={styles.planDetail}>Burn belly fat by running</Text>
            <Text style={styles.planProgress}>45%</Text>
          </View>
        </View>
      </Card>
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
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  greeting: {
    marginLeft: 10,
  },
  greetingText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 16,
    color: "gray",
  },
  card: {
    borderRadius: 10,
    backgroundColor: "#f9f9f9",
  },
  button: {
    backgroundColor: "#000",
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 20,
    marginBottom: 10,
  },
  workoutCard: {
    marginRight: 10,
    alignItems: "center",
  },
  workoutImage: {
    width: 150,
    height: 100,
    borderRadius: 10,
  },
  workoutTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  workoutDetail: {
    fontSize: 14,
    color: "gray",
  },
  todayPlan: {
    flexDirection: "row",
    alignItems: "center",
  },
  planImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  planTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
  },
  planDetail: {
    fontSize: 14,
    color: "gray",
    marginLeft: 10,
  },
  planProgress: {
    fontSize: 14,
    color: "#000",
    marginLeft: 10,
  },
});

export default HomeScreen;
