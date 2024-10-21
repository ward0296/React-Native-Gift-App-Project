import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  Pressable,
  Alert,
  Button,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Swipeable } from "react-native-gesture-handler";

const PeopleScreen = () => {
  const navigation = useNavigation();
  const [people, setPeople] = useState([]);

  const addPerson = (name, dob) => {
    const newPerson = {
      id: Math.random().toString(),
      name,
      dob,
    };
    setPeople((prevPeople) => [...prevPeople, newPerson]);
  };

  const confirmDeletePerson = (person) => {
    // This function is to confirm deletion of a person
    Alert.alert(
      "Delete Person",
      `Are you sure you want to delete ${person.name}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          onPress: () => deletePerson(person.id),
          style: "destructive",
        },
      ]
    );
  };

  const deletePerson = (personId) => {
    // This function is to delete a person
    setPeople((prevPeople) =>
      prevPeople.filter((person) => person.id !== personId)
    );
  };

  const renderPerson = ({ item }) => (
    <Swipeable
      renderRightActions={() => (
        <Pressable
          onPress={() => confirmDeletePerson(item)}
          style={styles.deleteButton}
        >
          <Icon name="trash" size={24} color="red" />
        </Pressable>
      )}
    >
      <Pressable
        onPress={() => navigation.navigate("Ideas", { personId: item.id })}
      >
        <View style={styles.personContainer}>
          <Text style={styles.personText}>
            {item.name} - {new Date(item.dob).toLocaleDateString()}{" "}
          </Text>
          <Icon
            name="lightbulb-o"
            size={24}
            color="black"
            style={styles.lightbulbIcon}
          />
        </View>
      </Pressable>
    </Swipeable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>People List</Text>
        <Pressable
          style={styles.addButton}
          onPress={() => navigation.navigate("AddPerson", { addPerson })}
        >
          <Text style={styles.buttonText}>Add Person</Text>
        </Pressable>
      </View>

      {people.length === 0 ? (
        <View style={styles.noPeopleContainer}>
          <Text>No people added yet.</Text>
        </View>
      ) : (
        <FlatList
          data={people}
          renderItem={renderPerson}
          keyExtractor={(item) => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  addButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  personContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#f9f9f9",
    marginVertical: 5,
    borderRadius: 10,
  },
  personText: {
    fontSize: 16,
  },
  lightbulbIcon: {
    marginLeft: 10,
  },
  deleteButton: {
    justifyContent: "center",
    paddingRight: 20,
  },
  noPeopleContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
});

export default PeopleScreen;
