import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, Button} from 'react-native';
import CustomButton from '../common/CustomButton';
import {SafeAreaView} from 'react-native-safe-area-context';
import colors from '../../assets/colors/colors';
import CameraButton from './CameraButton';

function MealScreen() {
  const [pages, setPage] = useState('BUTTONPAGE');
  const [image, setImage] = useState(null);
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
            onPushImage={_state => {
              setImage(_state);
            }}
          />
          <CustomButton
            title={'음식 사진 가져오기'}
            buttonColor={colors.main}
            onPress={() => alert('앨범 실행')}
          />
        </View>
      </SafeAreaView>
    );
  }
  if (pages === 'IMAGEPAGE') {
    return (
      <SafeAreaView style={styles.full}>
        <Image source={{uri: image.assets[0].uri}} style={styles.bg} />
        <Button
          title="뒤로"
          onPress={() => {
            setPage('BUTTONPAGE');
          }}
        />
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
