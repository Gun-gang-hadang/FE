import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Pressable, Image, Text} from 'react-native';
import colors from '../../assets/colors/colors';
import textLogo from '../../assets/images/gghd.png';
import imageLogo from '../../assets/images/logo.png';
import kakaoLogo from '../../assets/images/kakaoLogo.png';
import googleLogo from '../../assets/images/googleLogo.png';
import * as KakaoLogin from '@react-native-seoul/kakao-login';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import newnewApp from '../../newnewApp';
import config from '../config';

const proxyUrl = config.proxyUrl;

const Login = () => {
  const [pages, setPage] = useState('LOGIN');
  //서버 전송
  const kakaoPostData = result => {
    const data = {
      loginId: result.id,
      nickname: result.nickname,
    };
    fetch(proxyUrl + '/api/v1/login/kakao', {
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

  const kakaoLogin = () => {
    KakaoLogin.login()
      .then(result => {
        console.log('Kakao Login Success', JSON.stringify(result));
        getProfile();
      })
      .catch(error => {
        if (error.code === 'E_CANCELLED_OPERATION') {
          console.log('Kakao Login Cancel', error.message);
        } else {
          console.log(`Kakao Login Fail(code:${error.code})`, error.message);
        }
      });
  };

  const getProfile = () => {
    KakaoLogin.getProfile()
      .then(result => {
        console.log('Kakao GetProfile Success', JSON.stringify(result));
        //서버에 프로필 전송
        kakaoPostData(result);

        //내 혈당으로 화면 전환
        setPage('MAIN');
      })
      .catch(error => {
        console.log(`Kakao GetProfile Fail(code:${error.code})`, error.message);
      });
  };

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '363653527007-mapjrfan35g16v5osljt5n2rqo6g9c60.apps.googleusercontent.com',
    });
  }, []);

  const googlePostData = result => {
    const data = {
      loginId: result.user.providerData[0].uid,
      nickname: result.user.providerData[0].displayName,
    };
    fetch(proxyUrl + '/api/v1/login/google', {
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

  const googleLogin = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    console.log('idToken : ', idToken);
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // const res = await auth().signInWithCredential(googleCredential);

    // console.log(JSON.stringify(res));
    // console.log(res['additionalUserInfo']['profile']['name']);
    // console.log(res['user']['uid']);

    await auth()
      .signInWithCredential(googleCredential)
      .then(result => {
        console.log('Google GetProfile Success', JSON.stringify(result));
        //서버에 프로필 전송
        googlePostData(result);

        //내 혈당으로 화면 전환
        setPage('MAIN');
      })
      .catch(error => {
        console.log(
          `Google GetProfile Fail(code:${error.code})`,
          error.message,
        );
      });
  };

  if (pages === 'LOGIN') {
    return (
      <View style={styles.container}>
        <Image style={styles.logo} source={imageLogo} />
        <Image style={styles.image} source={textLogo} />
        <Pressable
          style={[styles.button, {backgroundColor: '#FDDC3F'}]}
          onPress={() => kakaoLogin()}>
          <Image source={kakaoLogo} />
          <Text style={styles.btnText}>카카오 로그인</Text>
        </Pressable>

        <Pressable
          style={[styles.button, {backgroundColor: '#FFFFFF'}]}
          onPress={() => googleLogin()}>
          <Image source={googleLogo} />
          <Text style={styles.btnText}>구글로 로그인</Text>
        </Pressable>
      </View>
    );
  } else {
    return newnewApp();
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
    resizeMode: 'contain',
    backgroundColor: colors.bg,
    justifyContent: 'center',
  },

  image: {
    width: 330,
    resizeMode: 'contain',
    marginBottom: 10,
  },

  button: {
    flexDirection: 'row',
    borderRadius: 10,
    paddingHorizontal: 70,
    // paddingVertical: 17,

    // marginBottom: 20,
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
