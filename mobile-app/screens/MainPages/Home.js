import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Image,
  TouchableOpacity,
  FlatList,
  Pressable,
} from "react-native";
import { Feather, FontAwesome, Entypo, AntDesign } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function HomePage({ navigation }) {
  const route = useRoute();
  const { name } = route;
  const [followStatus, setFollowStatus] = useState({}); // State for follow statuses

  const toggleFollow = (id) => {
    setFollowStatus((prevStatus) => ({
      ...prevStatus,
      [id]: !prevStatus[id], // Toggle the follow status
    }));
  };
  const stories = [
    {
      id: 1,
      username: "JohnDoe",
      profilePic: "https://via.placeholder.com/50",
    },
    {
      id: 2,
      username: "JaneSmith",
      profilePic: "https://via.placeholder.com/50",
    },
    {
      id: 3,
      username: "MikeRoss",
      profilePic: "https://via.placeholder.com/50",
    },
    {
      id: 4,
      username: "RachelZane",
      profilePic: "https://via.placeholder.com/50",
    },
    {
      id: 5,
      username: "HarveySpecter",
      profilePic: "https://via.placeholder.com/50",
    },
  ];

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

  const renderStory = ({ item }) => (
    <View style={styles.storyContainer}>
      <Image style={styles.storyImage} />
      <Text style={styles.storyUsername}>{item.username}</Text>
    </View>
  );

  const renderPost = ({ item }) => {
    const isFollowing = !!followStatus[item.id]; // Check follow status for the post

    return (
      <View style={styles.postContainer}>
        <View style={styles.userInfo}>
          <Image source={{ uri: item.profilePic }} style={styles.profilePic} />
          <Pressable
            onPress={() =>
              navigation.navigate("ProfilePage", { username: item.username })
            }
            style={styles.userDetails}
          >
            <Text style={styles.userName}>{item.username}</Text>
            <Text style={styles.timePosted}>{item.timePosted}</Text>
          </Pressable>
          <Pressable
            onPress={() => toggleFollow(item.id)}
            style={{
              marginLeft: "auto",
              marginRight: 10,
              backgroundColor: isFollowing ? "#4CAF50" : "#403F6B",
              paddingVertical: 5,
              paddingHorizontal: 8,
              borderRadius: 10,
            }}
          >
            <Text style={{ color: "white", fontWeight: "600" }}>
              {isFollowing ? "Following" : "Follow"}
            </Text>
          </Pressable>
        </View>
        <Text style={styles.caption}>{item.caption}</Text>
        <Image source={{ uri: item.postImage }} style={styles.postImage} />
        <View style={styles.actions}>
          <TouchableOpacity style={styles.actionButton}>
            <FontAwesome name="heart-o" size={24} color="black" />
            <Text style={styles.actionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Feather name="message-circle" size={24} color="black" />
            <Text style={styles.actionText}>{item.comments}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <AntDesign name="shoppingcart" size={24} color="black" />
            <Text style={styles.actionText}>{item.purchases}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Entypo name="share" size={24} color="black" />
            <Text style={styles.actionText}>{item.purchases}</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#191919" }}>
      <View style={styles.page}>
        <FlatList
          data={stories}
          renderItem={renderStory}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ alignItems: "center" }}
          style={styles.storiesList}
        />
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color="white" />
          <TextInput
            style={{ paddingLeft: 10 }}
            placeholder="Explore"
            placeholderTextColor="#59595B"
          />
        </View>

        <FlatList
          data={posts}
          renderItem={renderPost}
          keyExtractor={(item) => item.id.toString()}
          showsVerticalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 60,
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
  storiesList: {
    marginBottom: 20,

    paddingVertical: 30,
  },
  storyContainer: {
    marginRight: 15,
    width: 100,
    height: 130,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "#fff",
    backgroundColor: "white",
  },
  storyImage: {
    marginBottom: 5,
  },
  storyUsername: {
    color: "white",
    fontSize: 12,
    textAlign: "center",
  },
  postContainer: {
    backgroundColor: "#D9D9D9",
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
    color: "black",
    fontWeight: "bold",
  },
  timePosted: {
    color: "#888888",
    fontSize: 12,
  },
  caption: {
    color: "black",
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
    color: "black",
    marginLeft: 5,
  },
});
