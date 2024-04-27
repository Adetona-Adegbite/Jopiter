import { Pressable, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
export default function OauthButton({ name }) {
  return (
    <Pressable style={styles.container}>
      <FontAwesome name={name} size={22} color="black" />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    width: 110,
    height: 60,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
