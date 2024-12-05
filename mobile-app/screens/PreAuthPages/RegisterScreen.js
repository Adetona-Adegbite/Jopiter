import { useContext, useLayoutEffect, useState } from "react";
import {
  Alert,
  Button,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import HeaderBackButton from "../../components/HeaderBackButton";
import { useNavigation } from "@react-navigation/native";

import AuthSubmitButton from "../../components/AuthSubmitButton";
import OauthButton from "../../components/OauthButton";
import StarProp from "../../components/StarProp";
import { RegistrationContext } from "../../tools/RegisterProvider";

export default function RegisterScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const navigationFunc = useNavigation();
  const { setRegistrationData } = useContext(RegistrationContext);
  const [isValidEmail, setIsValidEmail] = useState(true);

  const validateEmail = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Regex pattern for email validation
    setIsValidEmail(emailRegex.test(email)); // Update isValidEmail state based on regex test
    return;
  };
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
  const registrationHandler = async () => {
    try {
      validateEmail();

      // Basic input validation
      if (!email || !password || !confirmedPassword) {
        throw new Error("All fields are required");
      }

      if (!isValidEmail) {
        throw new Error("Please enter a valid email");
      }

      if (password.length < 8) {
        throw new Error("Password must be more than 8 characters");
      }

      if (password !== confirmedPassword) {
        throw new Error("Passwords don't match");
      }

      // If all validations pass, proceed with registration
      setRegistrationData((prev) => ({ ...prev, email, password }));
      navigationFunc.navigate("phone-auth");
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.header}>Sign up</Text>
        <View style={styles.formItem}>
          <Text style={styles.formItemTitle}>Email</Text>
          <TextInput
            style={styles.formItemInput}
            placeholder="example@gmail.com"
            keyboardType="email-address"
            placeholderTextColor="gray"
            value={email}
            onChangeText={setEmail}
            autoCapitalize={false}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formItemTitle}>Create a password</Text>
          <TextInput
            style={styles.formItemInput}
            placeholder="must be 8 characters"
            keyboardType="visible-password"
            placeholderTextColor="gray"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
        </View>
        <View style={styles.formItem}>
          <Text style={styles.formItemTitle}>Confirm password</Text>
          <TextInput
            style={styles.formItemInput}
            placeholder="repeat password"
            keyboardType="visible-password"
            secureTextEntry={true}
            value={confirmedPassword}
            onChangeText={setConfirmedPassword}
            placeholderTextColor="gray"
          />
        </View>
        <AuthSubmitButton onPress={registrationHandler} />
        <View style={styles.lineContainer}>
          <View style={styles.line} />
          <Text style={styles.orText}>or Register with</Text>
          <View style={styles.line} />
        </View>
        <View style={styles.ouath}>
          <OauthButton name="facebook" />
          <OauthButton name="google" />
          <OauthButton name="apple" />
        </View>
        <Text style={{ color: "gray" }}>
          Already have an Account?{" "}
          <Text style={{ color: "white" }}>Log in</Text>
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
    marginTop: 35,
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
