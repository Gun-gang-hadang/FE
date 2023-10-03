import React, { Component } from 'react';
import { View, Image, StyleSheet, Animated, Easing, Pressable, Text } from 'react-native';
import colors from '../../assets/colors/colors';
import imageLogo from '../../assets/images/logo.png';
import textLogo from '../../assets/images/gghd.png';
import Login from './Login';
//import {useNavigation} from '@react-navigation/native';

class StartScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logoPositionY: new Animated.Value(0),
      showText: false,
      showButton: false,
      mainPage: true,
    };
  }

  componentDidMount() {
    Animated.timing(this.state.logoPositionY, {
      toValue: -120,
      duration: 1000,
      easing: Easing.linear,
      useNativeDriver: false,
    }).start(() => {
      this.setState({ showText: true, showButton: true});
    })
  }

  handleLoginPress = () => {
    // 로그인 페이지로 연결
    this.setState({mainPage:false});
  };


  render() {
    if(this.state.mainPage===true){
    return (
      <View style={styles.container}>
        <Animated.Image
          source={imageLogo}
          style={[
            styles.logo,
            {
              transform: [{ translateY: this.state.logoPositionY }],
            },
          ]}
        />
        {this.state.showText && (
          <Image source={textLogo} style={styles.textLogo}/>
        )}
        {this.state.showText && (
          <Pressable style={styles.startButton} onPress={(this.handleLoginPress)}>
            <Text style={styles.buttonText}>시작하기 →</Text>
          </Pressable>
        )}
      </View>
    );
  }else{
    return(<Login />);
  }
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    alignItems: 'center',
  },
  logo: {
    marginTop: 300,
    marginBottom: -50,
    width: 400,
    resizeMode: "contain",
    backgroundColor: colors.bg,
    justifyContent: 'center',
    
  },
  textLogo: {
    width: 330,
    resizeMode: "contain",
    marginTop: -130,
  },
  startButton: {
    width: 160,
    height: 50,
    backgroundColor: '#FD9639',
    borderRadius: 18,
    marginTop: -50,
  },
  buttonText: {
    fontFamily: 'Pretendard-SemiBold',
    color: 'black',
    fontSize: 24,
    textAlign: 'center',
    justifyContent: 'center',
    marginTop: 10,
  }
});

export default StartScreen;
