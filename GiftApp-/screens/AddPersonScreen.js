import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DatePicker from "react-native-modern-datepicker";
import { useNavigation, useRoute } from "@react-navigation/native";

const AddPersonScreen = () => {
  const [name, setPersonName] = useState("");
  const [dob, setDob] = useState("");
  const navigation = useNavigation();
  const route = useRoute();
  const { addPerson } = route.params;

  const savePerson = () => {
    // Function to save the person
    if (name && dob) {
      addPerson(name, dob);
      navigation.goBack();
    } else {
      alert("Please ensure all fields are filled out before proceeding.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Enter Name"
        value={name}
        onChangeText={setPersonName}
        style={styles.textInput}
      />
      <DatePicker
        mode="calendar"
        onDateChange={setDob} //
        maximumDate={new Date().toISOString().split("T")[0]}
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
});

export default AddPersonScreen;
