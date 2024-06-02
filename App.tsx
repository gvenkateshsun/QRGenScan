import "react-native-gesture-handler";
import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "./app/screens/Login";
import LandingPage from "./app/screens/LandingPage";
import { useState, useEffect } from "react";
import { User, onAuthStateChanged } from "@firebase/auth";
import { FIREBASE_AUTH } from "./firebaseConfig";
import { store } from "./store/store";
import { Provider } from "react-redux";

const Stack = createNativeStackNavigator();
export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, user => {
      setUser(user);
    });
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          {user ? (
            <Stack.Screen
              name="LandingPage"
              component={LandingPage}
              options={{ headerShown: false }}
            ></Stack.Screen>
          ) : (
            <Stack.Screen
              name="Login"
              component={Login}
              options={{ headerShown: false }}
            ></Stack.Screen>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
