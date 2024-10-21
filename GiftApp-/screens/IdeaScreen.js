import React, { useState } from "react";
import { View, Text, FlatList, Pressable, StyleSheet } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

const IdeaScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [ideas] = useState([]);

  const renderIdea = ({ item }) => (
    <Pressable>
      <Text>{item.text}</Text>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Ideas for Person</Text>
      {ideas.length === 0 ? (
        <Text>No ideas added yet. Add an idea!</Text>
      ) : (
        <FlatList
          data={ideas}
          renderItem={renderIdea}
          keyExtractor={(item) => item.id}
        />
      )}

      <Pressable
        style={styles.addButton}
        onPress={() =>
          navigation.navigate("AddIdea", { personId: route.params.personId })
        }
      >
        <Text style={styles.buttonText}>Add Idea</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  addButton: {
    position: "absolute",
    top: 20,
    right: 20,
    backgroundColor: "#007BFF",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
});

export default IdeaScreen;
