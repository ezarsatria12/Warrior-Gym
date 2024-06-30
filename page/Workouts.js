import React, { useState } from "react";

import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import { Avatar, Button, Card } from "react-native-elements";
import CustomSnackbar from "./component/Snackbar";

const HomeScreen = () => {
  /*const [snackbarVisible, setSnackbarVisible] = useState(false);

  const onToggleSnackbar = () => {
    setSnackbarVisible(!snackbarVisible);
  };

  const onDismissSnackbar = () => {
    setSnackbarVisible(false);
  };*/
  return (
    <ScrollView style={styles.container}>
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
    paddingTop: 60,
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
    fontSize: 16,
    fontWeight: "bold",
  },
  userName: {
    fontSize: 14,
    color: "gray",
  },
  card: {
    borderRadius: 10,
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
