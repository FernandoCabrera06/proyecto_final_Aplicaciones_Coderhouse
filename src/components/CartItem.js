import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';
import { colors } from '../global/colors';
import { useDeleteOrderMutation } from "../services/shop";

const CartItem = ({ item }) => {
  const [deleteOrder] = useDeleteOrderMutation();

  const handleDelete = async () => {
    try {
      await deleteOrder({ userId: item.userId, orderId: item.id }).unwrap();
    } catch (error) {
      console.error('Failed to delete the order:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.title}>{item.description}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <Text style={styles.price}>{item.price} $</Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <Entypo name="trash" size={48} color={colors.primary} />
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
