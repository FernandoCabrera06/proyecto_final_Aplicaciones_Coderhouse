import { Pressable, StyleSheet, Text, Image, View } from "react-native";
import { useNavigation } from "@react-navigation/native";


const images = {
  perros: require('../../assets/perros.png'),
  aves: require('../../assets/aves.png'),
  gatos: require('../../assets/gatos.png'),
  reptiles: require('../../assets/reptiles.png'),
  peces: require('../../assets/peces.png'),
};

const Category = ({ item }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      onPress={() => navigation.navigate("Products", { category: item })}
    >
      <View style={styles.container}>
          <Image
            source={images[item.toLocaleLowerCase()]}
            resizeMode='cover'
            style={styles.image}
          />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 15
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75
  },
});

export default Category;
