import React from 'react';
import {StyleSheet, View} from 'react-native';
import ExplainBox from '../measurePage/ExplainBox';
import Video from 'react-native-video';
import {videoPath} from './videoPath';

function Body({id, pausedState}) {
  let vPath;
  switch (id) {
    case 0:
      vPath = videoPath.a;
      break;
    case 1:
      vPath = videoPath.b;
      break;
    case 2:
      vPath = videoPath.c;
      break;
    case 3:
      vPath = videoPath.d;
      break;
    case 4:
      vPath = videoPath.e;
      break;
    case 5:
      vPath = videoPath.f;
      break;
    default:
      vPath = videoPath.a;
  }
  return (
    <View style={styles.block}>
      <Video
        source={vPath}
        style={styles.backgroundVideo}
        resizeMode="cover"
        control={true}
        paused={pausedState}
        repeat={true}
      />
      <ExplainBox id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backgroundVideo: {
    position: 'absolute',
    top: 20,
    left: 5,
    bottom: 150,
    right: 5,
    borderWidth: 3,
    borderStyle: 'solid',
    borderColor: '#381B00',
  },
  posit: {
    backgroundColor: 'cyan',
  },
});
export default Body;
