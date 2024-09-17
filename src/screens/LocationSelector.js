import { StyleSheet, Text, View, Alert } from 'react-native';
import { useEffect, useState } from 'react';
import * as Location from 'expo-location';
import MapPreview from '../components/MapPreview';
import { mapStaticApi } from '../firebase/googleApi';
import SubmitButton from '../components/SubmitButton';
import { usePostUserLocationMutation } from '../services/users';
import { useSelector } from 'react-redux';

const LocationSelector = ({ navigation }) => {
  const [location, setLocation] = useState({ latitude: "", longitude: "" });
  const [address, setAddress] = useState("");
  const localId = useSelector(state => state.auth.localId);
  const [triggerPostUserLocation] = usePostUserLocationMutation();

  useEffect(() => {
    let isMounted = true;

    const getLocation = async () => {
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          Alert.alert("Permiso denegado", "No se puede acceder a la ubicación.");
          return;
        }
        const newLocation = await Location.getCurrentPositionAsync();
        if (isMounted) {
          setLocation({
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude,
          });
        }
      } catch (error) {
        Alert.alert("Error", error);
      }
    };

    getLocation();

    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    const getAddress = async () => {
      if (location.latitude) {
        try {
          const urlReverseGeocoding = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${location.latitude},${location.longitude}&key=${mapStaticApi}`;
          const response = await fetch(urlReverseGeocoding);
          const data = await response.json();
          if (data.results && data.results[0]) {
            setAddress(data.results[0].formatted_address);
          } else {
            throw new Error("No se encontró la dirección."+data.results);
          }
        } catch (error) {
          Alert.alert("Error", "No se pudo obtener la dirección."+error);
        }
      }
    };

    getAddress();
  }, [location]);

  const handleConfirmLocation = () => {
    const userLocation = {
      ...location,
      address,
    };
    triggerPostUserLocation({ localId, userLocation });
    navigation.navigate("MyProfile");
  };

  return (
    <View style={styles.container}>
      <Text>Dirección: {address}</Text>
      <MapPreview location={location} />
      <SubmitButton title="Confirmar Ubicación" onPress={handleConfirmLocation} />
    </View>
  );
};

export default LocationSelector;

const styles = StyleSheet.create({
  container: {
    marginTop: 100,
    padding: 20,
  },
});
