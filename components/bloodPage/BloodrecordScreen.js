import React, {useState, useEffect} from 'react';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
  LogBox,
} from 'react-native';
import TimeStampList from './TimeStampList';
import CustomAlert from '../common/BloodRecordAlert';
import config from '../config';

const proxyUrl = config.proxyUrl;
LogBox.ignoreAllLogs();

const BloodrecordScreen = props => {
  const navigation = useNavigation();

  // 혈당
  const [bloodnum, setBloodnum] = useState('');
  const [id, setId] = useState(1);
  var bloodstate = '상태';
  var textcolor = '#381B00';

  // 잘못된 입력에 대한 alert
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const handleShowAlert = message => {
    setAlertMessage(message);
    setShowAlert(true);
  };
  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  // 저장하기 버튼 활성화/비활성화 ui
  const buttonStyleWhenNonActive = {backgroundColor: '#FED5AF'};
  const titleStyleWhenNonActive = {color: '#808080'};
  const buttonStyleWhenActive = {backgroundColor: '#FD9639'};
  const titleStyleWhenActive = {color: 'black'};

  // 저장취소
  const onPress = () => {
    props.onChangeMode('BLOODLIST');
    props.setBlood(true);
  };

  //날짜
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(new Date());

  var year = today.getFullYear();
  var month = (today.getMonth() + 1).toString().padStart(2, '0');
  var date = today.getDate().toString().padStart(2, '0');
  var day = today.getDay();
  var week = new Array('일', '월', '화', '수', '목', '금', '토');
  var todayLabel = week[day];

  const onPressDate = () => {
    setOpen(true);
  };

  const onConfirm = selectedDate => {
    setOpen(false);
    setToday(selectedDate);
    console.log(today);
  };

  const onCancel = () => {
    setOpen(false);
  };

  const [timestamp, setTimestamp] = useState([
    {id: 1, text: '공복', done: false},
    {id: 2, text: '아침 식사 전', done: false},
    {id: 3, text: '아침 식사 후', done: false},
    {id: 4, text: '점심 식사 전', done: false},
    {id: 5, text: '점심 식사 후', done: false},
    {id: 6, text: '저녁 식사 전', done: false},
    {id: 7, text: '저녁 식사 후', done: false},
    {id: 8, text: '취침 전', done: false},
  ]);

  let findIndex = timestamp.findIndex(item => item.id === id);
  var num = parseInt(bloodnum);
  if (timestamp[findIndex].text === '공복') {
    if (num <= 100) {
      bloodstate = '정상';
    } else if (num >= 126) {
      bloodstate = '위험';
    } else if (100 < num && num < 126) {
      bloodstate = '주의';
    }
  }
  if (
    timestamp[findIndex].text === '아침 식사 후' ||
    timestamp[findIndex].text === '점심 식사 후' ||
    timestamp[findIndex].text === '저녁 식사 후'
  ) {
    if (num <= 139) {
      bloodstate = '정상';
    } else if (num >= 200) {
      bloodstate = '위험';
    } else if (139 < num && num < 200) {
      bloodstate = '주의';
    }
  }
  if (
    timestamp[findIndex].text === '아침 식사 전' ||
    timestamp[findIndex].text === '점심 식사 전' ||
    timestamp[findIndex].text === '저녁 식사 전'
  ) {
    if (num <= 130) {
      bloodstate = '정상';
    } else if (num >= 180) {
      bloodstate = '위험';
    } else if (130 < num && num < 180) {
      bloodstate = '주의';
    }
  }
  if (timestamp[findIndex].text === '취침 전') {
    if (num <= 120) {
      bloodstate = '정상';
    } else if (num >= 160) {
      bloodstate = '위험';
    } else if (120 < num && num < 160) {
      bloodstate = '주의';
    }
  }
  if (bloodstate === '정상') {
    textcolor = '#2DAA3A';
  } else if (bloodstate === '주의') {
    textcolor = '#FF7A00';
  } else if (bloodstate === '위험') {
    textcolor = '#EF0000';
  } else {
    textcolor = '#807645';
  }

  const buttonStyle = isNaN(num)
    ? buttonStyleWhenNonActive
    : buttonStyleWhenActive;
  const titleStyle = isNaN(num)
    ? titleStyleWhenNonActive
    : titleStyleWhenActive;

  //서버 전송
  const postData = () => {
    if (isNaN(bloodnum)) {
      handleShowAlert('혈당 수치는 숫자만 입력할 수 있습니다.');
    } else if (isNaN(num)) {
      handleShowAlert('혈당 수치를 입력해주세요.');
    } else {
      const data = {
        date: year + '년 ' + month + '월 ' + date + '일',
        time: timestamp[findIndex].text,
        sugarLevel: bloodnum,
        state: bloodstate,
      };
      fetch(proxyUrl + '/api/v1/mysugar/save', {
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
          props.onChangeMode('BLOODLIST');
          props.setBlood(true);
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
    }
  };
  return (
    <SafeAreaView style={styles.full}>
      <Text style={styles.titleText}>혈당 기록</Text>
      <View style={styles.block1}>
        <Pressable onPress={onPressDate}>
          <Text style={styles.dateText}>
            {year}년 {month}월 {date}일 {todayLabel}요일
          </Text>
        </Pressable>
        <View style={styles.container}>
          <View style={styles.item1}>
            <TimeStampList
              timestamp={timestamp}
              setStamp={_timestamp => {
                setTimestamp(_timestamp);
              }}
              setID={_id => {
                setId(_id);
              }}
            />
          </View>
          <View style={styles.item2}>
            <View style={styles.item3}>
              <Text
                style={[
                  styles.statetext,
                  {
                    color: textcolor,
                  },
                ]}>
                {bloodstate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => setBloodnum(text)}
              />
              <Text
                style={{
                  color: '#381B00',
                  fontFamily: 'Pretendard-SemiBold',
                  marginLeft: 3,
                  marginTop: 20,
                  fontSize: 18,
                }}>
                mg/dL
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.subinfotext}>* 공복은 8시간 이상 금식입니다.</Text>
      <Text style={styles.subinfotext}>
        * ‘00 식사 후’는 식후 2시간 뒤에 잰 혈당을
      </Text>
      <Text style={styles.subinfotextsecondline}>기록해주십시오.</Text>
      <Pressable style={[styles.button, buttonStyle]} onPress={postData}>
        <Text style={[styles.title, titleStyle]}>저장하기</Text>
      </Pressable>
      <Pressable style={[styles.buttonCancel]} onPress={onPress}>
        <Text style={[styles.buttonCancelText]}>입력취소</Text>
      </Pressable>
      <CustomAlert
        visible={showAlert}
        message={alertMessage}
        onClose={handleCloseAlert}
      />
      <DatePicker
        modal
        open={open}
        mode="date"
        date={today}
        //onDateChange={setToday}
        onConfirm={onConfirm}
        confirmText="확인"
        onCancel={onCancel}
        cancelText="취소"
        title="날짜 선택"
        locale="ko"
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  full: {
    flex: 1,
    backgroundColor: '#FEF4EB',
  },
  titleText: {
    fontSize: 28,
    color: 'black',
    margin: 27,
    marginTop: 40,
    marginBottom: 10,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  statetext: {
    fontSize: 24,
    color: '#381B00',
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: -5,
    marginRight: 5,
    textAlign: 'center',
  },
  block1: {
    backgroundColor: '#FFEB8A',
    borderRadius: 15,
    marginTop: 10,
    marginBottom: 8,
    margin: 20,
    width: 320,
    height: 200,
    padding: 5,
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
  container: {
    flex: 1,
    flexDirection: 'row',
    borderTopColor: '#381B00',
    borderTopWidth: 1,
  },
  item1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'black',
    borderRightWidth: 1,
    borderLeftWidth: 1,
    marginTop: 27,
    marginBottom: 23,
    marginLeft: 25,
    marginRight: 20,
  },
  item2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  item3: {
    width: 190,
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
    borderRadius: 10,
    backgroundColor: '#FED5AF',
    marginTop: 110,
    marginLeft: 15,
    marginRight: 15,
    height: 45,
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
  buttonCancel: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#d7d7d7',
    margin: 10,
    borderRadius: 10,
    marginTop: -7,
    marginLeft: 15,
    marginRight: 15,
    height: 45,
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
  buttonCancelText: {
    fontSize: 18,
    fontFamily: 'TheJamsil3-Regular',
    color: '#808080',
  },
  title: {
    fontSize: 18,
    fontFamily: 'TheJamsil3-Regular',
    color: '#7F6B58',
  },
  subinfotext: {
    fontSize: 14,
    fontFamily: 'TheJamsil3-Regular',
    color: '#381B00',
    marginLeft: 30,
    marginTop: 15,
  },
  subinfotextsecondline: {
    fontSize: 14,
    fontFamily: 'TheJamsil3-Regular',
    color: '#381B00',
    marginLeft: 45,
    marginTop: 7,
  },
  dateText: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    margin: 8,
    marginLeft: 15,
  },
  input: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
    borderBottomWidth: 1.5,
    width: 50,
    paddingBottom: -14,
    marginRight: 5,
    textAlign: 'center',
  },
});

export default BloodrecordScreen;
