import { Pressable, StyleSheet, Text, View } from "react-native";

export default function AuthSubmitButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <Text style={{ color: "white", fontSize: 16, fontWeight: "bold" }}>
        Next
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "95%",
    height: 60,
    backgroundColor: "#403F6B",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
});
