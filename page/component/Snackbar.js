// components/Snackbar.js
import React, { useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Snackbar } from "react-native-paper";
import Icon from "react-native-vector-icons/MaterialIcons";

const CustomSnackbar = ({ visible, onDismiss, message }) => {
  return (
    <Snackbar
      visible={visible}
      onDismiss={onDismiss}
      action={{
        label: "Close",
        onPress: () => {
          // Do something if needed
        },
      }}
      style={styles.snackbar}
    >
      <View style={styles.container}>
        <Icon name="home" size={20} color="#FFF" style={styles.icon} />
        <Icon name="list" size={20} color="#FFF" style={styles.icon} />
        <Icon name="person" size={20} color="#FFF" style={styles.icon} />
        <View style={styles.messageContainer}>
          <Text style={styles.message}>{message}</Text>
        </View>
      </View>
    </Snackbar>
  );
};

const styles = StyleSheet.create({
  snackbar: {
    backgroundColor: "#333",
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 8,
  },
  messageContainer: {
    flex: 1,
  },
  message: {
    color: "#FFF",
  },
});

export default CustomSnackbar;
