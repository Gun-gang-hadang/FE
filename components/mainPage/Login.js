import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, Image, Text} from 'react-native';
import colors from '../../assets/colors/colors';
import textLogo from '../../assets/images/gghd.png';
import imageLogo from '../../assets/images/logo.png';
import kakaoLogo from '../../assets/images/kakaoLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import newnewApp from '../../newnewApp';
import config from '../config';

const proxyUrl = config.proxyUrl;

const Login = () => {
  const [pages,setPage] = useState('LOGIN');
  //서버 전송
  const postData = result => {
    const data = {
      loginId: result.id,
      nickname: result.nickname,
    };
    fetch(proxyUrl + '/api/v1/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
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
  };

  const login = () => {
    KakaoLogin.login()
      .then(result => {
        console.log('Login Success', JSON.stringify(result));
        getProfile();
      })
      .catch(error => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Login Cancel', error.message);
        } else {
          console.log(`Login Fail(code:${error.code})`, error.message);
        }
      });
  };

  const getProfile = () => {
    KakaoLogin.getProfile()
      .then(result => {
        console.log('GetProfile Success', JSON.stringify(result));
        //서버에 프로필 전송
        postData(result);

        //내 혈당으로 화면 전환
        setPage('MAIN');
      })
      .catch(error => {
        console.log(`GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  if (pages === 'LOGIN'){
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={imageLogo} />
        <Image style={styles.image} source={textLogo} />
        <Pressable
          style={[styles.button, {backgroundColor: '#FDDC3F'}]}
          onPress={() => login()}>
          <Image source={kakaoLogo} />
          <Text style={styles.btnText}>카카오 로그인</Text>
        </Pressable>
  
        <Pressable style={[styles.button, {backgroundColor: '#FFFFFF'}]}>
          <Image source={googleLogo} />
          <Text style={styles.btnText}>구글로 로그인</Text>
        </Pressable>
      </View>
    );
  }
  else{
    return (newnewApp() );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.bg,
  },

  logo: {
    marginTop: 130,
    marginBottom: -50,
    width: 400,
    resizeMode: "contain",
    backgroundColor: colors.bg,
    justifyContent: 'center',
    
  },

  image: {
    width: 330,
    resizeMode: "contain",
    marginBottom: 10,
  },

  button: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 70,
    paddingVertical: 17,
    marginBottom: 20,
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

export default Login;
