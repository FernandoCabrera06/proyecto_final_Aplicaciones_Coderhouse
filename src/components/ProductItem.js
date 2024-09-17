import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";
import { colors } from "../global/colors";
import { useNavigation } from "@react-navigation/native";

const ProductItem = ({ product }) => {
  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  return (
    <Pressable
      style={styles.container}
      onPress={() => navigation.navigate("Detail", { id: product.id })}
    >
      <View style={styles.imageContainer}>
        <Image
          style={styles.image}
          resizeMode="cover"
          source={{ uri: product.img }}
        />
      </View>
      <View style={styles.textContainer}>
        <Text
          style={[styles.title, width < 300 ? styles.titleMin : styles.titleMax]}
        >
          {product.description}
        </Text>
        <Text style={styles.price}>${product.price}</Text>
      </View>
    </Pressable>
  );
};

export default ProductItem;

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.primary,
    marginVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    width: "90%",
    marginHorizontal: "5%",
    gap: 10,
    borderRadius: 12,
    shadowColor: "#000000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  imageContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  textContainer: {
    flex: 2,
    paddingLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
  },
  title: {
    fontFamily: "OpenSansBold",
    color: colors.background,
    flexShrink: 1,
  },
  titleMin: {
    fontSize: 14,
  },
  titleMax: {
    fontSize: 20,
  },
  price: {
    fontSize: 18,
    color: colors.secondary,
    fontWeight: "bold",
    backgroundColor: colors.background,
    padding: 5,
    borderRadius: 5,
    marginLeft: 100,
  },
  image: {
    width: 100,
    height: 120,
    borderRadius: 12,
  },
});
