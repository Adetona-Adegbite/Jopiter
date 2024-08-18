import React, { useContext, useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Chip } from "react-native-paper";
import AuthSubmitButton from "../../components/AuthSubmitButton";
import axios from "axios";
import { RegistrationContext } from "../../tools/RegisterProvider";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function BioDataScreen({ navigation }) {
  const [category, setCategory] = useState(null);
  const { registrationData } = useContext(RegistrationContext);

  const registerHandler = async () => {
    if (category) {
      try {
        const response = await axios.post(
          "http://172.20.10.3:3000/auth/signup",
          {
            email: registrationData.email,
            password: registrationData.password,
            country: registrationData.country,
            phone: registrationData.phoneNumber,
            category: category,
          }
        );

        // console.log(response.ok);
        console.log(response.data);

        if (!response.data.ok) {
          Alert.alert(response.data.error);
          return;
        }

        await AsyncStorage.setItem("user-id", response.data.user.id.toString());
        navigation.navigate("auth-done");
      } catch (e) {
        console.error(e);
        // Alert.alert();
      }
    }
  };

  const chipCategories = [
    { label: "Fashion Enthusiast", width: "44%" },
    { label: "Fashion Investor", width: "50%" },
    { label: "Fashion Icon", width: "60%" },
    { label: "Creator", width: "30%" },
    { label: "Blogger", width: "40%" },
    { label: "Designer", width: "50%" },
    { label: "Other", width: "40%" },
  ];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#16171B" }}>
      <ScrollView
        style={styles.page}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <Text style={styles.header}>Welcome to Jopiter.io</Text>
        <Text style={styles.subHeader}>How would you classify yourself?</Text>

        <View style={styles.chipContainer}>
          {chipCategories.map((chip, index) => (
            <Chip
              key={index}
              showSelectedCheck={false}
              style={[
                styles.chip,
                { width: chip.width },
                category === chip.label && styles.selectedChip,
              ]}
              selected={category === chip.label}
              onPress={() => setCategory(chip.label)}
              textStyle={{ fontSize: 13, paddingHorizontal: 0, color: "white" }}
            >
              {chip.label}
            </Chip>
          ))}
        </View>
        <AuthSubmitButton onPress={registerHandler} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  page: {
    flex: 1,
    paddingTop: "20%",
    paddingHorizontal: 25,
  },
  header: {
    fontSize: 32,
    color: "white",
    marginBottom: 35,
    fontWeight: "bold",
    alignSelf: "center",
  },
  subHeader: {
    fontSize: 18,
    color: "white",
    marginBottom: 20,
    textAlign: "center",
  },
  chipContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
  },
  chip: {
    marginVertical: 10,
    marginHorizontal: 5,
    backgroundColor: "#2E2F33",
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  selectedChip: {
    backgroundColor: "#63ADF2",
  },
});
