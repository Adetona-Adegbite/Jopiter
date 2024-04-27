import { Pressable, StyleSheet, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
export default function HeaderBackButton({ onPress }) {
  return (
    <Pressable onPress={onPress} style={styles.container}>
      <MaterialCommunityIcons name="less-than" size={20} color="white" />
    </Pressable>
  );
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 15,
    borderColor: "white",
    borderWidth: 1,
    paddingVertical: 7,
    paddingHorizontal: 7,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
