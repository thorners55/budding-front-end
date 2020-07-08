import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import PotHeightSVG from '../../assets/tutorials/part_2/pot_measure.svg';
import ArrowLoop from '../../utils/animations/Arrow';
import { ScrollView } from 'react-native-gesture-handler';

function NewSnapshotPage(props) {
  const { image, plant_id, pot_height, userId } = props.route.params;
  const [potHeight, setPotHeight] = useState(pot_height);
  const [plantId, setPlantId] = useState(plant_id);
  const { navigation } = props;

  return (
    <View>
      <ScrollView>
        <View style={styles.container}>
          <Text style={styles.tutorial_heading}>new snapshot</Text>
          <Text style={styles.tutorial_subheading}>
            input your pot height in centimetres - decimals are allowed
          </Text>

          <View style={styles.section_1_container}>
            <View style={styles.image_container}>
              <PotHeightSVG height={330} width={210}></PotHeightSVG>
            </View>
            <View style={styles.arrow_container}>
              <ArrowLoop></ArrowLoop>
            </View>
          </View>
        </View>

        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            alignContent: 'center',
          }}
        >
          <View
            style={{
              marginTop: 15,
              flexDirection: 'row',
              justifyContent: 'center',
            }}
          >
            <TextInput
              keyboardType="numeric"
              returnKeyType="done"
              value={potHeight}
              onChangeText={(height) => {
                setPotHeight(height);
              }}
              style={styles.input}
              placeholder={'__'}
              placeholderTextColor="#355a3a"
              maxLength={4}
            />

            <Text style={styles.cm_text}> cm</Text>
          </View>
        </View>

        <TouchableOpacity
          onPress={() => {
            if (!potHeight) {
              Alert.alert(
                'Pot height required',
                'Please enter a pot height in centimetres - decimals are allowed',
              );
            } else {
              navigation.navigate('measure plant', {
                plantId,
                potHeight,
                image,
                userId,
              });
            }
          }}
          style={styles.button_all}
        >
          <Text style={styles.button_text_all}>measure plant</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 65,
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
    textAlign: 'center', // <-- the magic
  },
  tutorial_subheading: {
    textAlign: 'center',
    marginBottom: 5,
    fontSize: 20,
    color: '#52875a',
    fontFamily: 'arciform',
    width: '65%',
  },
  input: {
    color: '#355a3a',
    fontSize: 50,
    textAlign: 'right',
    marginBottom: 5,
  },
  cm_text: {
    fontSize: 50,
    color: '#355a3a',
  },
  button_text_all: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '600',
  },
  button_all: {
    backgroundColor: '#52875a',
    borderRadius: 5,
    marginBottom: 25,
    marginTop: 25,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '65%',
    height: 45,
  },
});

export default NewSnapshotPage;
