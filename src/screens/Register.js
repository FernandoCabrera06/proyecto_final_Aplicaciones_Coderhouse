import { useEffect, useState } from "react"
import { StyleSheet, Text, View, Pressable } from "react-native"
import { colors } from "../global/colors"
import InputForm from "../components/InputForm"
import SubmitButton from "../components/SubmitButton"
import { useRegisterMutation } from "../services/auth"
import { useDispatch } from "react-redux"
import { setUser } from "../features/auth/authSlice"
import { registerSchema } from "../validations/registerSchema"

const Register = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [errorEmail, setErrorEmail] = useState("")
  const [errorPassword, setErrorPassword] = useState("")
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("")
  const [triggerRegister, { data, isSuccess }] = useRegisterMutation()
  const dispatch = useDispatch()
  
  const onSubmit = async () => {
    try {
      registerSchema.validateSync({ email, password, confirmPassword })
      const { data } = await triggerRegister({ email, password })
      dispatch(
        setUser({
          email: data.email,
          idToken: data.idToken,
          localId: data.localId,
        })
      )
    } catch (error) {
      switch (error.path) {
        case "email":
          setErrorEmail(error.message)
          setErrorPassword("")
          setErrorConfirmPassword("")
          break
        case "password":
          setErrorEmail("")
          setErrorPassword(error.message)
          setErrorConfirmPassword("")
          break
        case "confirmPassword":
          setErrorEmail("")
          setErrorPassword("")
          setErrorConfirmPassword(error.message)
          break
        default:
          break
      }
    }
  }

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
        <InputForm
          label="Confirmar Password"
          value={confirmPassword}
          onChangeText={(t) => setConfirmPassword(t)}
          isSecure={true}
          error={errorConfirmPassword}
        />
        <SubmitButton onPress={onSubmit} title="Registrarme" />
        <Text style={styles.sub}>¿Ya tienes una cuenta?</Text>
        <Pressable onPress={() => navigation.navigate("Login")}>
          <Text style={styles.subLink}>Iniciar sesión</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default Register

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
    color: colors.textSecondary, 
    marginTop: 15,
  },
  subLink: {
    fontSize: 14,
    fontFamily: "OpenSansRegular", 
    color: colors.primary, 
  },
})
