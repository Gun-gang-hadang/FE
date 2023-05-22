import React from 'react';
import {View, StyleSheet, Image, Text} from 'react-native';
import CustomButton from './components/CustomButton';

import colors from '../assets/colors/colors';
import logo from '../assets/images/logo.png';

const App = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} resizeMode="contain" />
      <CustomButton
        title={'카카오 로그인'}
        buttonColor={colors.main}
        onPress={() => alert('카카오 로그인 버튼')}
      />
      <CustomButton
        title={'Google 로그인'}
        buttonColor={colors.main}
        onPress={() => alert('Google 로그인 버튼')}
      />
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

  image: {
    marginBottom: 100,
  },
});

export default App;
