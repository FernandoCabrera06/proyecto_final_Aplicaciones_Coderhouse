import { Image, Pressable, StyleSheet, Text, View } from "react-native"
import { colors } from "../global/colors"
import { addItemCart } from "../features/cart/cartSlice"
import { useDispatch } from "react-redux"
import { useNavigation } from "@react-navigation/native"
import { useGetProductQuery } from "../services/shop"

const ItemDetail = ({ route }) => {
  const { id } = route.params
  const { data: product, isLoading } = useGetProductQuery(id)
  const navigation = useNavigation()
  const dispatch = useDispatch()

  const handleAddItemCart = () => {
    dispatch(addItemCart({ ...product, quantity: 1 }))
    navigation.navigate("CartStack")
  }

  if (isLoading)
    return (
      <View>
        <Text>Cargando...</Text>
      </View>
    )

  return (
    <View style={styles.container}>
      <View style={styles.containerDetail}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={{ uri: product.img }}
        />
        <View style={styles.containerText}>
          <Text style={styles.title}>{product.description}</Text>
          <Text style={styles.description}>{product.description}</Text>
          <Text style={styles.price}>Precio: {product.price} $</Text>
        </View>
        <Pressable style={styles.button} onPress={handleAddItemCart}>
          <Text style={styles.buttonText}>Comprar</Text>
        </Pressable>
      </View>
    </View>
  )
}

export default ItemDetail

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.background,
  },
  containerDetail: {},
  containerText: {
    width: "80%",
    gap: 20,
    margin: 20,
    marginHorizontal: "10%",
  },
  title: {
    fontSize: 20,
    fontFamily: "OpenSansBold",
    color: colors.textPrimary,
  },
  description: {
    fontSize: 18,
    fontFamily: "OpenSansRegular",
    color: colors.textSecondary,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSansBold",
    color: colors.primary,
  },
  image: {
    width: "100%",
    height: 250,
    marginVertical: 10,
  },
  button: {
    width: "80%",
    marginHorizontal: "10%",
    backgroundColor: colors.primary,
    borderRadius: 3,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: colors.background,
    fontSize: 20,
    fontFamily: "OpenSansBold",
  },
})
