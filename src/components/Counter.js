import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { colors } from "../global/colors";

const Counter = ({ onChange, onIncrement, onDecrement }) => {
  const [input, setInput] = useState(1);

  const handleInput = (t) => {
    const value = Number(t);
    setInput(value);
    onChange(value);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerCounter}>
        <Pressable
          onPress={() => {
            if (input > 1) {
              const newValue = input - 1;
              setInput(newValue);
              onChange(newValue);
              onDecrement();
            }
          }}
          style={[
            styles.button,
            input === 1 && styles.buttonDisabled
          ]}
        >
          <Text style={styles.buttonText}>-</Text>
        </Pressable>
        <View style={styles.count}>
          <Text style={styles.countText}>{input}</Text>
        </View>
        <Pressable
          onPress={() => {
            const newValue = input + 1;
            setInput(newValue);
            onChange(newValue);
            onIncrement();
          }}
          style={styles.button}
        >
          <Text style={styles.buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

export default Counter;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    margin: 10,
  },
  containerCounter: {
    flexDirection: "row",
  },
  button: {
    backgroundColor: colors.primary,
    minWidth: 50,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 8,
    margin: 5,
  },
  buttonDisabled: {
    backgroundColor: colors.primary + "80",
  },
  buttonText: {
    color: colors.background,
    fontSize: 20,
    fontFamily: "OpenSansBold",
  },
  count: {
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: "auto",
    textAlign: "center",
    padding: 10,
  },
  countText: {
    fontSize: 20,
    fontFamily: "OpenSansBold",
    color: colors.textPrimary,
  },
});
