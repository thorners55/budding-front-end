import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import * as api from '../../api-requests/api';
const { options } = require('../../s3-config.js');
const shortid = require('shortid');
import { RNS3 } from 'react-native-s3-upload';
import RNPickerSelect from 'react-native-picker-select';
import * as Font from 'expo-font';
import { StackActions } from '@react-navigation/native';
import LoadingGif from '../LoadingGif';

function NewPlantEntry({ route, navigation }) {
  const [plantName, setPlantName] = useState('');
  const [type, setType] = useState('');
  const [variety, setVariety] = useState('');
  const [waterFreq, setWaterFreq] = useState('');
  const [soil, setSoil] = useState('');
  const [sunlight, setSunlight] = useState('');
  const [location, setLocation] = useState('');
  const [loading, isLoading] = useState(false);

  const { resizedImage, potHeight, plantHeight, userId } = route.params;
  let plantId = '';

  // renders new plant form, everything but soil and water frequency required
  // upon pressing 'add new plant' button, sends POST request to our database
  // once our POST request is successful, uploads to s3 bucket
  // uses response from s3 which details the image location in the bucket
  // posts this image location to snapshots in our database
  // navigates to garden page after image is posted to snapshots

  const submitPlant = () => {
    if (plantName.length < 1 || variety.length < 3) {
      Alert.alert(
        'Input field error',
        'Name must be between 1 and 25 characters, variety must be between 3 and 25 characters',
        [{ text: 'Got it' }],
      );
      isLoading(false);
      return;
    } else {
      isLoading(true);
      const name = shortid.generate();

      const file = {
        uri: resizedImage,
        name,
        type: 'image/jpg',
      };

      api
        .postPlant(
          userId,
          plantName,
          type,
          soil,
          sunlight,
          location,
          waterFreq,
          variety,
          potHeight,
        )
        .then((plant) => {
          plantId = plant.plant_id;
          return RNS3.put(file, options);
        })
        .then((response) => {
          if (response.status === 201) {
            const { postResponse } = response.body;
            return postResponse;
          } else {
            // stays on new plant page if there is an error and gives an alert
            Alert.alert('Error', 'Problem uploading photo. Please try again.');
            isLoading(false);
            console.log('error message: ', response.text);
          }
        })
        .then((postResponse) => {
          return api.postSnapshot(plantId, postResponse.location, plantHeight);
        })
        .then(() => {
          isLoading(false);
          setPlantName('');
          setType(null);
          setVariety('');
          setWaterFreq('');
          setSoil('');
          setSunlight(null);
          setLocation(null);
          Alert.alert(
            'Plant added',
            'Great! You can now view your plant in your garden!',
          );
          navigation.dispatch(StackActions.popToTop());
        })
        .catch((err) => {
          Alert.alert('Error', `${err}`);
          setPlantName('');
          isLoading(false);
          console.log(err);
        });
    }
  };

  if (loading) return <LoadingGif />;
  else {
    return (
      <ScrollView>
        <View>
          <View style={styles.container}>
            <Image
              style={styles.image}
              source={{
                uri: resizedImage,
              }}
            />
          </View>
          <View style={styles.header_text_container}>
            <Text style={styles.subHeadingText}>
              finally, enter your plant info below:
            </Text>
            <Text style={styles.title_text}>{plantName}</Text>
          </View>

          <View>
            <View style={styles.input_text_container}>
              <Text style={styles.input_text}>plant name:</Text>
            </View>
            <View style={styles.input_container}>
              <TextInput
                maxLength={25}
                onChangeText={(plantName) => {
                  setPlantName(plantName);
                }}
                style={styles.input}
                placeholder={'e.g. Plants Armstrong'}
              ></TextInput>
              <View style={styles.input_line}></View>
            </View>
          </View>

          <View style={styles.input_section_2}>
            <View style={styles.input_text_container}>
              <Text style={styles.input_text}>plant type:</Text>
            </View>
            <View style={styles.input_container}>
              <RNPickerSelect
                onValueChange={(value) => setType(value)}
                placeholder={{
                  label: 'select a plant type',
                }}
                style={{ ...pickerSelectStyles }}
                Icon={() => {
                  return <View style={styles.dropdown_icon} />;
                }}
                items={[
                  { label: 'garden', value: 'garden' },
                  { label: 'vegetable', value: 'vegetable' },
                  { label: 'fruit', value: 'fruit' },
                  { label: 'herb', value: 'herb' },
                  { label: 'houseplant', value: 'houseplant' },
                  { label: 'succulent', value: 'succulent' },
                ]}
              />
            </View>
          </View>

          <View style={styles.input_section_2}>
            <View style={styles.input_text_container}>
              <Text style={styles.input_text}>variety:</Text>
            </View>
            <View style={styles.input_container}>
              <TextInput
                returnKeyType="done"
                maxLength={25}
                onChangeText={(variety) => {
                  setVariety(variety);
                }}
                style={styles.input}
                placeholder={'e.g. bell pepper'}
              ></TextInput>
              <View style={styles.input_line}></View>
            </View>
          </View>

          <View style={styles.input_section_2}>
            <View style={styles.input_text_container}>
              <Text style={styles.input_text}>sunlight:</Text>
            </View>
            <View style={styles.input_container}>
              <RNPickerSelect
                onValueChange={(value) => setSunlight(value)}
                placeholder={{
                  label: 'select direct or indirect',
                }}
                style={{ ...pickerSelectStyles }}
                Icon={() => {
                  return <View style={styles.dropdown_icon} />;
                }}
                items={[
                  { label: 'indirect', value: 'indirect' },
                  { label: 'direct', value: 'direct' },
                ]}
              />
            </View>
          </View>
          <View style={styles.input_section_2}>
            <View style={styles.input_text_container}>
              <Text style={styles.input_text}>location:</Text>
            </View>
            <View style={styles.input_container}>
              <RNPickerSelect
                onValueChange={(value) => setLocation(value)}
                placeholder={{
                  label: 'select indoor or outdoor',
                }}
                style={{ ...pickerSelectStyles }}
                Icon={() => {
                  return <View style={styles.dropdown_icon} />;
                }}
                items={[
                  { label: 'indoor', value: 'indoor' },
                  { label: 'outdoor', value: 'outdoor' },
                ]}
              />
            </View>
          </View>

          <View style={styles.input_section_2}>
            <View style={styles.input_text_container}>
              <Text style={styles.input_text}>
                watering frequency:{' '}
                <Text style={styles.optional}>optional</Text>
              </Text>
            </View>
            <View style={styles.input_container}>
              <TextInput
                returnKeyType="done"
                maxLength={25}
                onChangeText={(freq) => {
                  setWaterFreq(freq);
                }}
                style={styles.input}
                placeholder={'e.g. once a week'}
              ></TextInput>
              <View style={styles.input_line}></View>
            </View>
          </View>

          <View style={styles.input_section_2}>
            <View style={styles.input_text_container}>
              <Text style={styles.input_text}>
                soil type: <Text style={styles.optional}>optional</Text>
              </Text>
            </View>
            <View style={styles.input_container}>
              <TextInput
                returnKeyType="done"
                maxLength={25}
                onChangeText={(soil) => {
                  setSoil(soil);
                }}
                style={styles.input}
                placeholder={'e.g. peat'}
              ></TextInput>
              <View style={styles.input_line}></View>
            </View>
          </View>
          <TouchableOpacity style={styles.button_all} onPress={submitPlant}>
            <Text style={styles.button_text_all}>add new plant</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    );
  }
}

export default NewPlantEntry;
const styles = StyleSheet.create({
  container: {
    height: 400,
    shadowOffset: { width: 1, height: 3 },
    shadowColor: '#355a3a',
    shadowOpacity: 3,
    elevation: 2,
    backgroundColor: '#355a3a',
    borderBottomRightRadius: 50,
    borderBottomLeftRadius: 50,
    marginBottom: 40,
  },
  image: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    borderBottomRightRadius: 25,
    borderBottomLeftRadius: 25,
  },
  title_text: {
    marginTop: 10,
    marginBottom: 10,
    fontSize: 40,
    color: '#355a3a',
    fontWeight: 'bold',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
  subHeadingText: {
    marginBottom: 20,
    fontSize: 18,
    color: '#355a3a',
    paddingLeft: '5%',
    paddingRight: '5%',
    textAlign: 'center',
    fontFamily: 'arciform',
  },
  input_section_2: {
    marginTop: 40,
  },
  input_container: {
    alignItems: 'center',
    alignContent: 'center',
  },
  input_text_container: {
    marginLeft: 51,
    marginBottom: 5,
  },
  input_text: {
    fontSize: 18,
    color: '#355a3a',
    fontWeight: '600',
  },
  input: {
    fontSize: 18,
    fontWeight: '300',
    color: '#355a3a',
    borderStyle: 'solid',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#e6e6e6',
    width: '80%',
    height: 50,
  },
  input_line: {
    marginTop: -10,
    width: '75%',
    height: 1,
    backgroundColor: '#355a3a',
  },
  optional: {
    fontSize: 10,
    color: 'grey',
  },
  button_text_all: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  button_all: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    marginBottom: 45,
    marginTop: 45,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  dropdown_icon: {
    marginLeft: -70,
    backgroundColor: 'transparent',
    borderTopWidth: 10,
    borderTopColor: 'white',
    borderRightWidth: 10,
    borderRightColor: 'transparent',
    borderLeftWidth: 10,
    borderLeftColor: 'transparent',
    width: 0,
    height: 0,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    marginLeft: 41,
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    borderStyle: 'solid',
    padding: 11,
    borderRadius: 5,
    backgroundColor: '#52875a',
    width: '80%',
    height: 50,
  },
  inputAndroid: {
    marginLeft: 41,
    fontSize: 18,
    fontWeight: '300',
    color: 'white',
    borderStyle: 'solid',
    padding: 11,
    borderRadius: 5,
    backgroundColor: '#52875a',
    width: '80%',
    height: 50,
  },
  iconContainer: {
    top: 20,
    right: 10,
  },
  placeholder: {
    color: 'white',
    fontSize: 18,
    fontWeight: '300',
  },
});
