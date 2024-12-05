import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const FollowerCard = ({ profilePicture, username, bio, onRemove, type }) => {
  return (
    <View style={styles.card}>
      {/* Profile Picture */}
      <Image source={{ uri: profilePicture }} style={styles.profilePicture} />

      {/* Username and Bio */}
      <View style={styles.infoContainer}>
        <Text style={styles.username}>{username}</Text>
        <Text style={styles.bio}>{bio}</Text>
      </View>

      {/* Remove Button */}
      <TouchableOpacity style={styles.removeButton} onPress={onRemove}>
        <Text style={styles.removeButtonText}>
          {type == "followers" ? "follow back" : "remove"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#191919",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  profilePicture: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  infoContainer: {
    flex: 1,
    justifyContent: "center",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#fff",
  },
  bio: {
    fontSize: 14,
    color: "#fff",
  },
  removeButton: {
    backgroundColor: "#FF5252",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: "#fff",
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default FollowerCard;
