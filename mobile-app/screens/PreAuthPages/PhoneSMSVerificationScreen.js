import React, { useLayoutEffect, useState, useRef } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import HeaderBackButton from "../../components/HeaderBackButton";
import AuthSubmitButton from "../../components/AuthSubmitButton";
import StarProp from "../../components/StarProp";

export default function PhoneSMSVerificationScreen({ navigation }) {
  const [otp, setOTP] = useState(["", "", "", "", ""]); // Initialize with 6 empty strings
  const refs = useRef([...Array(6)].map(() => React.createRef())); // Refs for each TextInput

  const handleOTPChange = (index, value) => {
    const newOTP = [...otp];
    newOTP[index] = value;
    setOTP(newOTP);

    // Automatically move focus to the next input box if value is entered
    if (value && index < 4) {
      refs.current[index + 1].current.focus();
    }
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => {
        return <HeaderBackButton onPress={() => navigation.goBack()} />;
      },
      headerRight: () => {
        return <StarProp />;
      },
    });
  }, [navigation]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <View style={styles.page}>
        <Text style={styles.header}>Verify your phone number</Text>
        <Text style={styles.subHeader}>
          We've sent an SMS with an activation code to your phone +234
          0123456789
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
          <Text style={{ color: "white", fontSize: 14 }}> Resend</Text>
        </Text>
        <AuthSubmitButton
          onPress={() => {
            navigation.navigate("auth-done");
          }}
        />
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
    fontSize: 32,
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
