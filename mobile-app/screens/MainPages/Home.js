import React from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useRoute } from "@react-navigation/native";

export default function HomePage() {
  const route = useRoute();
  const { name } = route;

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#191919" }}>
      <View style={styles.page}>
        <View style={styles.searchBar}>
          <Feather name="search" size={24} color="white" />
          <TextInput
            style={{ paddingLeft: 10 }}
            placeholder="Search Here"
            placeholderTextColor="#59595B"
          />
        </View>
        <View style={styles.menubar}>
          <View style={styles.menuItem}>
            <Text
              style={
                name !== "main"
                  ? { color: "#ccc", padding: 10, fontWeight: "600" }
                  : { color: "white", padding: 10, fontWeight: "600" }
              }
            >
              Home
            </Text>
            {name === "main" && <View style={styles.borderBottom} />}
          </View>
          <View style={styles.menuItem}>
            <Text
              style={
                name !== "main"
                  ? { color: "white", padding: 10, fontWeight: "600" }
                  : { color: "#ccc", padding: 10, fontWeight: "600" }
              }
            >
              Collections
            </Text>
            {name !== "main" && <View style={styles.borderBottom} />}
          </View>
        </View>
        <Text style={{ color: "#ccc", alignSelf: "center", marginTop: "70%" }}>
          No Content Available Yet
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: 60,
    paddingHorizontal: 40,
  },
  searchBar: {
    backgroundColor: "#000000",
    height: 45,
    borderRadius: 7,
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 15,
  },
  menubar: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    paddingVertical: 10,
  },
  menuItem: {
    alignItems: "center",
    width: "37%",
  },
  borderBottom: {
    borderBottomColor: "white",
    borderBottomWidth: 1.5,
    width: "90%",
  },
});
