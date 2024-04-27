import { Image, SafeAreaView, StyleSheet, Dimensions } from "react-native";
import WelcomeCard from "../../components/WelcomeCard";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function WelcomeScreen() {
  const navigation = useNavigation();
  const navigateHandler = () => {
    navigation.navigate("auth");
  };
  return (
    <SafeAreaView style={styles.page}>
      <Image
        source={require("../..//assets/jopiter-assets/splash-screen.png")}
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      <Image
        source={require("../../assets/jopiter-assets/logo-white.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <WelcomeCard onPress={navigateHandler} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#16171B",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: "15%",
    left: windowWidth * 0.025,
    opacity: 0.2,
    width: windowWidth * 0.95,
    height: windowHeight * 0.45, // Set to take up 50% of screen height
  },
  logoImage: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [
      { translateX: -windowWidth * 0.25 },
      { translateY: -windowWidth * 0.46 },
    ], // Adjust values based on logo size
    width: windowWidth * 0.5,
    height: windowWidth * 0.5,
  },
});
