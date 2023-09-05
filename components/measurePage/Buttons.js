import React from 'react';
import { StyleSheet, Image, TouchableOpacity, Text, View } from 'react-native';
import { iconPath } from './iconPath';

function Buttons(props) {
  let new_id; // 초기화
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

  // Define the text content based on left or right arrow
  const buttonText = props.arrow ? '이전' : '다음';

  return (
    <TouchableOpacity
      onPress={buttonClickedHandler}
      style={[
        styles.roundButton,
        !props.arrow && styles.buttonRight,
        props.arrow && props.id === 0 && styles.edgePage,
        !props.arrow && props.id === 5 && styles.edgePage,
      ]}
    >
      <View style={styles.buttonContent}>
        {props.arrow && (
          <>
            <Image
              source={iconPath.arrowLeft}
              style={[styles.image, styles.arrowLeft, props.id === 0 && styles.opacity]}
            />
            <Text style={[styles.buttonText, props.id === 0 ? styles.edgePageText : null]}>
              {buttonText}
            </Text>
          </>
        )}
        {!props.arrow && (
          <>
            <Text style={[styles.buttonText, props.id === 5 ? styles.edgePageText : null]}>
              {buttonText}
            </Text>
            <Image
              source={iconPath.arrowRight}
              style={[styles.image, styles.arrowRight, props.id === 5 && styles.opacity]}
            />
          </>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  roundButton: {
    width: 110,
    height: 50,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FD9639',
    marginTop: 50,
    marginLeft: 15,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    marginLeft: 10,
    marginRight: 10,
    fontSize: 25,
    fontFamily: 'Pretendard-Regular',
  },
  buttonRight: {
    marginLeft: 30,
  },
  image: {
    width: 25,
    height: 25,
  },
  edgePage: {
    backgroundColor: '#FED5AF',
  },
  edgePageText: {
    color: '#7F6B58', // Change the text color for edgePage style
  },
  opacity: {
    opacity: 0.5,
  }
});

export default Buttons;
