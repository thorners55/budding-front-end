import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PotHeightSVG from '../../assets/tutorials/part_2/pot_measure_2.svg';
import MeasureAnimation from '../../utils/animations/MeasureAnimation';

function Step3({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.tutorial_heading}>
          3 Calculating plant's height
        </Text>
        <Text style={styles.tutorial_text}>
          Place the marker at the bottom of the pot, and press 'add first
          marker' button
          {'\n'}
          {'\n'}
          Place the marker at the top of the pot, and press 'add second marker'
          button
          {'\n'}
          {'\n'}
          Place the marker at the highest point of the plant, and press 'add
          third marker' button
        </Text>

        <View style={styles.section_1_container}>
          <View style={styles.image_container}>
            <PotHeightSVG height={330} width={210}></PotHeightSVG>
          </View>
          <View style={styles.arrow_container}>
            <MeasureAnimation></MeasureAnimation>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.button_get_started]}
          onPress={() => {
            navigation.navigate('new plant');
          }}
        >
          <Text style={styles.button_text}>get started!</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button_back]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.button_text_back}>back to step 2</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Step3;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  section_1_container: {
    marginTop: 20,
    width: 270,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  image_container: {
    borderRadius: 10,
    marginTop: 20,
    height: 420,
    paddingRight: '5%',
    flex: 7,
  },
  arrow_container: {
    marginTop: 210,
    position: 'absolute',
    flex: 1,
  },
  tutorial_heading: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingBottom: 15,
    color: 'blue',
    fontFamily: 'arciform',
    fontSize: 45,
    color: '#355a3a',
    textAlign: 'center',
  },
  tutorial_text: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    width: '75%',
  },
  button_get_started: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    marginTop: 40,
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
