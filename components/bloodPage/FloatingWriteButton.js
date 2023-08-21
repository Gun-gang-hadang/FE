import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Platform, Pressable, StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import colors from '../../assets/colors/colors';

const FloatingWriteButton = () => {
  const navigation = useNavigation();
  const onPress = () => {
    navigation.navigate('Write');
  };

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={({pressed}) => [styles.button]}
        android_ripple={{color: 'white'}}
        onPress={onPress}>
        <Icon name="add" size={40} style={styles.icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    position: 'absolute',
    bottom: 16,
    right: 16,
    width: 70,
    height: 70,
    borderRadius: 50,
    //안드로이드 전용 그림자 설정
    elevation: 5,
    //안드로이드에서 물결 효과가 영역 밖으로 나가지 않도록 설정
    overflow: Platform.select({android: 'hidden'}),
  },
  button: {
    width: 70,
    height: 70,
    borderRadius: 50,
    backgroundColor: colors.main,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
  },
});

export default FloatingWriteButton;
