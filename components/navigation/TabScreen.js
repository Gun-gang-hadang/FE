import React from 'react';
import {Text, View, StyleSheet} from 'react-native';

import CustomButton from '../common/CustomButton';

import colors from '../../assets/colors/colors';

export const BloodSugar = () => {
  return (
    <View style={styles.container}>
      <Text>BloodSugar!</Text>
    </View>
  );
};

export const Meal = () => {
  return (
    <View style={styles.container}>
      <CustomButton
        title={'음식 사진 찍기'}
        buttonColor={colors.main}
        onPress={() => alert('카메라 실행')}
      />
      <CustomButton
        title={'음식 사진 가져오기'}
        buttonColor={colors.main}
        onPress={() => alert('앨범 실행')}
      />
    </View>
  );
};

export const Measure = () => {
  return (
    <View style={styles.container}>
      <Text>Measure!</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.bg,
  },
});
