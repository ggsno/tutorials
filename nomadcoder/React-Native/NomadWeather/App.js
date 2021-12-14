import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, ScrollView, StyleSheet, Text, View } from "react-native";
import * as Location from "expo-location";

const SCREEN_WIDTH = Dimensions.get("window").width;
const API_KEY = "f5fec730cf5f6845dbd5edf2bc554012";
export default function App() {
  const [city, setCity] = useState("Loading ...");
  const [days, setDays] = useState([]);
  const [ok, setOk] = useState(true);
  const getWeather = async () => {
    let { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 5 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city);
    const json = await (await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${API_KEY}&units=metric&lang=kr`)).json();
    setDays(json.daily);
    console.log(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View style={style.container}>
      <View style={style.city}>
        <Text style={style.cityName}>{city}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={style.weather}
      >
          {days.length === 0
          ? <View style={style.day}>
              <ActivityIndicator color="black" size="large" style={{}} />
            </View>
          : (days.map((day, index) => 
            <View key={index} style={style.day}>
              <Text style={style.date}>{getDate(new Date(day.dt * 1000))}</Text>
              <Text style={style.temperture}>{day.temp.day.toFixed(1)+`℃`}</Text>
              <Text style={style.description}>{day.weather[0].main}</Text>
              <Text style={style.tiny}>{day.weather[0].description}</Text>
            </View>
          ))}
      </ScrollView>
    </View>
  );
}

const getDate = (ms) => {
  const now = new Date(ms);
  return `${now.getMonth() + 1}월 ${now.getDate()}일 ${now.getHours()}시 ${now.getMinutes()}분`
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffcf04",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  weather: {},
  cityName: {
    fontSize: 30,
    fontWeight: "700",
  },
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  date: {
    fontSize: 20
  },
  temperture: {
    fontSize: 100,
  },
  description: {
    fontSize: 60,
  },
  tiny: {
    fontSize: 30,
  }
});
