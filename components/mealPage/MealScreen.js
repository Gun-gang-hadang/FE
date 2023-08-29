import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Text, View, StyleSheet, Image, Button} from 'react-native';
import CustomButton from '../common/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';
import CameraButton from './CameraButton';
import axios from 'axios';
import {launchImageLibrary} from 'react-native-image-picker/src';
import Splash from '../screenChange/Splash';

function MealScreen() {
  const [pages, setPage] = useState('BUTTONPAGE');
  const [cameraImage, setCameraImage] = useState(null);
  const [splash, setSplash] = useState(null);
  const navigation = useNavigation();

  const onSelectImage = async () => {
    const image = {
      uri: '',
      type: 'image/jpeg',
      name: 'meal',
    };

    //갤러리에서 사진 불러오기
    await launchImageLibrary({}, res => {
      image.name = res.assets[0].fileName;
      image.type = res.assets[0].type;
      image.uri = res.assets[0].uri;

      const formdata = new FormData();
      formdata.append('ImgLibrary', image);

      const headers = {
        'Content-Type':
          'multipart/form-data; boundary=someArbitraryUniqueString',
      };
      console.log(image);
      console.log(formdata);

      //서버에 폼데이터 전송
      axios
        .post('http://localhost:3000/api/v1/analysis/imglibrary', formdata, {
          headers: headers,
        })
        .then(response => {
          if (response) {
            console.log(response.data);
          }
        })
        .catch(error => {
          if (error.response) {
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
          } else if (error.request) {
            console.log(error.request);
          } else {
            console.log('Error', error.message);
          }
        });

      navigation.navigate('MealAnalysis', {uri: res.assets[0].uri});
    });
  };
  if (pages === 'BUTTONPAGE') {
    return (
      <SafeAreaView style={styles.full}>
        <Text style={styles.titleText}>식단 분석</Text>
        <View style={styles.container}>
          <CameraButton
            title={'음식 사진 찍기'}
            buttonColor={colors.main}
            onChangePage={_page => {
              setPage(_page);
            }}
            onSplash={_splash => {
              setSplash(_splash);
            }}
            onPushImage={_state => {
              setCameraImage(_state);
            }}
          />
          <CustomButton
            title={'음식 사진 가져오기'}
            buttonColor={colors.main}
            onPress={onSelectImage}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (pages === 'IMAGEPAGE') {
    return (
      <SafeAreaView style={styles.full}>
        <Image source={{uri: cameraImage.assets[0].uri}} style={styles.bg} />
        <Button
          title="뒤로"
          onPress={() => {
            setPage('BUTTONPAGE');
          }}
        />
        {splash && <Splash />}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#FEF4EB',
  },
  titleText: {
    fontSize: 35,
    color: 'black',
    margin: 20,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
    marginBottom: 90,
  },
  bg: {
    flex: 1,
    padding: 10,
  },
});

export default MealScreen;
