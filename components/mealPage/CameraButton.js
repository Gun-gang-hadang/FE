import React, {useState} from 'react';
import {Text, StyleSheet, View, Pressable} from 'react-native';
import {launchCamera} from 'react-native-image-picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';

function CameraButton(props) {
  const navigation = useNavigation();
  const addImage = () => {
    launchCamera({}, response => {
      props.onSplash(true);
      const formdata = new FormData();
      const file = {
        name: response.assets[0].fileName,
        type: response.assets[0].type,
        uri: response.assets[0].uri,
      };
      formdata.append('file', file);
      // axios({
      //   method: 'post',
      //   url: 'http://local:8080/api/v1/analyze/image',
      //   data: formdata,
      // })
      //   .then(result => {
      //     console.log('요청성공');
      //     console.log(result);
      //   })
      //   .catch(error => {
      //     console.log('요청실패');
      //     console.log(error);
      //   });

      //서버에 이미지 전송
      fetch('http://10.0.2.2:8080/api/v1/analyze/image', {
        method: 'POST',
        body: formdata,
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP Error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then(result => {
          console.log('요청 성공');
          console.log(result);
        })
        .catch(error => {
          if (error.response) {
            console.error('Backend Error:', error.response.data);
            console.error('Status Code:', error.response.status);
          } else if (error.request) {
            console.error('Network Error:', error.request);
          } else {
            console.error('Request Error:', error.message);
          }
        });

      props.onSplash(false);
      console.log(response);
      console.log(formdata._parts[0][1]);
      props.onPushImage(response);
      props.onChangePage('MEALANALYSISPAGE');
      //navigation.navigate('MealAnalysis', {uri: response.assets[0].uri});
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
