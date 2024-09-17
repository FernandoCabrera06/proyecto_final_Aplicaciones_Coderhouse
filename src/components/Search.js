import { Pressable, StyleSheet, Text, TextInput, View } from "react-native"
import React, { useState } from "react"
import { colors } from "../global/colors"
import AntDesign from "@expo/vector-icons/AntDesign"
import MaterialIcons from "@expo/vector-icons/MaterialIcons"

const Search = ({ onSearch }) => {
  const [input, setInput] = useState("")
  const [error, setError] = useState("")

  const handleInputChange = (t) => {
    setInput(t)
  }

  const handleRemoveInput = () => {
    setInput("")
    onSearch("")
    setError("")
  }

  const search = () => {
    const regex = /[^a-zA-Z0-9 ]/
    if (regex.test(input)) {
      setError("Caracteres no válidos")
    } else {
      setError("")
      onSearch(input)
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.containerInput}>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          placeholderTextColor={colors.textSecondary}
          placeholder="Buscar producto"
          value={input}
          onChangeText={handleInputChange}
        />
        <View style={styles.buttonContainer}>
          <Pressable onPress={search} style={styles.button}>
            <AntDesign name="search1" size={28} color={colors.primary} />
          </Pressable>
          <Pressable onPress={handleRemoveInput} style={styles.button}>
            <MaterialIcons name="cancel" size={28} color={colors.primary} />
          </Pressable>
        </View>
      </View>
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginTop: 20,
  },
  containerInput: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  input: {
    backgroundColor: colors.background,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: "75%",
    color: colors.textPrimary,
    fontFamily: "OpenSansRegular",
    fontSize: 16,
  },
  inputError: {
    borderColor: colors.error,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    marginHorizontal: 5,
  },
  error: {
    color: colors.error,
    fontWeight: "bold",
    marginTop: 5,
    fontFamily: "OpenSansBold",
    fontSize: 14,
  },
})
