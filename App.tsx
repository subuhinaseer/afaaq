
import { StatusBar } from "react-native";
import { StyleSheet, Text, View } from "react-native";
import StackNavigator from "./StackNavigator";
import { UserContext } from "./UserContext";
import { useEffect } from "react";


export default function App() {

  return (
    <>
      <UserContext>
        <StackNavigator />
      </UserContext>
    </>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
