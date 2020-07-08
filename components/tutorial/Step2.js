import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import PotHeightSVG from '../../assets/tutorials/part_2/pot_measure.svg';
import ArrowLoop from '../../utils/animations/Arrow';

function Step2({ navigation }) {
  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.tutorial_heading}>2, measuring your pot</Text>
        <Text style={styles.tutorial_text}>
          To calculate your plant's height, we need the height of the pot in
          centimetres, from the base to the very top of the rim.
        </Text>

        <View style={styles.section_1_container}>
          <View style={styles.image_container}>
            <PotHeightSVG height={330} width={210}></PotHeightSVG>
          </View>
          <View style={styles.arrow_container}>
            <ArrowLoop></ArrowLoop>
          </View>
        </View>
        <Text style={styles.tutorial_cm}>e.g. 12 cm</Text>

        <Text style={styles.tutorial_text_2}>
          Enter the pot height in cm. We will store the plant's pot height for
          you.{'\n'}
          {'\n'}
          If you re-pot your plant, you can either change the pot's height the
          next time you measure, or you can update its height in the 'edit
          plant' page.
        </Text>

        <TouchableOpacity
          style={[styles.button_next]}
          onPress={() => {
            navigation.navigate('step 3');
          }}
        >
          <Text style={styles.button_next_text}>step 3</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button_back]}
          onPress={() => {
            navigation.goBack();
          }}
        >
          <Text style={styles.button_text_back}>back to step 1 </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

export default Step2;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
  section_1_container: {
    borderRadius: 10,
    marginTop: 20,
    flexDirection: 'row',
    width: 270,
    backgroundColor: 'white',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  image_container: {
    marginTop: 20,
    backgroundColor: 'white',
    paddingRight: '5%',

    flex: 7,
  },
  arrow_container: {
    marginTop: 200,
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
  tutorial_cm: {
    width: '100%',
    paddingLeft: '5%',
    paddingRight: '5%',
    paddingTop: 25,
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
    width: '65%',
  },
  tutorial_text_2: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    marginBottom: 15,
    width: '65%',
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
  button_next_text: {
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
