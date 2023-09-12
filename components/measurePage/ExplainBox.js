import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const ExplainBox = ({id}) => {
  const explainText = [
    '(1)\n측정 전 비누로 손을\n깨끗이 씻고 건조합니다.',
    '(2)\n채혈할 손가락을 약 10~15초 간\n심장 아래쪽으로 내려서 흔들고\n손가락 끝에 피가 모이도록 합니다.',
    '(3)\n혈당측정기에\n혈당 측정 검사지를 넣습니다.',
    '(4)\n채혈기에 채혈침을 꽂고 찌르는\n깊이를 조절합니다.',
    '(5)\n손가락의 가장자리를\n채혈침으로 찌른 후 필요한 양만큼의\n혈액을 채취합니다.',
    '(6)\n혈당 측정 검사지 반응부위에\n혈액을 묻히고 정상적으로\n표시되는지 확인합니다.',
  ];
  return (
    <View style={styles.block}>
      <Text style={styles.bodyText}>{explainText[id]}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginTop: 420,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: '#FFEB8A',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    width: 380,
    height: 140,
  },
  bodyText: {
    lineHeight: 33,
    fontSize: 25,
    paddingLeft: 10,
    paddingRight: 10,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    textAlign: 'center',
  },
});

export default ExplainBox;
