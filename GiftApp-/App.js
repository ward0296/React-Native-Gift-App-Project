//References for this assignment: Youtube, React Native Documentation, Stack Overflow, In-Class exercise, Personal notes, other exercises online, online tutorials, google, Professor Shoaib, Course website.
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import PeopleScreen from "./screens/PeopleScreen";
import AddPersonScreen from "./screens/AddPersonScreen";
import AddIdeaScreen from "./screens/AddIdeaScreen";
import IdeaScreen from "./screens/IdeaScreen";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="People">
        <Stack.Screen
          name="People"
          component={PeopleScreen}
          options={{ title: "People List" }}
        />

        <Stack.Screen
          name="AddPerson"
          component={AddPersonScreen}
          options={{ title: "Add Person" }}
        />

        <Stack.Screen
          name="Ideas"
          component={IdeaScreen}
          options={{ title: "Ideas" }}
        />

        <Stack.Screen
          name="AddIdea"
          component={AddIdeaScreen}
          options={{ title: "Add Idea" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
