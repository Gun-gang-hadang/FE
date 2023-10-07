import React, {useEffect, useState} from 'react';
import {View,ScrollView, TouchableHighlight, Modal, Text, Image, StyleSheet, Pressable,} from 'react-native';
import FloatingWriteButton from './FloatingWriteButton';
import colors from '../../assets/colors/colors';
import DailyRecord from './DailyRecord';
import BloodrecordScreen from './BloodrecordScreen';
import config from '../config';
import BloodGraphScreen from './BloodGraphScreen';

const proxyUrl = config.proxyUrl;
const BloodScreen = () => {
  const [viewes, setView] = useState('BLOODLIST');
  const [dailyRecord, setDailyRecord] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [bloodpage, setBloodpage] = useState(true);

  //서버에서 정보 받아오는 훅
  useEffect(() => {
    fetch(proxyUrl + '/api/v1/mysugar')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(
        data => {
          // Handle the data
          setDailyRecord(data);
        },
        [dailyRecord],
      )
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
  });

  if (bloodpage && viewes === 'BLOODLIST') {
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
              <Text style={styles.modalTextLeft}>
                ※ 당뇨인 목표 수치에 도달하는 것을 단기적인 목표로 잡고
              </Text>
              <Text style={styles.modalTextLeftSecondLine}>
                건강하당 앱을 활용한 식단 조절을 통해 정상 수치에 도달하는
              </Text>
              <Text style={styles.modalTextLeftSecondLine}>
                것을 장기적인 목표로 설정하는 것을 추천드립니다.
              </Text>
            </View>
          </View>
        </Modal>
        <ScrollView>
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>내 혈당</Text>
            <View style={{flexDirection: 'column', paddingTop: 25}}>
              <TouchableHighlight
                style={styles.openButton}
                onPress={() => {
                  setModalVisible(true);
                }}
                underlayColor="#F67B28">
                <Text style={styles.textStyle}>혈당 수치 기준</Text>
              </TouchableHighlight>
            </View>
          </View>
          <View style={styles.choiceWay}>
            <TouchableHighlight
              style={styles.listOrGraphNow}
              onPress={() => {
                setView('BLOODLIST');
              }}
              underlayColor="#F67B28">
              <Text style={styles.listOrGraphTextStyleNow}>목록</Text>
            </TouchableHighlight>
            <TouchableHighlight
              style={styles.listOrGraph}
              onPress={() => {
                setView('GRAPH');
              }}
              underlayColor="#F67B28">
              <Text style={styles.listOrGraphTextStyle}>그래프</Text>
            </TouchableHighlight>
          </View>        
          <DailyRecord record={dailyRecord} />
        </ScrollView>

        <FloatingWriteButton
          onChangeMode={_state => {
            setBloodpage(_state);
          }}
        />
      </View>
    );
  } else if (bloodpage && viewes === 'GRAPH') {
    return <BloodGraphScreen onChangePage={mode => {
      setView(mode);
    }}
    record={dailyRecord} />;
  } else {
    return (
      <BloodrecordScreen
        onChangeMode={_state => {
          setBloodpage(_state);
        }}
      />
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    marginLeft: 5,
    marginRight: 5,
  },

  button: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: 180,
    marginTop: 30,
    backgroundColor: '#FEF4EB',
    justifyContent: 'center',
    alignItems: 'center',
  },

  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  titleText: {
    fontSize: 35,
    color: 'black',
    margin: 20,
    marginTop: 40,
    marginBottom: 25,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  
  openButton: {
    height: 30,
    paddingLeft: 20,
    paddingRight: 20,
    marginTop: 18,
    marginRight: 15,
    justifyContent: 'center',
    backgroundColor: '#FD9639',
    borderRadius: 20,
    elevation: 5,
  },

  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Pretendard-Blod',
  },

  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },

  modalView: {
    width: '95%',
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingBottom: 30,
    marginBottom: 40,
  },

  modalTitle: {
    color: '#000000',
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    marginBottom: -5,
  },

  modalText: {
    color: '#000000',
    marginTop: -35,
    marginBottom: 30,
    textAlign: 'center',
    fontFamily: 'Pretendard-Blod',
  },

  modalTextLeft: {
    color: '#000000',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 20,
    fontFamily: 'Pretendard-SemiBold',
  },

  modalTextLeftSecondLine: {
    color: '#000000',
    fontSize: 15,
    marginLeft: 23,
    fontFamily: 'Pretendard-SemiBold',
  },

  modalImage: {
    width: '95%',
    aspectRatio: 2, // 가로세로 비율 유지
    resizeMode: 'contain',
    alignItems: 'center',
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

  choiceWay: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  listOrGraphNow: {
    height: 30,
    width: 70,
    marginLeft: 15,
    backgroundColor: '#FD9639',
    borderColor: '#FD9639',
    borderWidth: 2,
    borderRadius: 5,
  },

  listOrGraph: {
    height: 30,
    width: 70,
    marginLeft: 15,
    backgroundColor: colors.bg,
    borderColor: '#FD9639',
    borderWidth: 2,
    borderRadius: 5,
  },

  listOrGraphTextStyleNow: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    justifyContent: 'center',
    textAlign: 'center',
  },

  listOrGraphTextStyle: {
    color: '#FD9639',
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    justifyContent: 'center',
    textAlign: 'center',
  }
});

export default BloodScreen;
