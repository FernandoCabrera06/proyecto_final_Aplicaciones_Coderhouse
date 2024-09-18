import { StyleSheet, Text, View, FlatList, Pressable } from "react-native";
import CartItem from "../components/CartItem";
import { colors } from "../global/colors";
import { useDispatch, useSelector } from "react-redux";
import { usePostOrderMutation } from "../services/shop";
import { clearCart, removeItem, incrementItemQuantity, decrementItemQuantity } from "../features/cart/cartSlice";

const Cart = ({ navigation }) => {
  const cart = useSelector((state) => state.cart);
  const [triggerPostOrder] = usePostOrderMutation();
  const dispatch = useDispatch();

  const handleAddOrder = () => {
    const createdAt = new Date().toLocaleString();
    const order = {
      ...cart,
      createdAt,
    };
    triggerPostOrder({ userId: "1", order });
    dispatch(clearCart());
    navigation.navigate("OrdersStack");
  };

  const handleRemoveItem = (itemId) => {
    dispatch(removeItem(itemId));
  };

  const handleIncrementItem = (itemId) => {
    dispatch(incrementItemQuantity(itemId));
  };

  const handleDecrementItem = (itemId) => {
    dispatch(decrementItemQuantity(itemId));
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={cart.items}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onRemove={() => handleRemoveItem(item.id)}
            onIncrement={handleIncrementItem}
            onDecrement={handleDecrementItem}
          />
        )}
      />
      <View style={styles.containerConfirm}>
        <Pressable onPress={handleAddOrder}>
          <Text style={styles.textConfirm}>Confirmar</Text>
        </Pressable>
        <Text style={styles.textPrice}>Total: {cart.total} $</Text>
      </View>
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flex: 1,
    backgroundColor: colors.background,
  },
  containerConfirm: {
    backgroundColor: colors.primary,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textConfirm: {
    color: colors.background,
    fontSize: 20,
    fontFamily: "OpenSansBold",
    borderWidth: 1,
    borderColor: colors.textPrimary,
    padding: 10,
    borderRadius: 5,
    textAlign: "center",
  },
  textPrice: {
    color: colors.textPrimary,
    fontSize: 20,
    fontFamily: "OpenSansBold",
  },
});
