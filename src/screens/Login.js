import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Pressable } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors } from "../global/colors";
import InputForm from "../components/InputForm";
import SubmitButton from "../components/SubmitButton";
import { useLoginMutation } from "../services/auth";
import { setUser } from "../features/auth/authSlice";
import { useDispatch } from "react-redux";
import { loginSchema } from "../validations/loginSchema";

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [triggerLogin, { data, isSuccess }] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    const loadSession = async () => {
      const session = await AsyncStorage.getItem("userSession");
      if (session) {
        const userData = JSON.parse(session);
        dispatch(setUser(userData));
        navigation.navigate("Home"); // Navega a la pantalla principal si hay sesión
      }
    };
    loadSession();
  }, []);

  const onSubmit = async () => {
    try {
      loginSchema.validateSync({ email, password });
      const { data } = await triggerLogin({ email, password });
      const userData = {
        email: data.email,
        idToken: data.idToken,
        localId: data.localId,
      };
      dispatch(setUser(userData));
      await AsyncStorage.setItem("userSession", JSON.stringify(userData));
      navigation.navigate("Home"); // Navega a la pantalla principal después del login
    } catch (error) {
      console.log(error.path);
      switch (error.path) {
        case "email":
          setErrorEmail(error.message);
          setErrorPassword("");
          break;
        case "password":
          setErrorPassword(error.message);
          setErrorEmail("");
          break;
        default:
          break;
      }
    }
  };

  return (
    <View style={styles.main}>
      <View style={styles.container}>
        <InputForm
          label="Email"
          value={email}
          onChangeText={(t) => setEmail(t)}
          isSecure={false}
          error={errorEmail}
        />
        <InputForm
          label="Password"
          value={password}
          onChangeText={(t) => setPassword(t)}
          isSecure={true}
          error={errorPassword}
        />
        <SubmitButton onPress={onSubmit} title="Iniciar Sesión" />
        <Text style={styles.sub}>¿No tienes una cuenta?</Text>
        <Pressable
          onPress={() => navigation.navigate("Register")}
          style={styles.linkButton}
        >
          <Text style={styles.subLink}>Registrarme</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
  },
  container: {
    width: "90%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontFamily: "RobotoBold",
    color: colors.primary,
    marginBottom: 15,
  },
  sub: {
    fontSize: 14,
    fontFamily: "OpenSansRegular",
    color: colors.textPrimary,
    marginTop: 15,
  },
  subLink: {
    fontSize: 14,
    fontFamily: "OpenSansRegular",
    color: colors.primary,
  },
  linkButton: {
    marginTop: 10,
  },
});
