import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { colors } from '../global/colors';
import Counter from './Counter';

const CartItem = ({ item, onRemove, onIncrement, onDecrement }) => {
  const [quantity, setQuantity] = useState(item.quantity || 1);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.description}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>{item.price} $</Text>
        <Counter
          onChange={handleQuantityChange}
          onIncrement={() => onIncrement(item.id)}
          onDecrement={() => onDecrement(item.id)}
        />
      </View>
      <TouchableOpacity onPress={() => onRemove(item.id)}>
        <Ionicons name="trash" size={48} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
};

export default CartItem;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: colors.background,
    marginVertical: 10,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 8,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  containerText: {
    width: '70%',
    gap: 5,
  },
  title: {
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: 'OpenSansBold',
  },
  brand: {
    color: colors.textSecondary,
    fontSize: 16,
    fontFamily: 'OpenSansRegular',
  },
  price: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: 'OpenSansBold',
  },
});
