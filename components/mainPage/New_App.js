import React from 'react';
import {View, StyleSheet, Pressable, Image, Text} from 'react-native';
import colors from '../../assets/colors/colors';
import logo from '../../assets/images/logo.png';
import kakaoLogo from '../../assets/images/kakaoLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';

const App = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={logo} resizeMode="contain" />

      <Pressable
        style={[styles.button, {backgroundColor: '#FDDC3F'}]}
        onPress={() => alert('카카오 로그인')}>
        <Image source={kakaoLogo} />
        <Text style={styles.btnText}>카카오 로그인</Text>
      </Pressable>

      <Pressable style={[styles.button, {backgroundColor: '#FFFFFF'}]}>
        <Image source={googleLogo} />
        <Text style={styles.btnText}>구글로 로그인</Text>
      </Pressable>
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
    marginTop: 50,
    marginBottom: 150,
  },

  button: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 70,
    paddingVertical: 17,
    marginBottom: 30,
    alignItems: 'center',

    elevation: 3,
  },

  btnText: {
    fontSize: 28,
    fontFamily: 'Pretendard-SemiBold',
    color: '#000000',
    marginLeft: 20,
  },
});

export default App;
