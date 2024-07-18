import React, {
  useLayoutEffect,
  useState,
  useRef,
  useContext,
  useEffect,
} from "react";
import {
  Alert,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import HeaderBackButton from "../../components/HeaderBackButton";
import AuthSubmitButton from "../../components/AuthSubmitButton";
import StarProp from "../../components/StarProp";
import {
  signInWithPhoneNumber,
  PhoneAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import { auth } from "../../tools/firebase";
import { RegistrationContext } from "../../tools/RegisterProvider";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function PhoneSMSVerificationScreen({ navigation, route }) {
  const [otp, setOTP] = useState(["", "", "", "", "", ""]); // Initialize with 6 empty strings
  const refs = useRef([...Array(6)].map(() => React.createRef())); // Refs for each TextInput
  const { registrationData } = useContext(RegistrationContext);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const recaptchaVerifier = useRef(null);

  const { confirmation } = route.params;

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Automatically move focus to the next input box if value is entered
    if (value && index < 5) {
      refs.current[index + 1].current.focus();
    }
  };

  const verifyOtp = async () => {
    const otpString = otp.join(""); // Merge OTP array into a single string
    try {
      const credential = PhoneAuthProvider.credential(
        confirmation.verificationId,
        otpString
      );
      await signInWithCredential(auth, credential);
      console.log("success");
      // navigation.navigate("auth-done");
      await registerHandler();
    } catch (error) {
      console.error("Verification failed:", error);
      // Handle error, show message to the user
    }
  };

  const registerHandler = async () => {
    try {
      const response = await axios.post("http://172.20.10.3:3000/auth/signup", {
        email: registrationData.email,
        password: registrationData.password,
        country: registrationData.country,
        phone: registrationData.phoneNumber,
      });

      // console.log(response.ok);
      // console.log(response.data);
      // const data = await JSON.parse(response.data);
      // console.log(data);
      if (!response.data.ok) {
        Alert.alert(response.data.error);
        return;
      }

      await AsyncStorage.setItem("user-id", response.data.id.toString());
      navigation.navigate("auth-done");
    } catch (e) {
      console.error(e);
      // Alert.alert();
    }
  };

  const resendOtp = async () => {
    try {
      const newConfirmation = await signInWithPhoneNumber(
        auth,
        registrationData.phoneNumber,
        recaptchaVerifier.current
      );
      route.params.confirmation = newConfirmation;
      setCanResend(false);
      setResendTimer(30);
    } catch (error) {
      console.error("Resend OTP failed:", error);
      // Handle error, show message to the user
    }
  };

  useEffect(() => {
    let timer;
    if (resendTimer > 0) {
      timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
    } else {
      setCanResend(true);
    }
    return () => clearTimeout(timer);
  }, [resendTimer]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <HeaderBackButton onPress={() => navigation.goBack()} />;
      },
      // headerRight: () => {
      //   return <StarProp />;
      // },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      />
      <View style={styles.page}>
        <Text style={styles.header}>Verify your phone number</Text>
        <Text style={styles.subHeader}>
          We've sent an SMS with an activation code to your phone{" "}
          {registrationData.phoneNumber}
        </Text>
        <View style={styles.formItem}>
          <View style={styles.container}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                ref={refs.current[index]} // Assign ref
                style={styles.input}
                onChangeText={(value) => handleOTPChange(index, value)}
                value={digit}
                maxLength={1}
                keyboardType="numeric"
                autoFocus={index === 0} // Automatically focus on the first input
                // Move focus to the previous input box when backspace is pressed
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === "Backspace" && index > 0) {
                    refs.current[index - 1].current.focus();
                  }
                }}
              />
            ))}
          </View>
        </View>
        <Text style={{ color: "rgba(255,255,255,0.4)", marginBottom: 25 }}>
          I didn't receive the code
          {canResend ? (
            <TouchableOpacity onPress={resendOtp}>
              <Text style={{ color: "white", fontSize: 14 }}> Resend</Text>
            </TouchableOpacity>
          ) : (
            <Text style={{ color: "white", fontSize: 14 }}>
              Resend in {resendTimer}s
            </Text>
          )}
        </Text>
        <AuthSubmitButton onPress={verifyOtp} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: "20%",
    paddingHorizontal: 25,
    alignItems: "center", // Center horizontally
  },
  header: {
    fontSize: 28,
    color: "white",
    marginBottom: 10,
    fontWeight: "bold",
    alignSelf: "flex-start",
  },
  subHeader: {
    color: "#959595",
    width: "90%",
    alignSelf: "flex-start",
    marginBottom: 20,
  },
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    alignSelf: "center",
  },
  formItem: {
    marginBottom: 10,
    height: "13%",
    gap: 5,
    width: "100%", // Ensure items take full width
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
  input: {
    width: "18%",
    height: 60,
    margin: 5,
    color: "white",
    fontSize: 16,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.4)",
    borderRadius: 5,
    textAlign: "center",
  },
});
