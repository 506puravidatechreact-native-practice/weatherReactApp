import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
} from 'react-native';
import AppForm from './src/components/AppForm';
import AppWeather from './src/components/AppWeather';

const App = () => {
  const [search, setSearch] = useState({
    city: '',
    country: '',
  });
  const [getState, setState] = useState(false);
  const [result, setResult] = useState({});
  const [bgcolor, setBgcolor] = useState('rgb(71, 149, 212)');
  const {city, country} = search;

  useEffect(() => {
    console.log('App : the response is: ' + getState);

    const getWeather = async () => {
      if (getState) {
        const apiKey = '56bd81eb644f60676d2efee945de812e';
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${apiKey}`;

        console.log('App : the url is: ' + url);
        try {
          const response = await fetch(url);
          console.log('App : the response is: ' + response);
          const result = await response.json();
          console.log('App : the result is: ' + result);

          setResult(result);
          setState(false);

          // Modifica los colores de fondo basado en la temperatura

          const kelvin = 273.15;
          const {main} = result;
          const current = main.temp - kelvin;

          if (current < 10) {
            setBgcolor('rgb( 105, 108, 149 )');
          } else if (current >= 10 && current < 25) {
            setBgcolor('rgb(71, 149, 212)');
          } else {
            setBgcolor('rgb( 178, 28, 61)');
          }
        } catch (error) {
          showMessage();
        }
      }
    };
    getWeather();
  }, [city, country, getState]);

  const showMessage = () => {
    Alert.alert('Error', 'We did not get results, try again', [{text: 'OK '}]);
  };

  const hideKeyboard = () => {
    Keyboard.dismiss();
  };

  const bgColorApp = {
    backgroundColor: bgcolor,
  };

  return (
    <>
      <TouchableWithoutFeedback onPress={() => hideKeyboard()}>
        <View style={[styles.mainApp, bgColorApp]}>
          <View style={styles.wrapper}>
            <AppWeather result={result} />
            <AppForm
              search={search}
              setSearch={setSearch}
              setState={setState}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    </>
  );
};

const styles = StyleSheet.create({
  mainApp: {
    flex: 1,
    //backgroundColor: 'rgb(71, 149, 212)',
    justifyContent: 'center',
  },
  wrapper: {
    marginHorizontal: '2.5%',
  },
});

export default App;
