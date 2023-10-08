import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {iconPath} from './iconPath';

function VideoButtons(props) {
  const buttonClickedHandler = () => {
    props.onChangeMode(!props.val);
  };

  const buttonBackgroundColor = props.val ? '#FD9639' : '#FED5AF';

  return (
    <TouchableOpacity 
      onPress={buttonClickedHandler} 
      style={[styles.pButton, {backgroundColor: buttonBackgroundColor}]}>
      <Image
        source={props.val ? iconPath.playButton : iconPath.pausedButton}
        style={styles.image}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  pButton: {
    width: 55,
    height: 55,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    opacity: 0.8,
    margin: 10,
    marginLeft: 48,
    marginTop: 50,
    marginBottom: 0,
  },
  image: {
    width: 55,
    height: 55,
  },
});

export default VideoButtons;
