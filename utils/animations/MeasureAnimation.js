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
  const startValue = useRef(new Animated.Value(57)).current; // starts at position 57
  const button1 = useRef(new Animated.Value(1)).current; // starts as opaque
  const button2 = useRef(new Animated.Value(1)).current;

  // measure bar stays on bottom of pot for 1 second
  // measure bar takes 1 second to move to top of pot
  // "first marker" moves into saying "second marker" by changing button1 opacity to 0
  // measure bar waits one second before moving to top of plant and takes 1 second to move there
  // button2 opacity goes from initial value of 1 to 0 - "second marker" becomes transparent and moves into saying "third marker"
  // after 1 second, says "first marker" again by fsetting "first marker" to opaque (if don't do this will say "second marker" throughout whole animation)
  // "second marker" to opaque again, but doesn't show (if don't do this will show "third marker" instead of second marker in next loops)
  // measure bar goes back to bottom of plant

  Animated.loop(
    Animated.sequence([
      Animated.timing(startValue, {
        toValue: 57, // stays in place when starts
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
        toValue: 1, // "
        duration: 1,
      }),
      Animated.timing(button2, {
        toValue: 1,
        duration: 1,
      }),
      Animated.timing(startValue, {
        toValue: 57,
        duration: 1000,
      }),
    ]),
  ).start();

  return (
    // the view is the animated view - this is how both animations move together
    <View>
      <Animated.View
        style={[styles.square, { transform: [{ translateY: startValue }] }]}
      >
        {
          //animated view containing arrows and measure bar
        }
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
          {
            // animated view containing the marker placement description
            // nested animated views of "first marker" and "third marker"
          }

          <Text style={styles.button_text_step_2}>third marker</Text>
        </Animated.View>
        <Animated.View style={[styles.button_next_2, { opacity: button2 }]}>
          <Text style={styles.button_text_step_2}>second marker</Text>
        </Animated.View>
        <Animated.View style={[styles.button_next, { opacity: button1 }]}>
          <Text style={styles.button_text_step_2}>first marker</Text>
        </Animated.View>
      </View>
    </View>
  );
}

export default MeasureAnimation;

const styles = StyleSheet.create({
  arrow_container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignItems: 'center',
    marginLeft: -10,
  },
  square: {
    height: 20,
    width: 70,
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
