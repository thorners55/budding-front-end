import React, { useRef } from 'react';
import { View, Animated, StyleSheet } from 'react-native';
import Arrow from '../../assets/tutorials/part_2/arrow.svg';

function ArrowLoop() {
  const startValue = useRef(new Animated.Value(1)).current;

  Animated.loop(
    Animated.sequence([
      Animated.timing(startValue, {
        toValue: 80,
        duration: 800,
      }),
      Animated.timing(startValue, {
        toValue: 1,
        duration: 500,
      }),
    ]),
  ).start();

  return (
    <View style={styles.container}>
      <Animated.View
        style={[
          styles.square,
          {
            transform: [
              {
                translateY: startValue,
              },
            ],
          },
        ]}
      >
        <Arrow height={30}></Arrow>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  square: {
    width: 50,
  },
});

export default ArrowLoop;
