import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";

export default function Profile() {
  const posts = [
    {
      id: 1,
      postImage: "https://via.placeholder.com/300x200",
      likes: 120,
      comments: 30,
      purchases: 5,
    },
    {
      id: 2,
      postImage: "https://via.placeholder.com/300x200",
      likes: 89,
      comments: 10,
      purchases: 2,
    },
    {
      id: 3,
      postImage: "https://via.placeholder.com/300x200",
      likes: 230,
      comments: 45,
      purchases: 12,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#191919" }}>
      <ScrollView>
        {/* Banner Image */}
        <View style={styles.bannerContainer}>
          <Image
            source={{ uri: "https://via.placeholder.com/1080x400" }} // Dummy banner image
            style={styles.bannerImage}
          />
          {/* Profile Picture */}
          <View style={styles.profilePicContainer}>
            <Image
              source={{ uri: "https://via.placeholder.com/150" }} // Dummy profile picture
              style={styles.profilePic}
            />
          </View>
        </View>

        {/* User Info */}
        <View style={styles.userInfo}>
          <Text style={styles.userName}>
            John Doe
            <TouchableOpacity style={styles.editIcon}>
              <Feather name="edit" size={18} color="white" />
            </TouchableOpacity>
          </Text>
          <Text style={styles.userUsername}>@johndoe</Text>

          {/* Stats */}
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>150</Text>
              <Text style={styles.statLabel}>Followers</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>100</Text>
              <Text style={styles.statLabel}>Following</Text>
            </View>
            <View style={styles.statItem}>
              <Text style={styles.statNumber}>30</Text>
              <Text style={styles.statLabel}>Posts</Text>
            </View>
          </View>

          {/* Bio */}
          <Text style={styles.bio}>"I can draw myself"</Text>
        </View>

        {/* User Posts */}
        <View style={styles.postsContainer}>
          {posts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <Image
                source={{ uri: post.postImage }}
                style={styles.postImage}
              />

              <View style={styles.actions}>
                <TouchableOpacity style={styles.actionButton}>
                  <FontAwesome name="heart-o" size={24} color="white" />
                  <Text style={styles.actionText}>{post.likes}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <Feather name="message-circle" size={24} color="white" />
                  <Text style={styles.actionText}>{post.comments}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.actionButton}>
                  <MaterialIcons name="shopping-cart" size={24} color="white" />
                  <Text style={styles.actionText}>{post.purchases}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  bannerContainer: {
    height: "27%",
    position: "relative",
  },
  bannerImage: {
    width: "100%",
    height: "100%",
  },
  profilePicContainer: {
    position: "absolute",
    bottom: -50,
    left: "50%",
    transform: [{ translateX: -50 }], // Center align the profile picture
  },
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#191919",
  },
  userInfo: {
    alignItems: "center",
    paddingTop: 60,
  },
  userName: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
    flexDirection: "row",
    alignItems: "center",
  },
  editIcon: {
    marginLeft: 10,
  },
  userUsername: {
    color: "#888888",
    fontSize: 16,
    marginVertical: 5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "80%",
    marginVertical: 20,
  },
  statItem: {
    alignItems: "center",
  },
  statNumber: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#888888",
    fontSize: 14,
  },
  bio: {
    color: "white",
    fontStyle: "italic",
    fontSize: 16,
    marginBottom: 20,
  },
  postsContainer: {
    paddingHorizontal: 20,
  },
  postContainer: {
    marginBottom: 20,
  },
  postImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  actionButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  actionText: {
    color: "white",
    marginLeft: 5,
  },
});
