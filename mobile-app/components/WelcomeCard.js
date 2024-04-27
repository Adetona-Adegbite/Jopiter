import { Pressable, StyleSheet, Text, View } from "react-native";

export default function WelcomeCard({ onPress }) {
  return (
    <View style={styles.container}>
      <Text
        style={{
          color: "white",
          fontSize: 20,
          fontWeight: "bold",
          marginBottom: 7,
        }}
      >
        Explore and get NFTs
      </Text>
      <Text style={{ color: "lightgray", textAlign: "center" }}>
        You can buy your fashion brand in our virtual world
      </Text>
      <Pressable
        style={{
          width: "80%",
          height: "35%",
          backgroundColor: "black",
          marginTop: 15,
          borderRadius: 25,
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={onPress}
      >
        <Text style={{ color: "white", textAlign: "center", fontSize: 16 }}>
          Get started now
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "75%",
    height: "24%",
    backgroundColor: "#403F6B",
    borderRadius: 25,
    marginTop: "84%",
    alignItems: "center",
    padding: 30,
  },
});
