import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Feather } from "@expo/vector-icons";

export default function ChatsList() {
  const chats = [
    {
      id: 1,
      userImage: "https://via.placeholder.com/150",
      userName: "Jane Doe",
      lastMessage: "Hey, how are you?",
      time: "2:30 PM",
    },
    {
      id: 2,
      userImage: "https://via.placeholder.com/150",
      userName: "Mark Smith",
      lastMessage: "See you tomorrow!",
      time: "1:15 PM",
    },
    {
      id: 3,
      userImage: "https://via.placeholder.com/150",
      userName: "Sarah Connor",
      lastMessage: "Got the files?",
      time: "12:00 PM",
    },
    {
      id: 4,
      userImage: "https://via.placeholder.com/150",
      userName: "James Brown",
      lastMessage: "Let's meet up later.",
      time: "11:45 AM",
    },
    {
      id: 5,
      userImage: "https://via.placeholder.com/150",
      userName: "Emily Davis",
      lastMessage: "Check out this link.",
      time: "10:30 AM",
    },
    {
      id: 6,
      userImage: "https://via.placeholder.com/150",
      userName: "Michael Johnson",
      lastMessage: "Good morning!",
      time: "9:15 AM",
    },
    {
      id: 7,
      userImage: "https://via.placeholder.com/150",
      userName: "Laura Wilson",
      lastMessage: "Thanks for the help!",
      time: "8:00 AM",
    },
    {
      id: 8,
      userImage: "https://via.placeholder.com/150",
      userName: "David Lee",
      lastMessage: "Where are you?",
      time: "Yesterday",
    },
    {
      id: 9,
      userImage: "https://via.placeholder.com/150",
      userName: "Sophia Martinez",
      lastMessage: "Can't wait to see you!",
      time: "Yesterday",
    },
    {
      id: 10,
      userImage: "https://via.placeholder.com/150",
      userName: "Robert Miller",
      lastMessage: "Let's catch up soon.",
      time: "Yesterday",
    },
    {
      id: 11,
      userImage: "https://via.placeholder.com/150",
      userName: "Olivia Anderson",
      lastMessage: "What are you doing?",
      time: "2 days ago",
    },
    {
      id: 12,
      userImage: "https://via.placeholder.com/150",
      userName: "William Harris",
      lastMessage: "I'm on my way.",
      time: "2 days ago",
    },
    {
      id: 13,
      userImage: "https://via.placeholder.com/150",
      userName: "Emma Clark",
      lastMessage: "Got it, thanks!",
      time: "2 days ago",
    },
    {
      id: 14,
      userImage: "https://via.placeholder.com/150",
      userName: "Ava Walker",
      lastMessage: "Are we still on for tonight?",
      time: "3 days ago",
    },
    {
      id: 15,
      userImage: "https://via.placeholder.com/150",
      userName: "Mason Hall",
      lastMessage: "I'll call you later.",
      time: "3 days ago",
    },
    {
      id: 16,
      userImage: "https://via.placeholder.com/150",
      userName: "Isabella Adams",
      lastMessage: "This is awesome!",
      time: "3 days ago",
    },
    {
      id: 17,
      userImage: "https://via.placeholder.com/150",
      userName: "Liam Scott",
      lastMessage: "Let's do it.",
      time: "4 days ago",
    },
    {
      id: 18,
      userImage: "https://via.placeholder.com/150",
      userName: "Mia Thomas",
      lastMessage: "I'll be there in 5.",
      time: "4 days ago",
    },
    {
      id: 19,
      userImage: "https://via.placeholder.com/150",
      userName: "Noah White",
      lastMessage: "Can you send that to me?",
      time: "4 days ago",
    },
    {
      id: 20,
      userImage: "https://via.placeholder.com/150",
      userName: "Charlotte Young",
      lastMessage: "Miss you!",
      time: "5 days ago",
    },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#191919" }}>
      <View style={styles.page}>
        <Text style={{ fontSize: 24, color: "white" }}>Chats</Text>
        <ScrollView>
          <View style={styles.chatsContainer}>
            {chats.map((chat) => (
              <TouchableOpacity key={chat.id} style={styles.chatItem}>
                <Image
                  source={{ uri: chat.userImage }}
                  style={styles.userImage}
                />
                <View style={styles.chatInfo}>
                  <Text style={styles.userName}>{chat.userName}</Text>
                  <Text style={styles.lastMessage}>{chat.lastMessage}</Text>
                </View>
                <View style={styles.chatMeta}>
                  <Text style={styles.time}>{chat.time}</Text>
                  <Feather name="chevron-right" size={24} color="white" />
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 100,
    paddingHorizontal: 10,
  },
  chatsContainer: {
    paddingVertical: 10,
  },
  chatItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#000000",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  chatInfo: {
    flex: 1,
  },
  userName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    color: "#888888",
    fontSize: 14,
  },
  chatMeta: {
    alignItems: "flex-end",
  },
  time: {
    color: "#888888",
    fontSize: 12,
    marginBottom: 5,
  },
});
