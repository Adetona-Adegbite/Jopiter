import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from "react-native";
import FollowerCard from "../../components/FollowerCard";

const FollowingPage = ({ navigation }) => {
  const followers = [
    {
      id: "1",
      profilePicture: "https://via.placeholder.com/50",
      username: "johndoe",
      bio: "Fashion Designer",
    },
    {
      id: "2",
      profilePicture: "https://via.placeholder.com/50",
      username: "janesmith",
      bio: "Seller",
    },
    {
      id: "3",
      profilePicture: "https://via.placeholder.com/50",
      username: "emily_b",
      bio: "Fashion Enthusiast",
    },
  ];

  const handleRemove = (id) => {
    console.log(`Remove follower with ID: ${id}`);
  };

  return (
    <SafeAreaView style={{ backgroundColor: "#191919", flex: 1 }}>
      {/* Top Bar */}
      <View style={styles.container}>
        <View style={styles.topBar}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backIcon}>◀</Text>
          </TouchableOpacity>
          <Text style={styles.pageTitle}>Following</Text>
        </View>

        {/* FlatList */}
        <FlatList
          data={followers}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <FollowerCard
              profilePicture={item.profilePicture}
              username={item.username}
              bio={item.bio}
              onRemove={() => handleRemove(item.id)}
              type={"following"}
            />
          )}
          contentContainerStyle={styles.list}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 10,
    gap: 6,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#191919",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: 18,
    color: "white",
  },
  pageTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  list: {
    paddingHorizontal: 10,
  },
});

export default FollowingPage;
