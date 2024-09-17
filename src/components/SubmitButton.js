import { StyleSheet, Text, Pressable } from "react-native"
import React from "react"
import { colors } from "../global/colors"

const SubmitButton = ({ title, onPress }) => {
  return (
    <Pressable style={styles.button} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  )
}

export default SubmitButton

const styles = StyleSheet.create({
  button: {
    width: "60%",
    backgroundColor: colors.primary,
    paddingVertical: 12,
    paddingHorizontal: 20,
    alignItems: "center",
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    fontFamily: "RobotoBold",
  },
})
