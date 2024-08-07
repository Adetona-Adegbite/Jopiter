import React, { useEffect, useRef } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Dimensions,
  Text,
  View,
  Animated,
  Easing,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import AuthPageButton from "../../components/AuthPageButton";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

export default function AuthDoneScreen() {
  const navigation = useNavigation();
  const fadeAnim = useRef(new Animated.Value(0.2)).current;

  useEffect(() => {
    const animateImage = Animated.loop(
      Animated.sequence([
        Animated.timing(fadeAnim, {
          toValue: 0.2,
          duration: 2000, // Adjust duration as needed
          easing: Easing.ease, // Use linear easing for consistent transition
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnim, {
          toValue: 0.6,
          duration: 2000, // Adjust duration as needed
          easing: Easing.ease, // Use linear easing for consistent transition
          useNativeDriver: true,
        }),
      ])
    );

    animateImage.start();

    return () => {
      animateImage.stop();
    };
  }, []);

  return (
    <SafeAreaView style={styles.page}>
      <Animated.Image
        source={require("../../assets/jopiter-assets/splash-screen.png")}
        style={[styles.backgroundImage, { opacity: fadeAnim }]}
        resizeMode="contain"
      />
      <Image
        source={require("../../assets/jopiter-assets/logo-white.png")}
        style={styles.logoImage}
        resizeMode="contain"
      />
      <Text
        style={{
          color: "white",
          marginTop: windowHeight * 0.45,
          width: windowWidth * 0.6,
          textAlign: "center",
          fontSize: 13,
        }}
      >
        By logging in/registering, you agree to
        <Text style={{ color: "#7D70BA" }}> Our Terms</Text> and
        <Text style={{ color: "#7D70BA" }}> Privacy Policy</Text>
      </Text>
      <View style={{ marginBottom: 40 }}></View>
      <AuthPageButton
        onPress={() => {
          navigation.navigate("home");
        }}
        bgColor="transparent"
        color="white"
        title="Continue"
      />
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
