import React, {useEffect, useState} from 'react';
import {View, ScrollView, Text, StyleSheet} from 'react-native';
import FloatingWriteButton from './FloatingWriteButton';
import colors from '../../assets/colors/colors';
import DailyRecord from './DailyRecord';
import axios from 'axios';

const BloodScreen = () => {
  const [dailyRecord, setDailyRecord] = useState([]);
  useEffect(() => {
    axios.get('/bloodrecord').then(response => {
      setDailyRecord(response.data);
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.titleText}>혈당 기록</Text>
        <DailyRecord record={dailyRecord} />
      </ScrollView>

      <FloatingWriteButton />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  titleText: {
    fontSize: 35,
    color: 'black',
    margin: 20,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
});

export default BloodScreen;
