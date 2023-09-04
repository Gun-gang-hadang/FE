import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import {useNavigation} from '@react-navigation/native';
import { SafeAreaView, StyleSheet, Text, View, Pressable, TextInput,} from 'react-native';
import TimeStampList from './TimeStampList';
import CustomAlert from '../common/CustomAlert';

const BloodrecordScreen = () => {
  const navigation = useNavigation();
  //혈당
  const [bloodnum, setBloodnum] = useState();
  const [id, setId] = useState(1);
  var bloodstate = '상태';
  var textcolor = '#381B00';
  //혈당 입력 안했을 때
  const [showAlert, setShowAlert] = useState(false);
  const handleShowAlert = () => {setShowAlert(true);};
  const handleCloseAlert = () => {setShowAlert(false);};
  const buttonStyleWhenNonActive = {backgroundColor: '#FED5AF'};
  const titleStyleWhenNonActive = {color: '#7F6B5'};
  const buttonStyleWhenActive = {backgroundColor: '#FD9639'};
  const titleStyleWhenActive = {color: 'black'};

  //날짜
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(new Date());

  var year = today.getFullYear();
  var month = (today.getMonth() + 1).toString().padStart(2, '0');
  var date = today.getDate().toString().padStart(2, '0');
  var day = today.getDay();
  var week = new Array('일', '월', '화', '수', '목', '금', '토');
  var todayLabel = week[day];
  //var displayDate={year}년 {month}월 {date}일 {todayLabel}요일
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
    } else if (100 < num && num < 126){
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
  }
  else {
    textcolor = '#807645';
  }
  console.log(num);
  const buttonStyle = isNaN(num) ? buttonStyleWhenNonActive : buttonStyleWhenActive;
  const titleStyle = isNaN(num) ? titleStyleWhenNonActive : titleStyleWhenActive;

  //서버 전송
  const postData = () => {
    if (isNaN(num)) {
      handleShowAlert();
    }
    else {
      const data = {
        date: year + '년 ' + month + '월 ' + date + '일',
        time: timestamp[findIndex].text,
        sugarLevel: bloodnum,
        state: bloodstate,
      };
      fetch('/api/v1/mysugar/save', {
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
        .then((result) => {
          console.log('요청 성공');
          console.log(result);
          navigation.navigate('BloodScreen');
        })
        .catch(error => {
          if (error.response) {
            console.error("Backend Error:", error.response.data);
            console.error("Status Code:", error.response.status);
          } else if (error.request) {
            console.error("Network Error:", error.request);
          } else {
            console.error("Request Error:", error.message);
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
                    fontSize: 30,
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
                  fontSize: 20,
                }}>
                mg/dL
              </Text>
            </View>
          </View>
        </View>
      </View>
      <Text style={styles.subinfotext}>* 공복은 8시간 이상 금식입니다.</Text>
      <Text style={styles.subinfotext}>
        * ‘00식사 후’는 식후 2시간 뒤에 잰 혈당을 기록해주십시오.
      </Text>
      <Pressable style={[styles.button, buttonStyle]} onPress={postData}>
        <Text style={[styles.title, titleStyle]}>저장하기</Text>
      </Pressable>
      <CustomAlert
        visible={showAlert}
        message="혈당 수치를 입력해주세요."
        onClose={handleCloseAlert}
      />
      <DatePicker
        modal
        open={open}
        mode="date"
        date={today}
        //onDateChange={setToday}
        onConfirm={onConfirm}
        confirmText='확인'
        onCancel={onCancel}
        cancelText='취소'
        
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
    fontSize: 35,
    color: '#381B00',
    margin: 20,
    marginTop: 45,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  statetext: {
    fontSize: 30,
    color: '#381B00',
    fontFamily: 'Pretendard-SemiBold',
    margin: 8,
    marginRight: 30,
    textAlign: 'center',
  },
  block1: {
    backgroundColor: '#FFEB8A',
    borderRadius: 15,
    margin: 15,
    paddingTop: 10,
    height: 260,
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
    marginTop: 40,
    marginBottom: 30,
    marginLeft: 20,
    marginRight: 15,
    paddingBottom: 10,
  },
  item2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop: 140,
    marginLeft: 15,
    marginRight: 15,
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
    fontSize: 24,
    fontFamily: 'TheJamsil3-Regular',
    color: '#7F6B5',
  },
  subinfotext: {
    fontSize: 20,
    fontFamily: 'TheJamsil3-Regular',
    color: '#381B00',
    marginLeft: 30,
    marginTop: 15,
  },
  dateText: {
    fontSize: 23,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    margin: 8,
    marginLeft: 20,
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default BloodrecordScreen;
