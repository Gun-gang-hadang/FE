import React, {useState} from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';

function CameraButton(props) {
  const addImage = () => {
    launchCamera({}, response => {
      const formdata = new FormData();
      const file = {
        name: response.assets[0].fileName,
        type: response.assets[0].type,
        uri: response.assets[0].uri,
      };
      formdata.append('file', file);
      axios({
        method: 'post',
        url: 'https://geonganghadang.api/v1/analysis/camera',
        data: formdata,
      })
        .then(result => {
          console.log('요청성공');
          console.log(result);
        })
        .catch(error => {
          console.log('요청실패');
          console.log(error);
        });

      console.log(response);
      props.onPushImage(response);
      props.onChangePage('IMAGEPAGE');
    });
  };
  return (
    <Pressable
      style={[styles.button, {backgroundColor: props.buttonColor}]}
      onPress={() => addImage()}>
      <Text style={[styles.title, {color: 'black'}]}>{props.title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 300,
    padding: 25,
    marginTop: 30,

    //box-shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontFamily: 'TheJamsil3-Regular',
  },
});

export default CameraButton;
