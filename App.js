import React, { useState } from 'react';
// Import axios, BASE_URL, dan API_KEY
import axios from 'axios';
import { BASE_URL, API_KEY } from './src/constant';
import { View, StyleSheet, ScrollView } from 'react-native';
import WeatherSearch from './src/components/weatherSearch';
import WeatherInfo from './src/components/weatherInfo';

const App = () => {
  // Definisikan state "weatherData" dan "setWeatherData"
  const [weatherData, setWeatherData] = useState();
  const searchWeather = (location) => {
    axios
      .get(`${BASE_URL}?q=${location}&appid=${API_KEY}`)
      .then((response) => {
        const data = response.data;
        // Tambahkan code di bawah
        data.visibility /= 1000;
        data.visibility = data.visibility.toFixed(2);
        data.main.temp -= 273.15; // Konversi Kelvin ke Celcius
        data.main.temp = data.main.temp.toFixed(2);
        setWeatherData(data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <WeatherSearch searchWeather={searchWeather} />
        {/* Tampilkan data cuaca ketika ada weatherData */}
        {weatherData && <WeatherInfo weatherData={weatherData} />}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
  },
  scrollContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    marginVertical: 20,
    width: '100%',
  },
  weatherInfoBox: {
    marginTop: 20,
    width: '100%',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default App;
