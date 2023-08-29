import React, {useState} from 'react';
import DatePicker from 'react-native-date-picker';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Pressable,
  TextInput,
} from 'react-native';
import TimeStampList from './TimeStampList';

const BloodrecordScreen = () => {
  const navigation = useNavigation();
  //혈당
  const [bloodnum, setBloodnum] = useState('0');
  const [id, setId] = useState(1);
  var bloodstate = '혈당을 입력해주세요.';
  var textcolor = '#381B00';

  //날짜
  const [open, setOpen] = useState(false);
  const [today, setToday] = useState(new Date());

  var year = today.getFullYear();
  var month = today.getMonth() + 1;
  var date = today.getDate();
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
    {id: 8, text: '자기 전', done: false},
  ]);
  let findIndex = timestamp.findIndex(item => item.id === id);
  var num = parseInt(bloodnum);
  if (timestamp[findIndex].text === '공복') {
    if (num === 0) {
      bloodstate = '혈당을 입력해주세요.';
    } else if (num <= 100) {
      bloodstate = '정상';
    } else if (num >= 126) {
      bloodstate = '위험';
    } else {
      bloodstate = '주의';
    }
  }
  if (
    timestamp[findIndex].text === '아침 식사 후' ||
    timestamp[findIndex].text === '점심 식사 후' ||
    timestamp[findIndex].text === '저녁 식사 후'
  ) {
    if (num === 0) {
      bloodstate = '혈당을 입력해주세요.';
    } else if (num <= 139) {
      bloodstate = '정상';
    } else if (num >= 200) {
      bloodstate = '위험';
    } else {
      bloodstate = '주의';
    }
  }
  if (
    timestamp[findIndex].text === '아침 식사 전' ||
    timestamp[findIndex].text === '점심 식사 전' ||
    timestamp[findIndex].text === '저녁 식사 전'
  ) {
    if (num === 0) {
      bloodstate = '혈당을 입력해주세요.';
    } else if (num <= 130) {
      bloodstate = '정상';
    } else if (num >= 180) {
      bloodstate = '위험';
    } else {
      bloodstate = '주의';
    }
  }
  if (timestamp[findIndex].text === '자기 전') {
    if (num === 0) {
      bloodstate = '혈당을 입력해주세요.';
    } else if (num <= 120) {
      bloodstate = '정상';
    } else if (num >= 160) {
      bloodstate = '위험';
    } else {
      bloodstate = '주의';
    }
  }
  if (num === 0) {
    bloodstate = '혈당을 입력해주세요';
  } else if (bloodstate === '정상') {
    textcolor = 'green';
  } else if (bloodstate === '주의') {
    textcolor = '#FF5E00';
  } else if (bloodstate === '위험') {
    textcolor = 'red';
  }
  console.log(bloodnum);
  //서버 전송
  const postData = () => {
    const formdata = new FormData();
    const file = {
      date: year + '년 ' + month + '월 ' + date + '일',
      time: timestamp[findIndex].text,
      bloodsugar: bloodnum,
      level: bloodstate,
    };
    formdata.append('file', file);
    axios({
      method: 'post',
      url: 'https://geonganghadang/api/v1/mysugar/save',
      data: formdata,
    })
      .then(result => {
        console.log('요청성공');
        console.log(result);
      })
      .catch(error => {
        console.log('요청실패');
        console.log(error);
      });

    console.log(formdata._parts[0][1]);
    navigation.navigate('BloodScreen');
  };
  return (
    <SafeAreaView style={styles.full}>
      <Text style={styles.titleText}>혈당 기록</Text>
      <View style={styles.block1}>
        <Pressable onPress={onPressDate} style={styles.dateText}>
          <Text>
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
                    fontSize: bloodstate === '혈당을 입력해주세요' ? 20 : 30,
                  },
                ]}>
                {bloodstate}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                paddingTop: 30,
              }}>
              <TextInput
                style={styles.input}
                onChangeText={text => setBloodnum(text)}
              />
              <Text
                style={{
                  color: '#381B00',
                  fontFamily: 'Pretendard-SemiBold',
                  marginTop: 22,
                  marginLeft: 10,
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
      <Pressable style={styles.button} onPress={postData}>
        <Text style={[styles.title, {color: '#381B00'}]}>저장하기</Text>
      </Pressable>
      <DatePicker
        modal
        open={open}
        mode="date"
        date={today}
        //onDateChange={setToday}
        onConfirm={onConfirm}
        onCancel={onCancel}
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
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  statetext: {
    fontSize: 30,
    color: '#381B00',
    fontFamily: 'Pretendard-SemiBold',
    margin: 8,
    marginLeft: 12,
    textAlign: 'center',
  },
  block1: {
    backgroundColor: '#FFEB8A',
    borderRadius: 15,
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
  container: {
    flex: 1,
    flexDirection: 'row',
    borderTopColor: '#381B00',
    borderTopWidth: 0.7,
  },
  item1: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRightColor: 'black',
    borderRightWidth: 0.5,
    paddingTop: 40,
    paddingBottom: 40,
  },
  item2: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  item3: {
    width: 190,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
    paddingBottom: 30,
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
  subinfotext: {
    fontSize: 13,
    fontFamily: 'TheJamsil3-Regular',
    color: '#381B00',
    marginLeft: 49,
    marginBottom: 3,
  },
  dateText: {
    fontSize: 20,
    color: 'black',
    fontFamily: 'Pretendard-SemiBold',
    margin: 8,
    marginLeft: 12,
  },
  input: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});

export default BloodrecordScreen;
