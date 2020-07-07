import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';

function ImagePickerScreen(props) {
  const { navigation } = props;
  const {
    plantId,
    potHeight,
    launchCameraAsync,
    openImagePickerAsync,
    selectedImage,
    imagePickerSelected,
    userId,
  } = props.route.params;

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
        onPress={() =>
          navigation.navigate('new snapshot', {
            image: selectedImage,
            pot_height: potHeight,
            plant_id: plantId,
            userId,
          })
        }
      >
        <Text style={styles.button_text_step_2}>use photo</Text>
      </TouchableOpacity>

      {
        // Need to include button if imagePickerSelected is false because when press 'choose another photo', tutorial button briefly appears
      }
      {imagePickerSelected && (
        <TouchableOpacity
          style={styles.button_back}
          onPress={openImagePickerAsync}
        >
          <Text style={styles.button_text_back}>choose another photo</Text>
        </TouchableOpacity>
      )}

      {imagePickerSelected || (
        <TouchableOpacity
          style={styles.button_back}
          onPress={launchCameraAsync}
        >
          <Text style={styles.button_text_back}>choose another photo</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
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
  button_text_step_2: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
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
    marginBottom: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
});

export default ImagePickerScreen;
