import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  Image,
  Alert,
  StyleSheet,
  Text,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddIdeaScreen = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);
  const [hasPermission, setHasPermission] = useState(null);

  const navigation = useNavigation();
  const route = useRoute();
  const { personId } = route.params;

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  const pickImage = async () => {
    try {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });

      if (!result.canceled) {
        setImg(result.uri);
      }
    } catch (error) {
      Alert.alert("Error", "An error occurred while taking picture.");
    }
  };

  const savePerson = () => {
    if (text && img) {
      navigation.goBack();
    } else {
      Alert.alert(
        "Missing Fields",
        "Please fill in the idea and take a picture."
      );
    }
  };

  if (hasPermission === null) {
    return (
      <View>
        <Text>Requesting camera permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    // this is the error message that will be displayed if the user does not allow camera permissions
    return (
      <View>
        <Text>
          No access to camera. Please enable camera permissions in settings.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Idea"
        value={text}
        onChangeText={setText}
        style={styles.textInput}
      />

      {img ? (
        <Image source={{ uri: img }} style={styles.cameraPreview} />
      ) : (
        <View style={styles.cameraPlaceholder}>
          <Text>No image selected</Text>
        </View>
      )}

      <Button
        title={img ? "Retake Picture" : "Take Picture"}
        onPress={pickImage}
      />

      <Button title="Save" onPress={savePerson} />

      <Button title="Cancel" onPress={() => navigation.goBack()} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center",
  },
  textInput: {
    marginBottom: 20,
    borderBottomWidth: 1,
    padding: 10,
    fontSize: 18,
  },
  cameraPlaceholder: {
    width: "100%",
    height: 300,
    backgroundColor: "#e0e0e0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  cameraPreview: {
    width: "100%",
    height: 300,
    marginBottom: 20,
  },
});

export default AddIdeaScreen;
