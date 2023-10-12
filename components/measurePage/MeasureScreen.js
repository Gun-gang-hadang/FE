import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import Body from './Body';
import Buttons from './Buttons';
import VideoButtons from './VideoButtons';

const MeasureScreen = () => {
  const [id, setId] = useState(0);
  const [pausedState, setPausedState] = useState(false);
  return (
    <SafeAreaView style={styles.full}>
      <Text style={styles.titleText}>측정 방법</Text>
      <Body
        id={id}
        pausedState={pausedState}
        onPlayedPaused={_paused => {
          setPausedState(_paused);
        }}
      />
      <View style={styles.block}>
        <Buttons
          arrow={true}
          id={id}
          onChangeMode={_id => {
            setId(_id);
          }}
          onPlayed={() => {
            setPausedState(false);
          }}
        />
        <VideoButtons
          val={pausedState}
          onChangeMode={_state => {
            setPausedState(_state);
          }}
        />
        <Buttons
          arrow={false}
          id={id}
          onChangeMode={_id => {
            setId(_id);
          }}
          onPlayed={() => {
            setPausedState(false);
          }}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#FEF4EB',
  },
  titleText: {
    fontSize: 28,
    color: 'black',
    margin: 20,
    marginLeft: 26,
    marginTop: 40,
    marginBottom: 20,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  block: {
    flexDirection: 'row',
    marginBottom: 18,
  },
});

export default MeasureScreen;
