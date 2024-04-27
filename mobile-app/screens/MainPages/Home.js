import { SafeAreaView, StyleSheet, TextInput, View } from "react-native";
import { Feather } from "@expo/vector-icons";
export default function HomePage() {
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
});
