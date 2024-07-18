import { useLayoutEffect, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import AuthSubmitButton from "../../components/AuthSubmitButton";
import HeaderBackButton from "../../components/HeaderBackButton";
import OauthButton from "../../components/OauthButton";
import StarProp from "../../components/StarProp";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function LoginScreen({ navigation }) {
  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <HeaderBackButton onPress={() => navigation.goBack()} />;
      },
      // headerRight: () => {
      //   return <StarProp />;
      // },
    });
  }, []);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginHandler = async () => {
    try {
      const response = await axios.post("http://172.20.10.3:3000/auth/login", {
        email: email,
        password: password,
      });

      // console.log(response.data.status); // Assuming backend sends back user object on success
      if (response.data.status !== 201) {
        if (response.data.status === 404) {
          Alert.alert("User Not Found", "Please try signing up ");
        } else if (response.data.status === 401) {
          Alert.alert(
            "Invalid Credentials",
            "Please check your email and password."
          );
        } else if (response.data.status === 500) {
          Alert.alert("Login Failed.", "Please try again later");
        }
      }
      const user = response.data;

      // // Handle success case
      console.log(user.id.toString());
      await AsyncStorage.setItem("user-id", user.id.toString());
      Alert.alert("Login Successful", "Welcome back!");
      navigation.navigate("auth-done");
    } catch (error) {
      // Alert.alert("Login Failed. Please try again later");
      console.error("Login failed:");
    }
  };
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.header}>Hi, Welcome! 👋</Text>
        <View style={styles.formItem}>
          <Text style={styles.formItemTitle}>Email</Text>
          <TextInput
            style={styles.formItemInput}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View style={[styles.formItem, { marginBottom: 40 }]}>
          <Text style={styles.formItemTitle}>Create a password</Text>
          <TextInput
            style={styles.formItemInput}
            placeholder="password"
            keyboardType="visible-password"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            placeholderTextColor="gray"
          />
          <Text style={{ color: "#ccc", alignSelf: "flex-end" }}>
            Forgot password?
          </Text>
        </View>

        <AuthSubmitButton onPress={loginHandler} />
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.ouath}>
          <OauthButton name="facebook" />
          <OauthButton name="google" />
          <OauthButton name="apple" />
        </View>
        <Text style={{ color: "gray" }}>
          Don't have an Account?
          <Text style={{ color: "white" }}>Sign up</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: "20%",
    paddingHorizontal: 25,
    // Center horizontally
  },
  header: {
    fontSize: 32,
    color: "white",
    marginBottom: 35,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  formItem: {
    marginBottom: 10,
    height: "13%",
    gap: 5,
    width: "100%", // Ensure items take full width
  },
  formItemTitle: {
    color: "#ccc",
    fontSize: 14,
  },
  formItemInput: {
    borderBottomWidth: 1, // Add a border only at the bottom
    borderColor: "white", // Border color
    paddingVertical: 16, // Optional: Add padding vertically for better layout
    fontSize: 16,
    paddingLeft: 10,
    color: "white", // Text color
    width: "100%", // Ensure input takes full width
  },
  lineContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 100,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#ccc",
    marginHorizontal: 10,
  },
  orText: {
    color: "#ccc",
    fontSize: 14,
  },
  ouath: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 20,
    marginBottom: 35,
  },
});
