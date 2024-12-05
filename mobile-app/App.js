import "react-native-gesture-handler";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createStackNavigator,
  TransitionPresets,
} from "@react-navigation/stack";
import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import WelcomeScreen from "./screens/PreAuthPages/WelcomeScreen";
import AuthScreen from "./screens/PreAuthPages/AuthScreen";
import RegisterScreen from "./screens/PreAuthPages/RegisterScreen";
import HeaderBackButton from "./components/HeaderBackButton";
import LoginScreen from "./screens/PreAuthPages/LoginScreen";
import PhoneAuthScreen from "./screens/PreAuthPages/PhoneAuthPage";
import PhoneSMSVerificationScreen from "./screens/PreAuthPages/PhoneSMSVerificationScreen";
import AuthDoneScreen from "./screens/PreAuthPages/AuthDoneScreen";
import HomePage from "./screens/MainPages/Home";
import {
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import ProfileContainer from "./components/ProfileContainer";
import { Feather } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import Profile from "./screens/MainPages/Profile";
import AboutUs from "./screens/MainPages/AboutUs";
import Collections from "./screens/MainPages/Collections";
import NFTs from "./screens/MainPages/NFTs";
import Closet from "./screens/MainPages/Closet";
import Exhibition from "./screens/MainPages/Exhibition";
import Store from "./screens/MainPages/Store";
import Cart from "./screens/MainPages/Cart";
import News from "./screens/MainPages/News";
import Settings from "./screens/MainPages/Settings";
import { RegistrationProvider } from "./tools/RegisterProvider";
import BioDataScreen from "./screens/PreAuthPages/BioDataScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import ChatsList from "./screens/MainPages/ChatsList";
import FollowingPage from "./screens/MainPages/Following";
import FollowersPage from "./screens/MainPages/Followers";
import PostPage from "./screens/MainPages/Post";

const windowHeight = Dimensions.get("screen").height;
const windowWidth = Dimensions.get("screen").width;
const Stack = createStackNavigator();
const ProfilePage = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="profile" component={Profile} />
      <Stack.Screen name="following" component={FollowingPage} />
      <Stack.Screen name="followers" component={FollowersPage} />
    </Stack.Navigator>
  );
};
const CustomDrawerContent = (props) => {
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <Image
        style={styles.logo}
        source={require("./assets/jopiter-assets/logo-white.png")} // Replace 'logo.png' with the path to your logo image
      />
      <View
        style={{
          flexDirection: "row",
          height: 60,
          justifyContent: "space-between",
          paddingHorizontal: 5,
        }}
      >
        <Image
          style={{ width: "30%", height: 60 }}
          resizeMode="contain"
          source={require("./assets/jopiter-assets/logo-white.png")} // Replace 'logo.png' with the path to your logo image
        />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            height: 60,
          }}
        >
          <View
            style={{
              width: 25,
              height: 25,
              borderRadius: 50,
              borderWidth: 1,
              borderColor: "white",
            }}
          ></View>
          <View
            style={{
              width: 25,
              height: 25,

              borderRadius: 50,
              borderWidth: 1,
              borderColor: "white",
            }}
          ></View>
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
          alignSelf: "flex-end",
          paddingHorizontal: 5,
          marginBottom: 20,
        }}
      >
        {/* <Text style={{ color: "#746D75", fontSize: 11 }}>+234 0123456789</Text> */}
        <Text style={{ color: "#746D75", fontSize: 11 }}>email@email.com</Text>
      </View>
      <DrawerItemList {...props} />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          paddingHorizontal: 20,
          marginTop: 8,
        }}
      >
        <Text style={{ color: "white", fontSize: 11 }}>
          Jopiter.io Version - V1.00
        </Text>
        <Pressable
          onPress={() => {
            navigation.navigate("auth");
          }}
        >
          <Text style={{ color: "red", fontSize: 11, fontWeight: 600 }}>
            Logout
          </Text>
        </Pressable>
      </View>
    </DrawerContentScrollView>
  );
};
function HomePageNavigator({ navigation }) {
  const Drawer = createDrawerNavigator();
  // const navigation = useNavigation();

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        drawerLabelStyle: {
          marginLeft: -22,
        },
        headerLeft: () => (
          <Feather
            name="menu"
            size={26}
            color="white"
            onPress={() => navigation.toggleDrawer()}
            style={{ marginLeft: 20 }}
          />
        ),
        headerLeftContainerStyle: {
          position: "relative",
          left: windowWidth * 0.0,
        },
        headerRight: () => {
          return <ProfileContainer />;
        },
        headerRightContainerStyle: {
          position: "relative",
          right: windowWidth * 0.08,
        },
        drawerStyle: {
          backgroundColor: "#191919",
        },
        drawerActiveBackgroundColor: "transparent",
        drawerActiveTintColor: "white",
        drawerInactiveBackgroundColor: "transparent",
        drawerInactiveTintColor: "white",
      })}
    >
      <Drawer.Screen
        name="main"
        component={HomePage}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="home-outline"
              size={25}
              color="white"
            />
          ),
          drawerLabel: "Home",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: 80,
                  height: 80,
                }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="chats"
        component={ChatsList}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons
              name="chatbubble-ellipses-outline"
              size={25}
              color="white"
            />
          ),
          drawerLabel: "Chats",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="post"
        component={PostPage}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="add-outline" size={25} color="white" />
          ),
          drawerLabel: "Post",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="cart"
        component={Cart}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="cart-outline" size={25} color="white" />
          ),
          drawerLabel: "My Cart",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      />
      {/* <Drawer.Screen
        name="closet"
        component={Closet}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <MaterialCommunityIcons
              name="wardrobe-outline"
              size={25}
              color="white"
            />
          ),
          drawerLabel: "Closet",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      /> */}
      {/* <Drawer.Screen
        name="collections"
        component={Collections}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <FontAwesome6 name="boxes-stacked" size={22} color="white" />
          ),
          drawerLabel: "Collections",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      /> */}
      {/* <Drawer.Screen
        name="store"
        component={Store}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="storefront-outline" size={25} color="white" />
          ),
          drawerLabel: "Store",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      />
      <Drawer.Screen
        name="notifications"
        component={Profile}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="notifications-outline" size={25} color="white" />
          ),
          drawerLabel: "Notifications",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      /> */}
      <Drawer.Screen
        name="profile"
        component={ProfilePage}
        options={{
          // headerShown: false,
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="person-circle-outline" size={25} color="white" />
          ),
          drawerLabel: "Profile",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      />
      {/* <Drawer.Screen
        name="about"
        component={AboutUs}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons
              name="information-circle-outline"
              size={25}
              color="white"
            />
          ),
          drawerLabel: "About Us",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      /> */}

      {/* <Drawer.Screen
        name="nfts"
        component={NFTs}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="infinite" size={25} color="white" />
          ),
          drawerLabel: "NFTs",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      />

      <Drawer.Screen
        name="exhibition"
        component={Exhibition}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="easel-outline" size={25} color="white" />
          ),
          drawerLabel: "Exhibition",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      /> */}

      {/* <Drawer.Screen
        name="news"
        component={News}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="newspaper-outline" size={25} color="white" />
          ),
          drawerLabel: "News Feed",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      /> */}
      <Drawer.Screen
        name="settings"
        component={Settings}
        options={{
          headerTransparent: true,
          headerTintColor: "white",
          drawerIcon: () => (
            <Ionicons name="settings-outline" size={25} color="white" />
          ),
          drawerLabel: "Settings",

          headerTitle: () => {
            return (
              <Image
                source={require("./assets/jopiter-assets/logo-white.png")}
                style={{
                  width: windowWidth * 0.2,
                  height: windowHeight * 0.02,
                }}
              />
            );
          },
        }}
      />
    </Drawer.Navigator>
  );
}
export default function App() {
  const Stack = createStackNavigator();
  const forFade = ({ current }) => ({
    cardStyle: {
      opacity: current.progress,
    },
  });
  return (
    <RegistrationProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
            cardStyleInterpolator: forFade,
          }}
        >
          <Stack.Screen
            options={{ headerShown: false }}
            name="welcome"
            component={WelcomeScreen}
          />
          <Stack.Screen name="auth" component={AuthScreen} />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: true,

              headerTitle: () => {
                return (
                  <Image
                    source={require("./assets/jopiter-assets/logo-white.png")}
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.02,
                    }}
                  />
                );
              },
            }}
            name="register"
            component={RegisterScreen}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: true,

              headerTitle: () => {
                return (
                  <Image
                    source={require("./assets/jopiter-assets/logo-white.png")}
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.02,
                    }}
                  />
                );
              },
            }}
            name="login"
            component={LoginScreen}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: true,

              headerTitle: () => {
                return (
                  <Image
                    source={require("./assets/jopiter-assets/logo-white.png")}
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.02,
                    }}
                  />
                );
              },
            }}
            name="phone-auth"
            component={PhoneAuthScreen}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: true,

              headerTitle: () => {
                return (
                  <Image
                    source={require("./assets/jopiter-assets/logo-white.png")}
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.02,
                    }}
                  />
                );
              },
            }}
            name="phone2fa-auth"
            component={PhoneSMSVerificationScreen}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: false,

              headerTitle: () => {
                return (
                  <Image
                    source={require("./assets/jopiter-assets/logo-white.png")}
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.02,
                    }}
                  />
                );
              },
            }}
            name="bio-data"
            component={BioDataScreen}
          />
          <Stack.Screen
            options={{
              headerTransparent: true,
              headerShown: false,

              headerTitle: () => {
                return (
                  <Image
                    source={require("./assets/jopiter-assets/logo-white.png")}
                    style={{
                      width: windowWidth * 0.2,
                      height: windowHeight * 0.02,
                    }}
                  />
                );
              },
            }}
            name="auth-done"
            component={AuthDoneScreen}
          />
          <Stack.Screen
            options={{
              headerShown: false,
            }}
            name="home"
            component={HomePageNavigator}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </RegistrationProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%", // Adjust the width of the logo as needed
    height: 120, // Adjust the height of the logo as needed
    opacity: 0.7,
  },
});
