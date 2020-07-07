import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import uploadToAnonymousFilesAsync from 'anonymous-files';

function NewPlantHome({ plant_id, pot_height, navigation, userId, route }) {
  const [imagePickerSelected, setPickerSelected] = React.useState(true);
  const [potHeight, setPotHeight] = useState(pot_height);
  const [plantId, setPlantId] = useState(plant_id);

  // pass pot height down as a prop, set this as state, and have in input box when loads IF it is a new snapshot entry
  // new snapshot button --> new plant page (take new photo, choose from library etc) --> back to individual plant page

  let launchCameraAsync = async () => {
    setPickerSelected(false);
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
    setPickerSelected(true);
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
    navigation.navigate('image picker', {
      potHeight,
      plantId,
      selectedImage: uri,
      openImagePickerAsync,
      launchCameraAsync,
      imagePickerSelected,
      userId,
    });
  };

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
        onPress={() =>
          navigation.navigate('tutorial', {
            openImagePickerAsync: openImagePickerAsync,
          })
        }
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
});

export default NewPlantHome;
