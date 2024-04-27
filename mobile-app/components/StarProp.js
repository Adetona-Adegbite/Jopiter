import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";
export default function StarProp() {
  return (
    <MaterialCommunityIcons
      style={styles.item}
      name="star-four-points"
      size={40}
      color="white"
    />
  );
}

const styles = StyleSheet.create({
  item: {
    position: "relative",
    right: "40%",
    top: -15,
  },
});
