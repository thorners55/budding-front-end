import React, { useRef } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import Arrow from '../../assets/tutorials/part_2/arrow.svg';
import ArrowFlipped from '../../assets/tutorials/part_2/arrow_flipped.svg';

function MeasureAnimation() {
  const startValue = useRef(new Animated.Value(57)).current;
  const button1 = useRef(new Animated.Value(1)).current;
  const button2 = useRef(new Animated.Value(1)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(startValue, {
        toValue: 57,
        duration: 1000,
      }),
      Animated.timing(startValue, {
        toValue: -39,
        duration: 1000,
      }),
      Animated.timing(button1, {
        toValue: 0,
        duration: 1,
      }),
      Animated.timing(startValue, {
        delay: 1000,
        toValue: -189,
        duration: 1000,
      }),
      Animated.timing(button2, {
        toValue: 0,
        duration: 1,
      }),
      Animated.timing(button1, {
        delay: 1000,
        toValue: 1,
        duration: 1,
      }),
      Animated.timing(button2, {
        toValue: 1,
        duration: 1,
      }),
      Animated.timing(startValue, {
        toValue: 57,
        duration: 1000,
        opacity: 0.1,
      }),
    ]),
  ).start();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[styles.square, { transform: [{ translateY: startValue }] }]}
      >
        <View style={styles.arrow_container}>
          <View style={{ marginRight: 15 }}>
            <ArrowFlipped height={30} width={30}></ArrowFlipped>
          </View>
          <View>
            <View style={styles.oval}></View>
            <View style={styles.horizontal_line} />
            <View style={styles.vertical_line} />
          </View>
          <View style={{ marginLeft: 15 }}>
            <Arrow height={30} width={30}></Arrow>
          </View>
        </View>
      </Animated.View>
      <View style={{ marginLeft: 135, marginTop: 90 }}>
        <Animated.View style={[styles.button_next_2]}>
          <TouchableOpacity style={[styles.button_next_2]}>
            <Text style={styles.button_text_step_2}>third marker</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.button_next_2, { opacity: button2 }]}>
          <TouchableOpacity style={[styles.button_next_2]}>
            <Text style={styles.button_text_step_2}>second marker</Text>
          </TouchableOpacity>
        </Animated.View>
        <Animated.View style={[styles.button_next, { opacity: button1 }]}>
          <TouchableOpacity style={[styles.button_next]}>
            <Text style={styles.button_text_step_2}>first marker</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </View>
  );
}

export default MeasureAnimation;

const styles = StyleSheet.create({
  container: {},
  arrow_container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  square: {
    height: 20,
    width: 50,
  },
  oval: {
    zIndex: 10,
    elevation: 11,
    position: 'relative',
    height: 70,
    width: 200,
    opacity: 0.3,
    backgroundColor: '#fdbe39',
    borderRadius: 200,
  },
  horizontal_line: {
    position: 'absolute',
    height: 1,
    width: 200,
    marginTop: 35,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  vertical_line: {
    position: 'absolute',
    height: 70,
    width: 1,
    marginLeft: 100,
    opacity: 1,
    backgroundColor: 'red',
    borderRadius: 5,
  },
  button_next: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 45,
  },
  button_next_2: {
    position: 'absolute',
    backgroundColor: 'white',
    borderRadius: 5,
    marginTop: 20,
    justifyContent: 'center',
    alignSelf: 'center',
    width: 200,
    height: 45,
  },
  button_text_step_2: {
    fontSize: 25,
    color: '#52875a',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
