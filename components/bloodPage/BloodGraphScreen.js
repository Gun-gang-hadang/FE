import {React, useState} from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  Modal,
  TouchableHighlight,
  Image,
} from 'react-native';
import colors from '../../assets/colors/colors';
import DatePicker from 'react-native-date-picker';
import {LineChart} from 'react-native-chart-kit';
import SimpleTimeStampList from './SimpleTimeStampList';
import FloatingWriteButton from './FloatingWriteButton';

function* yLabel() {
  yield* ['정상', '주의', '위험'];
}

const BloodGraphScreen = props => {
  const [bloodpage, setBloodpage] = useState(true);
  const [timestamp, settimeStamp] = useState([
    {id: 1, text: '공복', done: false},
    {id: 2, text: '아침 식사 전', done: false},
    {id: 3, text: '아침 식사 후', done: false},
    {id: 4, text: '점심 식사 전', done: false},
    {id: 5, text: '점심 식사 후', done: false},
    {id: 6, text: '저녁 식사 전', done: false},
    {id: 7, text: '저녁 식사 후', done: false},
    {id: 8, text: '취침 전', done: false},
  ]);
  const [selectedTime, setSelectedTime] = useState(timestamp[0].text);
  const [modalVisible, setModalVisible] = useState(false);
  const [timemodalVisible, setTimemodalVisible] = useState(false);

  //그래프 차트
  const yLabelIterator = yLabel();
  const chartConfig = {
    backgroundGradientFrom: '#FED5AF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FED5AF',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    fillShadowGradientFrom: '#A3D948',
    fillShadowGradientTo: '#A3D948',
    useShadowColorFromDataset: false, // optional
    propsForLabels: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 14,
    },
  };
  const secondChartConfig = {
    backgroundGradientFrom: '#FED5AF',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#FED5AF',
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    fillShadowGradientFrom: '#A3D948',
    fillShadowGradientTo: '#A3D948',
    propsForLabels: {
      fontFamily: 'Pretendard-SemiBold',
      fontSize: 9,
    },
  };

  //GRAPH PAGE 날짜 선택
  const [open, setOpen] = useState(false);
  const [firstDate, setfirstDate] = useState(new Date());

  var year = firstDate.getFullYear();
  var month = (firstDate.getMonth() + 1).toString().padStart(2, '0');
  var date = firstDate.getDate().toString().padStart(2, '0');
  var datetext = year + '년 ' + month + '월 ' + date + '일';
  const onPressDate = () => {
    setOpen(true);
  };

  const onConfirm = data => {
    setOpen(false);
    setfirstDate(data);
  };

  const onCancel = () => {
    setOpen(false);
  };

  //GRAPH에 사용할 DATA
  var dateList = [];
  var numList = [];
  var timeList = [];
  var stateList = [];

  if (props.record.length > 0) {
    for (var i = 0; i < props.record.length; ++i) {
      if (props.record[i].date === datetext) {
        timeList.unshift(props.record[i].time);
        if (props.record[i].state === '정상') {
          stateList.unshift(0);
        } else if (props.record[i].state === '주의') {
          stateList.unshift(1);
        } else if (props.record[i].state === '위험') {
          stateList.unshift(2);
        }
      }
      if (props.record[i].time === selectedTime) {
        var slice = props.record[i].date.substr(5, 8);
        dateList.unshift(slice);
        numList.unshift(props.record[i].sugarLevel);
      }
    }
  }

  if (dateList.length > 7) {
    dateList = dateList.slice(0, 7);
    numList = numList.slice(0, 7);
  }
  const data = {
    labels: timeList,
    datasets: [
      {
        data: stateList,
        backgroundColor: '#FED5AF',
        color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
      {
        data: [0], //highest graph value
        withDots: false, //a flage to make it hidden
      },
      {
        data: [2], //highest graph value
        withDots: false, //a flage to make it hidden
      },
    ],
  };

  const secondData = {
    labels: dateList,
    datasets: [
      {
        data: numList,
        backgroundColor: '#FED5AF',
        color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`, // optional
        strokeWidth: 2, // optional
      },
    ],
  };

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
      <Modal
        animationType="slide"
        transparent={true}
        visible={timemodalVisible}>
        <View style={styles.centeredView}>
          <View style={styles.modalView2}>
            <SimpleTimeStampList
              timestamp={timestamp}
              setTime={_time => {
                setSelectedTime(_time);
              }}
              setModal={() => {
                setTimemodalVisible(false);
              }}
            />
          </View>
        </View>
      </Modal>
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
          style={styles.listOrGraph}
          onPress={() => {
            props.onChangePage('BLOODLIST');
          }}
          underlayColor="#F67B28">
          <Text style={styles.listOrGraphTextStyle}>목록</Text>
        </TouchableHighlight>
        <TouchableHighlight
          style={styles.listOrGraphNow}
          onPress={() => {
            props.onChangePage('GRAPH');
          }}
          underlayColor="#F67B28">
          <Text style={styles.listOrGraphTextStyleNow}>그래프</Text>
        </TouchableHighlight>
      </View>
      <ScrollView style={{marginTop: -21, marginLeft: -5}}>
        <Pressable onPress={onPressDate}>
          <Text style={[styles.noticeText, {marginTop: 10}]}>
            날짜를 선택하세요
          </Text>
          <Text style={styles.dateText}>{datetext}</Text>
        </Pressable>
        <LineChart
          data={data}
          width={340}
          height={100}
          formatYLabel={() => yLabelIterator.next().value}
          segments={2}
          chartConfig={chartConfig}
          fromZero={true}
          propsForVerticalLabels={{fontSize: 20}}
          style={{marginBottom: -10}}
        />

        <Pressable
          onPress={() => {
            setTimemodalVisible(true);
          }}>
          <Text style={[styles.noticeText, {marginTop: 50}]}>
            시간을 선택하세요
          </Text>
          <View style={styles.timeView}>
            <Text style={styles.dateText}>{selectedTime}</Text>
            <Text style={styles.detailNoticeText}>(최근 7건의 기록입니다)</Text>
          </View>
        </Pressable>
        <LineChart
          data={secondData}
          width={340}
          height={200}
          chartConfig={secondChartConfig}
          propsForVerticalLabels={{fontSize: 20}}
          style={{marginBottom: 90}}
        />
      </ScrollView>
      <DatePicker
        modal
        open={open}
        mode="date"
        date={firstDate}
        //onDateChange={setToday}
        onConfirm={onConfirm}
        confirmText="확인"
        onCancel={onCancel}
        cancelText="취소"
        title="날짜 선택"
        locale="ko"
      />

      <FloatingWriteButton
        onChangeMode={_s => {
          props.onChangeMode(_s);
        }}
        setBlood={_s => {
          props.setBlood(_s);
        }}
      />
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
    marginBottom: 15,
  },

  titleText: {
    fontSize: 28,
    color: 'black',
    margin: 20,
    marginTop: 40,
    marginBottom: 20,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },

  openButton: {
    height: 30,
    paddingLeft: 15,
    paddingRight: 15,
    marginTop: 15,
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
    fontSize: 13,
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
    width: '90%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 3,
    marginBottom: 30,
  },

  modalTitle: {
    color: '#000000',
    paddingVertical: 20,
    textAlign: 'center',
    fontSize: 18,
    marginBottom: -5,
    fontFamily: 'Pretendard-SemiBold',
  },

  modalText: {
    color: '#000000',
    marginBottom: 10,
    textAlign: 'center',
    fontFamily: 'Pretendard-Regular',
    fontSize: 8,
  },

  modalTextLeft: {
    color: '#000000',
    fontSize: 11,
    marginLeft: 10,
    marginTop: 20,
    fontFamily: 'Pretendard-SemiBold',
  },

  modalTextLeftSecondLine: {
    color: '#000000',
    fontSize: 11,
    marginLeft: 23,
    fontFamily: 'Pretendard-SemiBold',
  },

  modalImage: {
    width: '100%',
    height: '20%',
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 10,
  },

  closeButton: {
    backgroundColor: '#ffffff',
    position: 'absolute',
    top: 10,
    right: 15,
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

  modalView2: {
    width: '90%',
    height: 300,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 3,
    marginBottom: 30,
  },

  dateText: {
    fontSize: 18,
    color: '#381B00',
    fontFamily: 'Pretendard-SemiBold',
    margin: 0,
    marginLeft: 27,
    marginBottom: 18,
    textDecorationLine: 'underline',
  },

  noticeText: {
    fontSize: 11,
    color: '#EF0000',
    fontFamily: 'Pretendard-SemiBold',
    marginLeft: 27,
  },
  timeView: {
    flex: 1,
    flexDirection: 'row',
  },
  detailNoticeText: {
    marginLeft: 10,
    fontSize: 10,
    fontFamily: 'Pretendard-SemiBold',
    marginTop: 7,
    color: 'black',
  },
  choiceWay: {
    justifyContent: 'flex-end',
    marginTop: -17,
    marginRight: 12,
    zIndex: 1,
    alignItems: 'center',
    flexDirection: 'row',
  },

  listOrGraphNow: {
    height: 24,
    width: 55,
    backgroundColor: '#FD9639',
    borderColor: '#FD9639',
    marginLeft: 8,
    borderWidth: 2,
    borderRadius: 5,
  },

  listOrGraph: {
    height: 24,
    width: 55,
    backgroundColor: colors.bg,
    borderColor: '#FD9639',
    borderWidth: 2,
    borderRadius: 5,
  },

  listOrGraphTextStyleNow: {
    color: 'white',
    fontSize: 13,
    fontFamily: 'Pretendard-SemiBold',
    justifyContent: 'center',
    textAlign: 'center',
  },

  listOrGraphTextStyle: {
    color: '#FD9639',
    fontSize: 13,
    fontFamily: 'Pretendard-SemiBold',
    justifyContent: 'center',
    textAlign: 'center',
  },
});
export default BloodGraphScreen;
