import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import {useState} from 'react';

const DailyRecord = ({record}) => {
  return (
    <View>
      {record.map(data => {
        const [bloodLevel, setBloodLevel] = useState('');
        setBloodLevel(data.level);

        return (
          <View key={data.id} style={styles.container}>
            <View style={styles.dateSection}>
              <Text style={styles.date}>{data.date}</Text>
            </View>

            <View style={styles.bloodContainer}>
              <View style={styles.bloodLeft}>
                <Text style={styles.time}>{data.time}</Text>
              </View>

              <View style={styles.bloodRight}>
                <Text style={styles.bloodsugar}>{data.bloodsugar}mg</Text>
                <Text style={styles.level}>{data.level}</Text>
              </View>
            </View>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.sub1,
    borderRadius: 15,
    margin: 10,

    //그림자 설정
    elevation: 5,
  },
  dateSection: {
    width: '100%',
    borderBottomColor: '#000000',
    borderBottomWidth: 1,
  },
  date: {
    width: '100%',
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    padding: 8,
    paddingLeft: 10,
  },

  bloodContainer: {
    flexDirection: 'row',
  },

  bloodLeft: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    color: '#000000',
    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
  },

  bloodRight: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
    borderLeftColor: '#000000',
    borderLeftWidth: 1,
  },
  bloodsugar: {
    color: '#000000',
    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
  },
  level: {
    color: '#2DAA3A',
    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
  },

  //   button: {
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //     margin: 15,
  //     borderRadius: 10,
  //     backgroundColor: '#FED5AF',
  //     marginLeft: 50,
  //     marginRight: 50,
  //     height: 50,
  //     //box-shadow
  //     shadowColor: 'black',
  //     shadowOffset: {
  //       width: 0,
  //       height: 1,
  //     },
  //     shadowOpacity: 1,
  //     shadowRadius: 2.22,

  //     elevation: 3,
  //   },
});

export default DailyRecord;
