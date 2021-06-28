import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  useColorScheme,
} from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const colorSchema = useColorScheme();

  const themeTextStyle =
    colorSchema === 'light' ? styles.darkThemeText : styles.lightThemeText;
  const themeContainerStyle =
    colorSchema === 'light' ? styles.darkContainer : styles.lightContainer;

  const [location, setLocation] = useState(null);
  const [locationOld, setLocationOld] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      console.log({ status });
      if (status !== 'granted') {
        setErrorMsg('A permissão não foi concedida');
        return;
      }
    })();
  }, []);

  let getLocation = async () => {
    let location = await Location.getCurrentPositionAsync({});
    setLocation(location);
  };
  let getLocationOld = async () => {
    let location = await Location.getLastKnownPositionAsync({ maxAge: 1000 });
    setLocationOld(location);
  };

  return (
    <View style={[styles.container, themeContainerStyle]}>
      <Text style={[styles.header, themeTextStyle]}>
        Aplicativo para testar VELOCIDADE de busca da localização
      </Text>
      <TouchableOpacity style={styles.button} onPress={getLocation}>
        <Text style={styles.buttonText}>Buscar localicação</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={getLocationOld}>
        <Text style={styles.buttonText}>Buscar localicação Antiga</Text>
      </TouchableOpacity>
      <Text style={[styles.textLocation, themeContainerStyle]}>
        {JSON.stringify(location)}
      </Text>
      <Text style={[styles.textLocationOld, themeContainerStyle]}>
        {' '}
        {JSON.stringify(locationOld)}
      </Text>
      <Text style={themeContainerStyle}>{errorMsg}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#888',
  },
  button: {
    width: 300,
    borderRadius: 20,
    padding: 20,
    backgroundColor: '#1E40AF',
    alignItems: 'center',
    marginVertical: 20,
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  textLocation: {
    fontSize: 20,
    color: '#fff',
  },
  textLocationOld: {
    fontSize: 20,
    color: 'blue',
  },

  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
});
