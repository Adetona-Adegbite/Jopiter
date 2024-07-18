import React, { useState, useRef, useContext } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Button,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { auth } from "../../tools/firebase";
import { PhoneAuthProvider, signInWithPhoneNumber } from "firebase/auth";
import AuthSubmitButton from "../../components/AuthSubmitButton";
import { FirebaseRecaptchaVerifierModal } from "expo-firebase-recaptcha";
import { RegistrationContext } from "../../tools/RegisterProvider";

export default function PhoneAuthScreen({ navigation }) {
  const [countryFocus, setcountryFocus] = useState(false);
  const [country, setcountry] = useState("");
  const [flag, setFlag] = useState("");
  const [phoneCountryCode, setPhoneCountryCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [confirmation, setConfirmation] = useState(null);
  const { setRegistrationData } = useContext(RegistrationContext);

  const recaptchaVerifier = useRef(null);

  const countryData = [
    { label: "United States (+1) 🇺🇸", value: "+1", flag: "🇺🇸" },
    { label: "United Kingdom (+44) 🇬🇧", value: "+44", flag: "🇬🇧" },
    { label: "Nigeria (+234) 🇳🇬", value: "+234", flag: "🇳🇬" },
    { label: "Israel (+972) 🇮🇱", value: "+972", flag: "🇮🇱" },
  ];

  const sendOtp = async () => {
    try {
      const phoneNumberWithCode = `${phoneCountryCode}${phoneNumber}`;
      console.log(phoneNumberWithCode);
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumberWithCode,
        recaptchaVerifier.current
      );
      setConfirmation(confirmationResult);
      console.log(confirmationResult);
      setRegistrationData((prev) => ({
        ...prev,
        phoneNumber: phoneNumberWithCode,
        country: country,
      }));
      navigation.navigate("phone2fa-auth", {
        confirmation: confirmationResult,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <FirebaseRecaptchaVerifierModal
        ref={recaptchaVerifier}
        firebaseConfig={auth.app.options}
        attemptInvisibleVerification={true}
      />
      <View style={styles.page}>
        <Text style={styles.header}>Sign up</Text>
        <Text style={styles.subHeader}>
          Please confirm your country code and enter your phone number
        </Text>
        <View style={styles.formItem}>
          <Dropdown
            style={[styles.dropdown, countryFocus && { borderColor: "white" }]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={countryData}
            maxHeight={300}
            labelField="label"
            valueField="value"
            itemContainerStyle={{
              backgroundColor: "#16171B",
            }}
            itemTextStyle={{ color: "white" }}
            inside={true}
            search
            placeholder="Select Country"
            searchPlaceholder="Search..."
            value={country}
            onFocus={() => setcountryFocus(true)}
            onBlur={() => setcountryFocus(false)}
            onChange={(item) => {
              setcountry(item.label);
              setcountryFocus(false);
              setFlag(item.flag);
              setPhoneCountryCode(item.value);
            }}
            renderLeftIcon={() => {
              return <Text style={styles.flag}>{flag}</Text>;
            }}
          />
          <Text
            style={{
              position: "absolute",
              zIndex: 20,
              top: "23%",
              color: "white",
              left: "25%",
            }}
          >
            {country.slice(0, -4)}
          </Text>
        </View>
        <View style={styles.formItem}>
          <TextInput
            style={styles.formItemInput}
            placeholder="Please enter a valid number"
            keyboardType="number-pad"
            placeholderTextColor="gray"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>
        <AuthSubmitButton onPress={sendOtp} />
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
    width: "70%",
    alignSelf: "flex-start",
    marginBottom: 20,
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
  dropdown: {
    borderWidth: 1,
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderColor: "#ccc",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  placeholderStyle: {
    fontSize: 16,
    color: "white",
  },
  selectedTextStyle: {
    fontSize: 16,
    color: "white",
  },
  inputSearchStyle: {
    color: "white",
    backgroundColor: "#16171B",
    borderWidth: 0,
  },
  iconStyle: {
    marginRight: 10,
  },
  icon: {
    marginRight: 10,
  },
  flag: {
    marginRight: 10,
    fontSize: 20,
  },
});
