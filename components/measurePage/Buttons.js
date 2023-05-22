import React from 'react';
import {StyleSheet, Image, TouchableOpacity} from 'react-native';
import {iconPath} from './iconPath';

function Buttons(props) {
  let new_id; //초기화
  const buttonClickedHandler = () => {
    if (props.arrow && !(props.id === 0)) {
      new_id = props.id - 1;
      props.onChangeMode(new_id);
      props.onPlayed();
    }
    if (!props.arrow && !(props.id === 5)) {
      new_id = props.id + 1;
      props.onChangeMode(new_id);
      props.onPlayed();
    }
  };
  return (
    <TouchableOpacity
      onPress={buttonClickedHandler}
      style={[
        styles.roundButton,
        !props.arrow && styles.buttonRight,
        props.arrow && props.id === 0 && styles.edgePage,
        !props.arrow && props.id === 5 && styles.edgePage,
      ]}>
      <Image
        source={props.arrow ? iconPath.arrowLeft : iconPath.arrowRight}
        style={[
          styles.image,
          props.arrow ? styles.arrowLeft : styles.arrowRight,
          props.arrow && props.id === 0 && styles.opacity,
          !props.arrow && props.id === 5 && styles.opacity,
        ]}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    width: 100,
    height: 100,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD9639',
    margin: 20,
    marginBottom: 15,
  },
  buttonRight: {
    marginLeft: 42,
  },
  image: {
    width: 50,
    height: 50,
  },
  arrowRight: {
    marginLeft: 10,
  },
  arrowLeft: {
    marginRight: 10,
  },
  edgePage: {
    backgroundColor: '#FED5AF',
  },
  opacity: {
    opacity: 0.5,
  },
});

export default Buttons;
