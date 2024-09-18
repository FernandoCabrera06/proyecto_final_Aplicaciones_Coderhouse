import { StyleSheet, Text, View } from "react-native";
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { colors } from "../global/colors";

const OrderItem = ({ item }) => {
  return (
    <View style={styles.container}>
      <View style={styles.containerText}>
        <Text style={styles.date}>{item.createdAt}</Text>
        <Text style={styles.total}>Total: {item.total} $</Text>
      </View>
      <FontAwesome5 style={styles.icon} name="list-alt" size={35} color={colors.primary} />
    </View>
  );
};

export default OrderItem;

const styles = StyleSheet.create({
  container: {
    borderColor: colors.primary,
    borderWidth: 2,
    width: "90%",
    marginHorizontal: "5%",
    marginVertical: 10,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: 12, 
    backgroundColor: colors.background,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  containerText: {
    flex: 1,
    gap: 10,
  },
  date: {
    fontSize: 16,
    fontFamily: "OpenSansRegular",
    color: colors.textSecondary,
  },
  total: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "OpenSansBold",
    color: colors.textPrimary,
    backgroundColor: colors.primary,
    padding: 5,
    borderRadius: 5,
    textAlign: "center",
    overflow: "hidden",
  },
  icon:{
    marginLeft: 15
  }
});
