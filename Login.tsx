import {
  View,
  Image,
  StyleSheet,
  TextInput,
  ActivityIndicator,
  Button,
  KeyboardAvoidingView
} from "react-native";
import { useState, createContext } from "react";
import { FIREBASE_AUTH } from "../../firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "@firebase/auth";
import { useDispatch } from "react-redux";
import { setUserAfterLogin } from "../../store/userLoginState";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pwd, setPassword] = useState("");
  const [isLoading, setLoading] = useState(false);
  const auth = FIREBASE_AUTH;
  // We use the useDispatch hook to dispatch actions to the store
  const dispatch = useDispatch();

  const signIn = async () => {
    try {
      setLoading(true);
      const response = await signInWithEmailAndPassword(auth, email, pwd);
      dispatch(setUserAfterLogin(response.user.email));
    } catch (error) {
      console.log(error);
      alert("Invalid credentails!");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async () => {
    try {
      setLoading(true);
      const reply = await createUserWithEmailAndPassword(auth, email, pwd);
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../../assets/images/logo.png")}
        style={styles.imageStyle}
      ></Image>
      <KeyboardAvoidingView behavior="padding">
        <TextInput
          style={styles.input}
          value={email}
          placeholder="Email *"
          autoCapitalize="none"
          onChangeText={text => setEmail(text)}
        />
        <TextInput
          style={styles.input}
          secureTextEntry={true}
          value={pwd}
          placeholder="Password *"
          autoCapitalize="none"
          onChangeText={text => setPassword(text)}
        />
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff"></ActivityIndicator>
        ) : (
          <>
            <View style={styles.button}>
              <Button title="Login" onPress={signIn}></Button>
            </View>
            <View style={styles.button}>
              <Button title="Create account" onPress={signUp}></Button>
            </View>
          </>
        )}
      </KeyboardAvoidingView>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "#FFFFED",
    flexDirection: "column"
  },
  input: {
    padding: 20
  },
  button: {
    padding: 20
  },
  imageStyle: {
    width: 180,
    height: 180,
    marginHorizontal: 100
  }
});
