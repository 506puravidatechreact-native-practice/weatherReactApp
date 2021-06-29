import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableWithoutFeedback,
  Animated,
  Alert,
} from 'react-native';
import {Picker} from '@react-native-picker/picker';

const AppForm = ({search, setSearch, setState}) => {
  const {city, country} = search;

  // Animated APi to create animation
  const [btnAnimation] = useState(new Animated.Value(1));

  const checkFields = () => {
    console.log('cheking data' + 'country: ' + country + 'city: ' + city);
    if (country.trim() === '' || city.trim() === '') {
      showValidationDialog();
      return;
    }

    // consultar la api
    setState(true);
  };

  const showValidationDialog = () => {
    Alert.alert('Error', 'City and Country are required', [{text: 'Ok '}]);
  };

  //
  const animateIn = () => {
    //console.log('you are entering');
    Animated.spring(btnAnimation, {
      toValue: 0.65,
      useNativeDriver: true, // <-- Add this
    }).start();
  };

  //
  const animateOut = () => {
    //console.log('you are going out');
    Animated.spring(btnAnimation, {
      toValue: 1,
      friction: 5,
      tension: 20,
      useNativeDriver: true, // <-- Add this
    }).start();
  };

  const animationStyle = {
    transform: [{scale: btnAnimation}],
  };

  return (
    <>
      <View style={styles.wrapperForm}>
        <View>
          <TextInput
            value={city}
            style={styles.input}
            onChangeText={city => setSearch({...search, city})}
            placeholder="City"
            placeholderTextColor="#555"
          />
        </View>
        <View>
          <Picker
            selectedValue={country}
            itemStyle={{height: 120, backgroundColor: '#FFF'}}
            onChangeText={country => setSearch({...search, country})}>
            <Picker.Item label=" -- Select a country --" value="" />
            <Picker.Item label=" U S A" value="US" />
            <Picker.Item label=" Mexico" value="MX" />
            <Picker.Item label=" Argentina" value="AR" />
            <Picker.Item label=" Colombia" value="CO" />
            <Picker.Item label=" Costa Rica" value="CR" />
            <Picker.Item label=" Spain" value="ES" />
            <Picker.Item label=" Peru" value="PE" />
          </Picker>
        </View>
        <TouchableWithoutFeedback
          onPressIn={() => animateIn()}
          onPressOut={() => animateOut()}
          onPress={() => checkFields()}>
          <Animated.View style={[styles.btnSearch, animationStyle]}>
            <Text style={styles.textSearch}>Find the Weather</Text>
          </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapperForm: {
    fontSize: 22,
    marginTop: 100,
  },
  input: {
    padding: 10,
    height: 50,
    backgroundColor: '#FFF',
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
  },
  btnSearch: {
    marginTop: 50,
    backgroundColor: '#000',
    padding: 10,
    justifyContent: 'center',
  },
  textSearch: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase',
    fontSize: 18,
  },
});

export default AppForm;
