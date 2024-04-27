import { useLayoutEffect, useState } from "react";
import { SafeAreaView, StyleSheet, Text, TextInput, View } from "react-native";
import { EvilIcons } from "@expo/vector-icons";
import HeaderBackButton from "../../components/HeaderBackButton";
import AuthSubmitButton from "../../components/AuthSubmitButton";
// import OauthButton from "../mobile-app/components/OauthButton";
import StarProp from "../../components/StarProp";
import { Dropdown } from "react-native-element-dropdown";

export default function PhoneAuthScreen({ navigation }) {
  const [countryFocus, setcountryFocus] = useState(false);
  const [country, setcountry] = useState("");
  const [flag, setFlag] = useState("");

  const countryData = [
    { label: "United States (+1) 🇺🇸", value: "+1", flag: "🇺🇸" },
    { label: "United Kingdom (+44) 🇬🇧", value: "+44", flag: "🇬🇧" },
    { label: "Nigeria (+234) 🇳🇬", value: "+234", flag: "🇳🇬" },
    // Add more countries as needed
  ];

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
          />
        </View>
        <AuthSubmitButton
          onPress={() => {
            navigation.navigate("phone2fa-auth");
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
    color: "black",
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
