import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  Image
} from "react-native";
import { colors } from "../global/colors";
import { useNavigation } from "@react-navigation/native";

const Header = ({ title }) => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("Home")}
        style={styles.logoContainer}
      >
        <Image
          source={require('../../assets/logo.png')}
          resizeMode='cover'
          style={styles.image}
        />
      </Pressable>
      <View style={styles.titleContainer}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: colors.primary,
    width: "100%",
    height: 80,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    justifyContent: "space-between",
  },
  logoContainer: {
    position: "absolute",
    left: 10,
  },
  titleContainer: {
    flex: 1,
    alignItems: "center",
  },
  text: {
    fontSize: 25,
    fontFamily: "RobotoBold",
    color: "#FFF",
  },
  image: {
    width: 50,
    height: 35,
  },
});
