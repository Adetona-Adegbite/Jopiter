import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  Alert,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";

const PostPage = () => {
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedMenu, setSelectedMenu] = useState("Post");
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [price, setPrice] = useState("");

  const tags = ["Tag1", "Tag2", "Tag3", "Tag4", "Tag5"];

  const handleTagPress = (tag) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else if (selectedTags.length < 5) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleImagePicker = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "You need to grant permission to access the media library."
      );
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!pickerResult.cancelled) {
      setImage(pickerResult);
    }
  };

  const handleSubmit = async () => {
    if (!image || !caption || !selectedTags.length) {
      Alert.alert(
        "Error",
        "Please complete all fields including uploading an image."
      );
      return;
    }

    const formData = new FormData();
    formData.append("image", {
      uri: image.uri,
      type: "image/jpeg", // Assuming JPEG for simplicity
      name: "upload.jpg",
    });
    formData.append("caption", caption);
    formData.append("price", price || 0);
    formData.append("tags", JSON.stringify(selectedTags));

    try {
      const response = await axios.post(
        "http://your-backend-url/api/posts",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        Alert.alert("Success", "Post uploaded successfully!");
      } else {
        Alert.alert("Error", "Failed to upload post. Please try again.");
      }
    } catch (error) {
      console.error("Upload Error: ", error);
      Alert.alert("Error", "An error occurred during upload.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton}>
            <Text style={styles.closeButtonText}>×</Text>
          </TouchableOpacity>
          <Text style={styles.headerText}>New Post</Text>
        </View>

        {/* Picture Upload */}
        <TouchableOpacity
          style={styles.pictureContainer}
          onPress={handleImagePicker}
        >
          {image ? (
            <Text style={styles.uploadText}>
              Image Selected: {image.uri.split("/").pop()}
            </Text>
          ) : (
            <Text style={styles.uploadText}>Upload</Text>
          )}
        </TouchableOpacity>

        {/* Menu Box */}
        <View style={styles.menuBox}>
          {["Post", "Product", "Story"].map((option) => (
            <TouchableOpacity
              key={option}
              style={[
                styles.menuOption,
                selectedMenu === option && styles.selectedMenuOption,
              ]}
              onPress={() => setSelectedMenu(option)}
            >
              <Text
                style={[
                  styles.menuText,
                  selectedMenu === option && styles.selectedMenuText,
                ]}
              >
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.textBox}
          keyboardType="number-pad"
          placeholder="How much does this cost?"
          placeholderTextColor="#535353"
          value={price}
          onChangeText={(text) => setPrice(text)}
        />
        <Text style={[styles.label, { marginTop: 20 }]}>Caption</Text>

        <TextInput
          style={styles.textBox}
          multiline
          placeholder="Write a caption..."
          placeholderTextColor="#535353"
          value={caption}
          onChangeText={(text) => setCaption(text)}
        />
        {/* Tagline */}
        <Text
          style={{
            marginLeft: "auto",
            marginTop: 2,
            color: "white",
            fontSize: 11,
          }}
        >
          200 characters
        </Text>
        <Text style={styles.label}>Tagline</Text>
        <View style={styles.tagContainer}>
          {tags.map((tag) => (
            <TouchableOpacity
              key={tag}
              style={[
                styles.tagCard,
                selectedTags.includes(tag) && styles.selectedTag,
              ]}
              onPress={() => handleTagPress(tag)}
            >
              <Text
                style={[
                  styles.tagText,
                  selectedTags.includes(tag) && styles.selectedTagText,
                ]}
              >
                {tag}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        <Text
          style={{
            marginLeft: "auto",
            marginTop: 2,
            color: "red",
            fontSize: 11,
          }}
        >
          5 Max
        </Text>
        <Pressable style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.authButtonText}>Post</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191919",
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    marginTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  closeButton: {
    backgroundColor: "#191919",
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 3,
    borderColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "white",
  },
  pictureContainer: {
    backgroundColor: "#9A9A9A",
    height: 320,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  uploadText: {
    fontSize: 16,
    color: "black",
  },
  menuBox: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "white",
    width: "52%",
    marginLeft: "auto",
    borderRadius: 8,
    alignItems: "center",
  },
  menuOption: {
    padding: 7,
    paddingHorizontal: 13,
    borderRadius: 8,
    alignItems: "center",
  },
  selectedMenuOption: {
    backgroundColor: "#403F6B", // Highlight color for selected menu
  },
  menuText: {
    fontSize: 14,
    fontWeight: "600",
    color: "white",
  },
  selectedMenuText: {
    color: "white", // Text color for selected menu
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 4,
    color: "white",
  },
  textBox: {
    borderRadius: 8,
    padding: 16,
    fontSize: 14,
    borderBottomColor: "white",
    borderBottomWidth: 1,
    marginBottom: 0,
  },
  tagContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  tagCard: {
    backgroundColor: "#575757",
    padding: 8,
    width: "30%",
    borderRadius: 8,
    margin: 4,
  },
  selectedTag: {
    backgroundColor: "#403F6B",
  },
  tagText: {
    fontSize: 14,
    color: "#000",
  },
  selectedTagText: {
    color: "#fff",
  },
  submitButton: {
    backgroundColor: "#403F6B",
    width: "30%",
    padding: 15,
    borderRadius: 10,
    marginLeft: "auto",
    marginTop: 20,
  },
  authButtonText: {
    color: "white",
    textAlign: "center",
  },
});

export default PostPage;
