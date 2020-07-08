import React, { useRef, useState, useEffect } from 'react';
import {
  Animated,
  View,
  StyleSheet,
  PanResponder,
  Text,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';

import * as ImageManipulator from 'expo-image-manipulator';
import * as api from '../../api-requests/api';
const { options } = require('../../s3-config.js');
const shortid = require('shortid');
import { RNS3 } from 'react-native-s3-upload';
import LoadingGif from '../LoadingGif';

function MeasureFunction({ route, navigation }) {
  const { image, potHeight, plantId, userId } = route.params;
  const [bottomPotClick, setBottomPotClick] = useState(null);
  const [topPotClick, setTopPotClick] = useState(null);
  const [topPlantClick, setTopPlantClick] = useState(null);
  const height = useRef(null);
  const pressCount = useRef(0);
  const pan = useRef(new Animated.ValueXY()).current;
  const [showCalculateButton, setShow] = useState(false);
  const [resizedImage, setImage] = useState('');
  const [loading, isLoading] = useState(true);

  const name = shortid.generate();
  const file = {
    uri: resizedImage,
    name,
    type: 'image/jpg',
  };

  useEffect(() => {
    const runEffect = async () => {
      const resized = await ImageManipulator.manipulateAsync(image, [
        { resize: { width: 600 } },
      ]);
      setImage(resized.uri);
      isLoading(false);
    };
    runEffect();
  }, []);

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        // gesture has started - gestureState.d{x,y} set to 0 now (distance)
        // this means the animation will set the base offset to the current position (where it was just before was released last time - the next gesture will start at the same place, not reset to default)
        pan.setOffset({
          y: pan.y._value,
        });
      },
      onPanResponderMove:
        // called whenever user moves finger - here this is the evt
        Animated.event([
          null, // raw event arg ignored
          { dy: pan.y }, // gestureState arg
        ]),
      // Creates a function that will automatically take the gestureState which has 2 keys on it dx and dy and put those changes on pan.x and pan.y

      onPanResponderRelease: () => {
        // user has released all touches
        pan.flattenOffset();
        // takes whatever values are in offset and add to base animated value,then reset offset to 0 - this stops the the measuring animation from jumping around
      },
    }),
  ).current;

  const addMarker = () => {
    const { _value } = pan.y;
    if (pressCount.current === 0) {
      pressCount.current++;
      setBottomPotClick(_value);
    } else if (pressCount.current === 1) {
      pressCount.current++;
      setTopPotClick(_value);
    } else if (pressCount.current === 2) {
      pressCount.current++;
      setTopPlantClick(_value);
      setShow(true);
    }
  };

  const resetMeasure = () => {
    setBottomPotClick(0);
    setTopPotClick(0);
    setTopPlantClick(0);
    pressCount.current = 0;
    setShow(false);
  };

  const calculateDistance = () => {
    const promise = new Promise((resolve, reject) => {
      const unit = (bottomPotClick - topPotClick) / potHeight;
      let plantHeight = (topPotClick - topPlantClick) / unit;
      height.current = plantHeight.toFixed(1);
      console.log(plantHeight + 'CM  ----PLANT HEIGHT');
    }).then(navNextPage());
  };

  const navNextPage = () => {
    isLoading(true);
    // if there's a plantId, send a patch request and upload snapshot photo to S3, then navigate to individual plant page
    // if not, go to new plant entry
    if (plantId) {
      return api
        .patchPlantById(
          plantId,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
          potHeight,
        )
        .then(() => {
          return RNS3.put(file, options);
        })
        .then((response) => {
          // if response is good, do post snapshot
          // if not, alert an error
          if (response.status === 201) {
            const { location } = response.body.postResponse;
            return api.postSnapshot(plantId, location, height.current);
          } else {
            // stays on measure function page if there is an error and gives an alert
            Alert.alert('Error', 'Problem uploading photo. Please try again.');
            isLoading(false);
            console.log('error message: ', response.text);
          }
        })
        .then(() => {
          Alert.alert('Successful', 'Snapshot added!');
          isLoading(false);
          navigation.push('garden');
        })
        .catch((err) => {
          console.log(err);
          Alert.alert('Error', `${err}`);
          isLoading(false);
        });
    } else {
      isLoading(false);
      navigation.navigate('new plant entry', {
        resizedImage,
        potHeight,
        plantHeight: height.current,
        userId,
      });
    }
  };

  if (loading) return <LoadingGif />;
  else {
    return (
      <View style={styles.container}>
        <View style={styles.header_container}>
          <Text style={styles.heading_text}>
            {pressCount.current === 0
              ? `Place your first marker at the bottom of the pot`
              : pressCount.current === 1
              ? `Place your second marker at the front rim of the pot`
              : pressCount.current === 2
              ? `Place your third marker at the top of the plant`
              : `Bloomin' marvellous! You can now hit the submit button below`}
            {
              // these instructions have to be as close to the same character count as possible because using flexbox - if there are more than two lines, it changes where the picture is placed on the screen, which moves the photo and means the picture's y coordinates are not consistent across measuring.
              // could fix this by re-factoring styling to use grid instead of flex.
            }
          </Text>
        </View>
        <Image
          style={styles.plant_photo}
          source={{
            uri: resizedImage,
          }}
        />
        <Animated.View
          style={{
            marginTop: -50,
            transform: [{ translateY: pan.y }],
          }}
          // this allows the measure box to reposition, using the values of where it is on the screen (pan.y)
          {...panResponder.panHandlers}
          // panResponder.panHandlers allows the animation to access the handlers, and thus tell it what to do when it moves
        >
          <View style={styles.oval} />
          <View style={styles.horizontal_line} />
          <View style={styles.vertical_line} />
        </Animated.View>
        {!showCalculateButton && (
          <TouchableOpacity onPress={addMarker} style={styles.top_button}>
            <Text style={styles.button_text}>{`add ${
              pressCount.current === 0
                ? 'first'
                : pressCount.current === 1
                ? 'second'
                : 'third'
            } marker`}</Text>
          </TouchableOpacity>
        )}
        {showCalculateButton && (
          <TouchableOpacity
            onPress={calculateDistance}
            style={styles.top_button_select}
          >
            <Text style={styles.button_text}>submit</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={resetMeasure} style={styles.button}>
          <Text style={styles.button_text_reset}>reset</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('tutorial');
          }}
          style={styles.button_tutorials}
        >
          <Text style={styles.button_text_tutorials}>tutorial</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default MeasureFunction;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header_container: {
    paddingLeft: 40,
    paddingRight: 40,
    paddingTop: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  heading_text: {
    textAlign: 'center',
    color: '#355a3a',
    fontSize: 25,
    lineHeight: 24,
    fontWeight: 'bold',
    marginBottom: 15,
    letterSpacing: -1,
  },
  oval: {
    zIndex: 10,
    elevation: 11,
    position: 'relative',
    height: 70,
    width: 300,
    opacity: 0.3,
    backgroundColor: '#fdbe39',
    borderRadius: 200,
  },
  horizontal_line: {
    position: 'absolute',
    height: 1,
    width: 300,
    marginTop: 35,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  vertical_line: {
    position: 'absolute',
    height: 70,
    width: 1,
    marginLeft: 150,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  top_button: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  top_button_select: {
    backgroundColor: '#fdbe39',
    alignItems: 'center',
    height: 45,
    width: '65%',
    marginTop: 0,
    padding: 4,
    borderRadius: 5,
    marginBottom: 5,
    zIndex: 5,
    elevation: 5,
  },
  button: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    marginTop: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
  button_tutorials: {
    borderRadius: 5,
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
  button_text_tutorials: {
    fontSize: 25,
    color: '#355a3a',
    textAlign: 'center',
    fontWeight: '300',
  },
  button_text_reset: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '300',
  },
  plant_photo: {
    width: 270,
    height: 315,
  },
});
