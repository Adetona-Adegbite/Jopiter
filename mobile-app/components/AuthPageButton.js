import { Pressable, StyleSheet, Text } from "react-native";

export default function AuthPageButton({ title, bgColor, color, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.container, { backgroundColor: bgColor }]}
    >
      <Text style={{ color: color, fontWeight: "600", fontSize: 18 }}>
        {title}
      </Text>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    width: "80%",
    height: "7%",
    backgroundColor: "black",
    marginTop: 15,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
  },
});
