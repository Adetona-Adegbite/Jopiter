import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import AuthPageButton from "../../components/AuthPageButton";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AuthScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.page}>
      <Image
        source={require("../../assets/jopiter-assets/logo-white.png")}
        style={styles.logo}
      />
      <Image
        source={require("../../assets/jopiter-assets/splash-screen.png")}
        style={styles.splashLogo}
        resizeMode="contain"
      />
      <View style={styles.textContainer}>
        <Text style={[styles.text, { fontSize: 12 }]}>
          The revolutionary digital fashion platform that redefines the online
          shopping experience. An AI powered application that offers digital
          assistance for virtual outfit shopping, garment testing and exhibition
          enabling brands, retailers, and creators to showcase their
          apparel collections
        </Text>
      </View>
      <View
        style={{
          width: windowWidth,
          height: windowHeight,
          position: "relative",
          top: windowHeight * -0.035,
          alignItems: "center",
        }}
      >
        <AuthPageButton
          onPress={() => navigation.navigate("login")}
          bgColor="white"
          color="black"
          title="Sign in"
        />
        <AuthPageButton
          bgColor="#403F6B"
          color="white"
          title="Create account"
          onPress={() => navigation.navigate("register")}
        />
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  page: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#222229",
  },
  logo: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.28,
    // backgroundColor: "red",
  },
  splashLogo: {
    width: windowWidth * 0.75,
    height: windowHeight * 0.3,
    position: "relative",
    top: windowHeight * -0.08,
  },
  textContainer: {
    width: "75%",
    position: "relative",
    top: windowHeight * -0.06,
  },
  text: {
    color: "white",
    textAlign: "center",
  },
});
