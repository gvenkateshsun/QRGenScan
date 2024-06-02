import { View, Button, Text } from "react-native";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import { useEffect } from "react";

const Logout = () => {
  const signOut = () => {
    FIREBASE_AUTH.signOut();
  };
  useEffect(() => {
    const subscriber = signOut();
    return subscriber;
  }, []);
  return <Text></Text>;
};

export default Logout;
