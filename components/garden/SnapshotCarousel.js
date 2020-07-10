import React, { useState } from 'react';
import { Text, View, SafeAreaView, Image, StyleSheet } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import TimeAgo from 'react-native-timeago';

export default function SnapshotCarousel({ snapshots }) {
  const [carouselItems, setCarouselItems] = useState(snapshots);

  const renderItem = ({ item }) => {
    return (
      <View
        style={{
          backgroundColor: 'green',
          borderRadius: 5,
          height: 225,
          width: 225,
        }}
      >
        <Image
          style={styles.image}
          source={{
            uri: item.plant_uri,
          }}
        />
        <View style={styles.snap_overlay}></View>
        <View style={styles.image_text}>
          <View>
            <Text style={styles.image_text}>
              created: <TimeAgo time={item.created_at} />
            </Text>
          </View>
          <View style={styles.image_text_height_bottom}>
            <Text style={styles.image_text}>height: {item.height} cm</Text>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: 50 }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Carousel
          layout={'default'}
          data={carouselItems}
          sliderWidth={300}
          itemWidth={250}
          renderItem={renderItem}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  image: {
    position: 'absolute',
    borderRadius: 10,
    overflow: 'hidden',
    alignSelf: 'stretch',
    height: '100%',
    width: '100%',
  },
  image_text: {
    position: 'absolute',
    color: 'white',
    fontSize: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    fontSize: 15,
    padding: 5,
    fontWeight: 'bold',
  },
  image_text_height_bottom: {
    marginTop: 190,
  },
  snap_overlay: {
    backgroundColor: '#52875a',
    position: 'absolute',
    height: 225,
    width: 225,
    borderRadius: 6,
    opacity: 0.6,
  },
});
