import { StyleSheet, Text, View, TextInput } from "react-native"
import { colors } from "../global/colors"

const InputForm = ({ label, value, onChangeText, isSecure, error }) => {
  return (
    <View style={styles.inputContainer}>
      <Text style={styles.titleInput}>{label}</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        style={[styles.input, error ? styles.inputError : null]}
        secureTextEntry={isSecure}
        placeholderTextColor={colors.textSecondary}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export default InputForm

const styles = StyleSheet.create({
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  input: {
    width: "90%",
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    padding: 10,
    fontFamily: "RobotoRegular",
    fontSize: 14,
    marginHorizontal: "5%",
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
    color: colors.textPrimary,
  },
  inputError: {
    borderColor: colors.error,
  },
  titleInput: {
    width: "90%",
    marginHorizontal: "5%",
    fontSize: 16,
    fontFamily: "RobotoBold",
    color: colors.textPrimary,
  },
  error: {
    fontSize: 14,
    color: colors.error,
    fontFamily: "RobotoRegular",
    fontStyle: "italic",
    marginLeft: "5%",
    marginTop: 5,
  },
})
