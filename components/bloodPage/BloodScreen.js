import React, {useEffect, useState} from 'react';
import {View,
  ScrollView,
  TouchableHighlight,
  Modal,
  Text,
  Image,
  StyleSheet,} from 'react-native';
import FloatingWriteButton from './FloatingWriteButton';
import colors from '../../assets/colors/colors';
import DailyRecord from './DailyRecord';
import axios from 'axios';

const BloodScreen = () => {
  const [dailyRecord, setDailyRecord] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  useEffect(() => {
    fetch("/api/v1/mysugar")
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json(); // Assuming the response is in JSON format
    })
    .then((data) => {
      // Handle the data
      setDailyRecord(data);
    }, [dailyRecord])
    .catch((error) => {
      if (error.response) {
        console.error("Backend Error:", error.response.data);
        console.error("Status Code:", error.response.status);
      } else if (error.request) {
        console.error("Network Error:", error.request);
      } else {
        console.error("Request Error:", error.message);
      }
    });
  });

  return (
    <View style={styles.container}>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableHighlight
              style={styles.closeButton}
              onPress={() => {
                setModalVisible(!modalVisible);
              }}
              underlayColor="#E8E8E8">
              <Text style={styles.closeText}>x</Text>
            </TouchableHighlight>

            <Text style={styles.modalTitle}>혈당 수치 기준</Text>
            <Image
              source={require('./bloodStandard.png')}
              style={styles.modalImage}
            />
            <Text style={styles.modalText}>출처: 대한당뇨병학회</Text>
          </View>
        </View>
      </Modal>
      <ScrollView>
        <View style={styles.headerContainer}>
          <Text style={styles.titleText}>내 혈당</Text>
          <TouchableHighlight
              style={styles.openButton}
              onPress={() => {
                setModalVisible(true);
              }}
              underlayColor="#F67B28">
              <Text style={styles.textStyle}>혈당 수치 기준</Text>
            </TouchableHighlight>
          </View>
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
    marginLeft: 5,
    marginRight: 5,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontSize: 35,
    color: 'black',
    margin: 15,
    marginTop: 40,
    marginBottom: 25,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  openButton: {
    height: 40,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 40,
    marginRight: 20,
    justifyContent: 'center',
    backgroundColor: '#FD9639',
    borderRadius: 20,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 50,
  },

  modalView: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    alignItems: 'center',
  },

  modalTitle: {
    color: '#000000',
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 23,
    fontWeight: 'bold',
  },

  modalText: {
    color: '#000000',
    marginBottom: 15,
    textAlign: 'center',
  },

  modalImage: {
    width: '95%',
    aspectRatio: 2, // 가로세로 비율 유지
    resizeMode: 'contain',
  },

  closeButton: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 10,
    right: 20,
    zIndex: 1,
    borderRadius: 50,
    paddingHorizontal: 8,
    // paddingVertical: 5,
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 10,
  },

  closeText: {
    color: '#000000',
    fontSize: 20,
  },
});

export default BloodScreen;
