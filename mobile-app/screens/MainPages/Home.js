import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Feather, FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function HomePage() {
  const route = useRoute();
  const { name } = route;

  const posts = [
    {
      id: 1,
      username: "JohnDoe",
      timePosted: "2 hours ago",
      caption: "Had a great time at the beach today!",
      postImage: "https://via.placeholder.com/300x200",
      profilePic: "https://via.placeholder.com/50",
      likes: 120,
      comments: 30,
      purchases: 5,
    },
    {
      id: 2,
      username: "JaneSmith",
      timePosted: "3 hours ago",
      caption: "Loving this new book I'm reading.",
      postImage: "https://via.placeholder.com/300x200",
      profilePic: "https://via.placeholder.com/50",
      likes: 89,
      comments: 10,
      purchases: 2,
    },
    {
      id: 3,
      username: "MikeRoss",
      timePosted: "5 hours ago",
      caption: "Check out my new car!",
      postImage: "https://via.placeholder.com/300x200",
      profilePic: "https://via.placeholder.com/50",
      likes: 230,
      comments: 45,
      purchases: 12,
    },
    {
      id: 4,
      username: "RachelZane",
      timePosted: "7 hours ago",
      caption: "My new artwork is finally complete.",
      postImage: "https://via.placeholder.com/300x200",
      profilePic: "https://via.placeholder.com/50",
      likes: 170,
      comments: 20,
      purchases: 8,
    },
    {
      id: 5,
      username: "HarveySpecter",
      timePosted: "8 hours ago",
      caption: "Winning is everything.",
      postImage: "https://via.placeholder.com/300x200",
      profilePic: "https://via.placeholder.com/50",
      likes: 320,
      comments: 60,
      purchases: 15,
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#191919" }}>
      <View style={styles.page}>
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color="white" />
          <TextInput
            style={{ paddingLeft: 10 }}
            placeholder="Explore"
            placeholderTextColor="#59595B"
          />
        </View>
        <ScrollView>
          {posts.map((post) => (
            <View key={post.id} style={styles.postContainer}>
              <View style={styles.userInfo}>
                <Image
                  source={{ uri: post.profilePic }}
                  style={styles.profilePic}
                />
                <View style={styles.userDetails}>
                  <Text style={styles.userName}>{post.username}</Text>
                  <Text style={styles.timePosted}>{post.timePosted}</Text>
                </View>
              </View>
              <Text style={styles.caption}>{post.caption}</Text>
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
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 30,
  },
  searchBar: {
    backgroundColor: "#000000",
    height: 45,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
    marginBottom: 20,
  },
  postContainer: {
    backgroundColor: "#333333",
    padding: 8,
    borderRadius: 10,
    marginBottom: 20,
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userDetails: {
    flexDirection: "column",
  },
  userName: {
    color: "white",
    fontWeight: "bold",
  },
  timePosted: {
    color: "#888888",
    fontSize: 12,
  },
  caption: {
    color: "white",
    marginBottom: 10,
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
