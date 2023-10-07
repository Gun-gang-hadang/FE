import {React,useState} from 'react';
import {View, ScrollView,StyleSheet,Pressable,Text , Modal, TouchableHighlight, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import DatePicker from 'react-native-date-picker';
import { LineChart } from 'react-native-chart-kit';
import SimpleTimeStampList from './SimpleTimeStampList';

function* yLabel() {
    yield* ['정상','주의','위험'];
  }
const BloodGraphScreen = (props) => {
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
    const [selectedTime,setSelectedTime] = useState(timestamp[0].text);
    const [modalVisible,setModalVisible]=useState(false);

    //그래프 차트
  const yLabelIterator = yLabel();
  const chartConfig = {
    backgroundGradientFrom: "#FED5AF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FED5AF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    fillShadowGradientFrom: '#A3D948',
    fillShadowGradientTo: '#A3D948',
    useShadowColorFromDataset: false , // optional
    propsForLabels:{
        fontFamily:'Pretendard-SemiBold',
        fontSize: 14,
        },
  };
  const secondChartConfig = {
    backgroundGradientFrom: "#FED5AF",
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: "#FED5AF",
    backgroundGradientToOpacity: 0,
    color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false , // optional
    fillShadowGradientFrom: '#A3D948',
    fillShadowGradientTo: '#A3D948',
    propsForLabels:{
        fontFamily:'Pretendard-SemiBold',
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
if(props.record.length>0){
for(var i = 0 ; i<props.record.length ; ++i){
  if(props.record[i].date === datetext){
    timeList.unshift(props.record[i].time);
    if(props.record[i].state==='정상'){
      stateList.unshift(0); 
    }else if(props.record[i].state==='주의'){
      stateList.unshift(1); 
    }else if(props.record[i].state==='위험'){
      stateList.unshift(2); 
    }
  }
  if(props.record[i].time === selectedTime){
    var slice=props.record[i].date.substr(5,8);
    dateList.unshift(slice);
    numList.unshift(props.record[i].sugarLevel);
  }
}
}
if(dateList.length>7){
    dateList = dateList.slice(0,7);
    numList = numList.slice(0,7);
}
const data = {
    labels: timeList,
    datasets: [
      {
        data: stateList,
        backgroundColor: '#FED5AF',
        color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
  };
const secondData = {
    labels: dateList,
    datasets: [
      {
        data: numList,
        backgroundColor: '#FED5AF',
        color: (opacity = 1) => `rgba(56, 27, 0, ${opacity})`, // optional
        strokeWidth: 2 // optional
      }
    ],
  };

  return(
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
            <SimpleTimeStampList
              timestamp={timestamp}
              setTime={_time => {
                setSelectedTime(_time);
              }}
              setModal = {() => {
                setModalVisible(false);
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
        <ScrollView>
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
          <Pressable onPress={onPressDate}>
            <Text style={[styles.noticeText,{marginTop:10,}]}>날짜를 선택하세요</Text>
            <Text style={styles.dateText}>{datetext}</Text>
          </Pressable>
        <LineChart
          data={data}
          width={420}
          height={190}
          formatYLabel={() => yLabelIterator.next().value}
          segments={2}
          chartConfig={chartConfig}
          fromZero = {true}
          propsForVerticalLabels = {{fontSize:20,}}
          //style={{borderRadius:3,}}
        />
        <Pressable onPress={() => {setModalVisible(true);}}>
          <Text style={[styles.noticeText,{marginTop:50,}]}>시간을 선택하세요</Text>
          <View style={styles.timeView}>
            <Text style={styles.dateText}>{selectedTime}</Text>
            <Text style={styles.detailNoticeText}>(최근 7일 간의 기록입니다)</Text>
          </View>
        </Pressable>
        <LineChart
          data={secondData}
          width={420}
          height={220}
          chartConfig={secondChartConfig}
          propsForVerticalLabels = {{fontSize:20,}}
          //style={{borderRadius:3,}}
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
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    marginLeft: -3,
    marginRight: 5,
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 18,
  },
  button: {
      width: 55,
      height: 55,
      borderRadius: 50,
      marginLeft: 180,
      marginTop: 29,
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
    marginLeft: 28,
    marginTop: 40,
    marginBottom: 25,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },
  dateText: {
    fontSize: 22,
    color: '#381B00',
    fontFamily: 'Pretendard-SemiBold',
    margin: 0,
    marginLeft: 27,
    marginBottom: 18,
    textDecorationLine: 'underline',

  },
  noticeText: {
    fontSize: 15,
    color: '#EF0000',
    fontFamily: 'Pretendard-SemiBold',
    margin: 0,
    marginLeft: 27,

  },
  timeView: {
    flex: 1,
    flexDirection: 'row',
  },
  detailNoticeText: {
    marginLeft: 10,
    marginTop: 5,
    color: 'black',
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
    //height: 340,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 10,
    paddingBottom: 30,
    marginBottom: 40,
  },

  choiceWay: {
    flex: 1,
    marginLeft: 10,
    marginBottom: 10,
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
export default BloodGraphScreen;