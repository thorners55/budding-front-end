import React, { useState } from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

function NewPlantHome({ plant_id, pot_height, navigation, userId }) {
  let potHeight = pot_height;
  let plantId = plant_id;
  const [imagePicker, setImagePickerScreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  // pass pot height down as a prop, set this as state, and have in input box when loads IF it is a new snapshot entry
  // if have selected a photo, image picker screen appears with 'use photo' or 'choose another photo'

  let launchCameraAsync = async () => {
    let permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Permission to access camera is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchCameraAsync();
    if (pickerResult.cancelled === true) {
      return;
    }
    imagePickerScreen(pickerResult.uri);
  };

  let openImagePickerAsync = async () => {
    navigation.navigate('new plant');
    let permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permission to access camera roll is required!');
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if (pickerResult.cancelled === true) {
      return;
    } else {
      imagePickerScreen(pickerResult.uri);
    }
  };

  let imagePickerScreen = (uri) => {
    setSelectedImage(uri);
    setImagePickerScreen(true);
  };

  if (imagePicker && selectedImage)
    return (
      <View style={styles.container}>
        <View style={styles.image_container}>
          <Image
            source={{
              uri: selectedImage,
            }}
            style={styles.image}
          />
        </View>
        <TouchableOpacity
          style={styles.button_next}
          onPress={() => {
            setImagePickerScreen(false);
            setSelectedImage(false);
            navigation.navigate('new snapshot', {
              image: selectedImage,
              pot_height: potHeight,
              plant_id: plantId,
              userId,
            });
          }}
        >
          <Text style={styles.button_text}>use photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_back}
          onPress={openImagePickerAsync}
        >
          <Text style={styles.button_text_back}>choose another photo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button_back}
          onPress={launchCameraAsync}
        >
          <Text style={styles.button_text_back}>take another photo</Text>
        </TouchableOpacity>
      </View>
    );
  else
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          style={{ width: 100, height: 100, marginBottom: 25 }}
          source={require('../../assets/gifs/Shifter_V01_static.gif')}
        />
        <TouchableOpacity onPress={launchCameraAsync} style={styles.button}>
          <Text style={styles.button_text}>take a photo</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={openImagePickerAsync} style={styles.button}>
          <Text style={styles.button_text_tutorial}>pick from gallery</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('tutorial')}
          style={styles.button_tutorial}
        >
          <Text style={styles.button_text}>tutorial</Text>
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    marginBottom: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  button_tutorial: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  button_text: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button_text_tutorial: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image_container: {
    height: '50%',
    width: '80%',
    backgroundColor: '#355a3a',
    borderRadius: 10,
    marginBottom: 10,
  },
  image: {
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
    borderRadius: 10,
  },
  button_next: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  button_text_back: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
    color: '#52875a',
  },
  button_back: {
    borderRadius: 5,
    marginBottom: -10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
});

export default NewPlantHome;
