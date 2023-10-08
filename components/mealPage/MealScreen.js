import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import ImageManipulator from 'react-native-image-manipulator';
import CustomButton from '../common/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';
import {launchCamera} from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker/src';
import MealAnalysis from './MealAnalysis';
import {iconPath} from '../measurePage/iconPath';
import config from '../config';

const proxyUrl = config.proxyUrl;

function MealScreen() {
  const [pages, setPage] = useState('BUTTONPAGE');
  const [cameraImage, setCameraImage] = useState(null);
  const [newCameraImage, setNewCameraImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const formdata = new FormData();

  // 로딩 화면
  useEffect(() => {
    if (isLoading && pages === 'MEALANALYSISPAGE') {
      const timeoutId = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isLoading, pages]);

  // 백으로 이미지 전송
  const sendImageToBack = (imageData) => {
    formdata.append('image', imageData);
    fetch(proxyUrl + "/api/v1/analyze/image", {
      method: 'POST',
      cache: 'no-cache',
      body: formdata,
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`post image HTTP Error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then(result => {
        console.log('요청 성공');
        console.log(result);
        setPage('MEALANALYSISPAGE');
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
  };

  const onTakeImage = async () => {
    setIsLoading(true);
    launchCamera({}, async res => {
      // 사진 안 찍으면 원래 페이지로 돌아옴
      if (res.didCancel) {
        setIsLoading(false);
        return;
      }
      const image = {
        name: res.assets[0].fileName,
        type: res.assets[0].type,
        uri: res.assets[0].uri,
      };

      try {
        const rotatedImage = await ImageManipulator.manipulate(
          image.uri,
          [{ rotate: 270 }],
          { compress: 1, format: 'jpg' }
        );
        rotatedImage.name = image.name;
        rotatedImage.type = image.type;

        setCameraImage(res);
        sendImageToBack(rotatedImage);
        setNewCameraImage(rotatedImage);
        console.log(res)
        console.log(image)
        console.log(rotatedImage)
      } catch (error) {
        console.error('이미지 회전 오류:', error);
        setIsLoading(false);
      }
    });
  }

  const onSelectImage = async () => {
    setIsLoading(true);
    const image = {
      uri: '',
      type: 'image/jpeg',
      name: 'meal',
    };

    await launchImageLibrary({}, res => {
      // 앨범에서 선택 안하면 원래 페이지로 돌아옴
      if (res.didCancel) {
        setIsLoading(false);
        return;
      }
      
      image.name = res.assets[0].fileName;
      image.type = res.assets[0].type;
      image.uri = res.assets[0].uri;
      
      setCameraImage(res);
      setNewCameraImage(res.assets[0])
      sendImageToBack(image);
    });
  };

  if (pages === 'BUTTONPAGE') {
    return (
      <SafeAreaView style={styles.full}>
        <Text style={styles.titleText}>식단 분석</Text>
        <View style={styles.container}>
          <View>
            <Text style={styles.subinfotext}>* 식단 사진에서 음식을 인지하여 급격한 혈당 상승</Text>
            <Text style={styles.subinfotextsecondline}>을 막을 수 있도록 섭취 순서를 추천해드립니다.</Text>
            <Text style={styles.subinfotext}>* 정확하고 상세한 영양소 정보도 제공되므로 쉽고</Text>
            <Text style={styles.subinfotextsecondline}>간편하게 식단 관리를 해보세요.</Text>
            <Text style={styles.subinfotext}>* 이미지가 선명하고 깨끗할수록 분석이 정확해집</Text>
            <Text style={styles.subinfotextsecondline}>니다. 너무 기울어진 이미지는 피해주십시오.</Text>
            <Text style={[styles.subinfotext, {color: '#EF0000'}]}>* 사진을 가로로 찍을 때는 휴대폰을 반시계 방향</Text>
            <Text style={[styles.subinfotextsecondline, {color: '#EF0000'}]}>으로 돌려주십시오.</Text>
          </View>
          <View style={styles.choiceWay}>
            <TouchableOpacity
              style={[styles.selectButton, { backgroundColor: colors.main }]}
              onPress={onTakeImage}
            >
              <Image source={iconPath.camera} style={styles.icon}/>
              <Text style={styles.buttonText}>카메라로</Text>
              <Text style={styles.buttonText}>사진찍기</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.selectButton, { backgroundColor: colors.main }]}
              onPress={onSelectImage}
            >
              <Image source={iconPath.gallery} style={styles.icon}/>
              <Text style={styles.buttonText}>앨범에서</Text>
              <Text style={styles.buttonText}>가져오기</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  if (isLoading) {
    const mealImage = cameraImage.assets[0];
    return (
      <SafeAreaView style={styles.full}>
        <Text style={styles.titleText}>식단 분석</Text>
        <View style={styles.container}>
          {cameraImage && cameraImage.assets && mealImage ? (
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: newCameraImage.uri }}
                style={styles.foodImage}
                resizeMode="contain"
              />
            </View>
          ) : (
            <Text>이미지를 찾을 수 없습니다.</Text>
          )}
          <Text style={styles.loadingText}>분석 중입니다.</Text>
          <Text style={styles.loadingText}>잠시만 기다려주세요...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (pages === 'MEALANALYSISPAGE') {
    return (
      <MealAnalysis
        onChangeMode={_state => {
          setPage(_state);
        }}
        urisource={newCameraImage.uri}
        imageWidth={cameraImage.assets[0].width}
        imageHeight={cameraImage.assets[0].height}
      />
    );
  }
}

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
    marginTop: 33,
    marginBottom: 20,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    marginBottom: 90,
  },
  bg: {
    flex: 1,
    padding: 10,
  },
  subinfotext: {
    fontSize: 14,
    fontFamily: 'Pretend-SemiBold',
    color: 'black',
    marginLeft: 20,
    marginTop: 10,
  },
  subinfotextsecondline: {
    fontSize: 14,
    fontFamily: 'Pretend-SemiBold',
    color: 'black',
    marginLeft: 31,
    marginRight: 35,
    marginTop: 2,
    marginBottom: 15,
  },
  choiceWay: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bg,
    marginLeft: 3,
    flexDirection: 'row',
  },
  CameraButton : {
    fontFamily: 'Pretendard-SemiBold',
  },
  selectButton: {
    borderRadius: 20,
    width: 155,
    padding: 25,
    marginTop: 60,
    marginLeft: 15,

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
  icon: {
    width: 40,
    height: 40,
    marginLeft: 35,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 20,
    fontFamily: 'TheJamsil3-Regular',
    textAlign: 'center',
    color: 'black'
  },
  loadingText: {
    fontSize: 20,
    textAlign: 'center',
    fontFamily: 'Pretendard-SemiBold',
    color: 'black'
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },

  foodImage: {
    width: '95%',
    height: undefined,
    aspectRatio: 1,
    marginBottom: -15,
    marginTop: -25,
  },
});

export default MealScreen;