import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, ScrollView } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Userprofile = () => {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      // Simulating fetching data from storage or API
      const profileData = await AsyncStorage.getItem("profile");
      if (profileData) {
          const parsedProfile = JSON.parse(profileData);
          parsedProfile.photoUrl = require("../image/local/profile.jpg"); // Update to require local image
          setProfile(parsedProfile);
      } else {
        // Set default data if no data is found in AsyncStorage
        const defaultProfile = {
          photoUrl: require("../image/local/profile.jpg"),
          name: "Dani Prass",
          email: "daniepras@gmail.com",
          joinedDate: "2023-01-15",
          subscriptionEndDate: "2025-01-15",
        };
        setProfile(defaultProfile);
        await AsyncStorage.setItem("profile", JSON.stringify(defaultProfile));
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <Text>Loading...</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={profile.photoUrl} style={styles.profileImage} />
      <Text style={styles.name}>{profile.name}</Text>
      <Text style={styles.email}>{profile.email}</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Joined Date:</Text>
        <Text style={styles.infoValue}>{profile.joinedDate}</Text>
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.infoLabel}>Subscription End Date:</Text>
        <Text style={styles.infoValue}>{profile.subscriptionEndDate}</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: "#bbf246",
    borderWidth: 2,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
    borderBottomColor: "#bbf246",
    borderBottomWidth: 2,
    paddingBottom: 5,
  },
  email: {
    fontSize: 18,
    color: "gray",
    marginBottom: 20,
    borderBottomColor: "#bbf246",
    borderBottomWidth: 1,
    paddingBottom: 5,
  },
  infoContainer: {
    flexDirection: "row",
    marginBottom: 10,
    width: "100%",
    justifyContent: "space-between",
    paddingHorizontal: 20,
  },
  infoLabel: {
    fontWeight: "bold",
    color: "#333",
  },
  infoValue: {
    fontSize: 16,
    color: "#666",
  },
});

export default Userprofile;
