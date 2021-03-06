import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import { FlatGrid } from 'react-native-super-grid';
import * as api from '../../api-requests/api';
import GlobalStyles from '../../styles/GlobalStyles';
import TimeAgo from 'react-native-timeago';
import { useIsFocused } from '@react-navigation/native';
import * as Font from 'expo-font';
import CameraIcon from '../../assets/icons/camera_icon.svg';
import LoadingGif from '../LoadingGif';

function Garden({ userId, navigation }) {
  const [sort_by, changeSort] = useState('created_at');
  const [snaps, setSnaps] = useState([]);
  const [loading, isLoading] = useState(true);
  const [order, changeOrder] = useState('desc');
  const [plant_type, changeType] = useState(null);

  const isFocused = useIsFocused();

  // fetches data again when the drop down sort buttons change, or using isFocused if that view is focused (if come back to garden page after navigating away - this is a way to get it to re-render when a new plant has been added)

  useEffect(() => {
    Font.loadAsync({
      arciform: require('../../assets/fonts/Arciform.otf'),
    }).then(
      api
        .getPlantsByUserId(userId, order, sort_by, plant_type)
        .then((plants) => {
          const snapShotArr = plants.map((plant) => {
            const { plant_id, plant_name, snapshot_count, created_at } = plant;
            return api.getSnapshotsByPlantId(plant_id).then((snap) => {
              const { height, plant_id, plant_uri, snapshot_id } = snap[0];
              return {
                plant_name,
                snapshot_count,
                created_at,
                height,
                plant_id,
                plant_uri,
                snapshot_id,
              };
            });
          });

          Promise.all(snapShotArr).then((snapshots) => {
            setSnaps(snapshots);
            isLoading(false);
          });
        })
        .catch((err) => {
          console.log(err);
        }),
    );
  }, [order, sort_by, plant_type, isFocused]);

  const toggleSortBy = (data) => {
    if (data === 'most snaps') {
      changeOrder('desc');
      changeSort('snapshot_count');
    }
    if (data === 'least snaps') {
      changeOrder('asc');
      changeSort('snapshot_count');
    }
  };

  const toggleOrder = (data) => {
    if (data === 'desc') {
      changeOrder('desc');
      changeSort('created_at');
    }
    if (data === 'asc') {
      changeOrder('asc');
      changeSort('created_at');
    }
  };

  if (loading) return <LoadingGif />;
  else {
    return (
      <SafeAreaView style={[GlobalStyles.droidSafeArea, { flex: 1 }]}>
        <Text style={styles.title}>my garden</Text>
        <View style={styles.hero_container}>
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            color={'green'}
            onValueChange={(value) => toggleOrder(value)}
            placeholder={{}}
            items={[
              { label: 'newest', value: 'desc' },
              { label: 'oldest', value: 'asc' },
            ]}
            style={pickerSelectStyles}
            Icon={() => {
              return <View style={pickerSelectStyles.sort_by_button} />;
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => toggleSortBy(value)}
            placeholder={{ label: 'sort by' }}
            items={[
              { label: 'most snaps', value: 'most snaps' },
              { label: 'least snaps', value: 'least snaps' },
            ]}
            style={pickerSelectStyles}
            Icon={() => {
              return <View style={pickerSelectStyles.sort_by_button} />;
            }}
          />
          <RNPickerSelect
            useNativeAndroidPickerStyle={false}
            onValueChange={(value) => changeType(value)}
            placeholder={{ label: 'all plants' }}
            items={[
              { label: 'garden', value: 'garden' },
              { label: 'vegetable', value: 'vegetable' },
              { label: 'fruit', value: 'fruit' },
              { label: 'herb', value: 'herb' },
              { label: 'houseplant', value: 'houseplant' },
              { label: 'succulent', value: 'succulent' },
            ]}
            style={pickerSelectStyles}
            Icon={() => {
              return <View style={pickerSelectStyles.sort_by_button} />;
            }}
          />
        </View>
        <View style={styles.container}>
          {snaps.length === 0 && (
            <>
              <Text style={styles.add_plants}>
                you don't have any plants! get growing!
              </Text>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('plant navigator', { user_id: userId });
                  // goes through plant navigator to get to new plant screen - have to go through navigator to be able to pass down props as it goes through a different tab navigator and thus different stack, so won't pass props
                }}
                style={styles.button}
              >
                <Text style={styles.button_text}>add new plant</Text>
              </TouchableOpacity>
            </>
          )}
          <FlatGrid
            itemDimension={130}
            data={snaps}
            style={styles.grid_view}
            spacing={10}
            renderItem={({ item }) => (
              <View>
                <View style={styles.plant_container}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('plant page', {
                        item,
                        //deletingPlant,
                      })
                    }
                    style={styles.image}
                  >
                    <Image
                      source={{ uri: item.plant_uri }}
                      style={styles.image}
                      onLoad={isLoading(false)}
                    />
                  </TouchableOpacity>
                </View>
                <View style={styles.plant_view}>
                  <View style={styles.plant_left_view}>
                    <TouchableOpacity
                      onPress={() =>
                        navigation.navigate('plant page', {
                          item,
                          deletingPlant,
                        })
                      }
                    >
                      <Text style={styles.plant_name}>{item.plant_name}</Text>
                    </TouchableOpacity>

                    <Text style={styles.plant_stats}>
                      <>posted: </>
                      <TimeAgo
                        time={item.created_at}
                        style={styles.plant_stats_value}
                      />
                    </Text>

                    <Text style={styles.plant_stats}>
                      <>height: </>
                      <Text style={styles.plant_stats_value}>
                        {item.height}cm
                      </Text>
                    </Text>
                  </View>
                  <View style={styles.snapshot}>
                    <Text style={styles.plant_stats}>
                      <>{item.snapshot_count} </>
                      <View width={13} height={13} style={{ paddingTop: 2 }}>
                        <CameraIcon width={13} height={13} fill="green" />
                      </View>
                    </Text>
                  </View>
                </View>
              </View>
            )}
          />
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 40,
    color: '#355a3a',
    fontFamily: 'arciform',
    marginTop: 20,
  },
  add_plants: {
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 30,
    color: '#355a3a',
    fontFamily: 'arciform',
    marginTop: 20,
  },
  grid_view: {
    marginTop: 5,
    flex: 1,
  },
  hero_container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    zIndex: 2,
    backgroundColor: '#dbdbdb',
    paddingVertical: 10,
  },
  container: {
    flex: 2,
    zIndex: 1,
  },
  plant_container: {
    justifyContent: 'flex-end',
    borderRadius: 5,
    height: 250,
    borderColor: '#52875a',
    borderWidth: 1,
    overflow: 'hidden',
  },
  plant_view: {
    marginTop: 5,
    marginBottom: 10,
  },
  plant_left_view: {
    marginLeft: 3,
    flex: 1,
  },
  snapshot: {
    position: 'absolute',
    marginLeft: '85%',
    marginTop: -5,
  },
  plant_name: {
    fontSize: 25,
    color: '#355a3a',
    fontFamily: 'arciform',
  },
  plant_stats: {
    fontWeight: '400',
    marginTop: 5,
    fontSize: 12,
    color: '#52875a',
  },
  plant_stats_value: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#355a3a',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  button: {
    backgroundColor: '#fdbe39',
    borderRadius: 5,
    marginBottom: 15,
    marginTop: 15,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '83%',
    height: 45,
  },
  button_text: {
    fontSize: 25,
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'white',
    borderColor: 'gray',
    backgroundColor: '#52875a',
    paddingHorizontal: 20,
    paddingVertical: 7.5,
  },
  inputAndroid: {
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'white',
    borderColor: 'gray',
    backgroundColor: '#52875a',
    paddingHorizontal: 20,
    paddingVertical: 7.5,
  },
  sort_by_button: {
    backgroundColor: 'transparent',
    borderTopWidth: 35,
    borderTopColor: 'transparent',
    borderRightWidth: 50,
    borderRightColor: 'transparent',
    borderLeftWidth: 50,
    borderLeftColor: 'transparent',
    borderBottomWidth: 35,
    borderBottomColor: 'transparent',
    width: 20,
    height: 20,
  },
});

export default Garden;
