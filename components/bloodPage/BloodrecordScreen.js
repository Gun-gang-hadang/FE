import React, {useState} from 'react';
import {SafeAreaView, StyleSheet, Text, View, Pressable} from 'react-native';

const BloodrecordScreen = () => {
  return (
    <SafeAreaView style={styles.full}>
      <Text style={styles.titleText}>혈당 기록</Text>
      <View style={styles.block} />
      <Pressable style={styles.button}>
        <Text style={[styles.title, {color: 'black'}]}>저장하기</Text>
      </Pressable>
    </SafeAreaView>
  );
};
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
  block: {
    backgroundColor: '#FFEB8A',
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    height: 300,
    //box-shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,

    elevation: 3,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#FED5AF',
    marginLeft: 50,
    marginRight: 50,
    height: 50,
    //box-shadow
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 1,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    fontSize: 20,
    fontFamily: 'TheJamsil3-Regular',
  },
});

export default BloodrecordScreen;
