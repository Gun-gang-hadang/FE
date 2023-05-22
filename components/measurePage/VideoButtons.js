import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {iconPath} from './iconPath';

function VideoButtons(props) {
  const buttonClickedHandler = () => {
    props.onChangeMode(!props.val);
  };
  return (
    <TouchableOpacity onPress={buttonClickedHandler} style={styles.pButton}>
      <Image
        source={props.val ? iconPath.playButton : iconPath.pausedButton}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pButton: {
    width: 65,
    height: 65,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FED5AF',
    opacity: 0.8,
    margin: 10,
    marginLeft: 37,
    marginTop: 40,
    marginBottom: 0,
  },
  image: {
    width: 65,
    height: 65,
  },
});

export default VideoButtons;
