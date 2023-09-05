import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const DailyRecord = ({record}) => {
  return (
    <View>
      {record &&
        record.map(data => {
          let bloodLevel = data.state;
          let textColor;
          if (bloodLevel == '정상') {
            textColor = '#2DAA3A';
          } else if (bloodLevel == '주의') {
            textColor = '#FF7A00';
          } else if (bloodLevel == '위험') {
            textColor = '#EF0000';
          }

          return (
            <View key={data.post_id} style={styles.container}>
              <View style={styles.dateSection}>
                <Text style={styles.date}>{data.date}</Text>
              </View>

              <View style={styles.bloodContainer}>
                <View style={styles.bloodLeft}>
                  <Text style={styles.time}>{data.time}</Text>
                </View>

                <View style={styles.bloodRight}>
                  <Text style={[styles.level, {color: textColor}]}>
                    {data.state}
                  </Text>
                  <Text style={styles.bloodsugar}>{data.sugarLevel}mg</Text>
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
    margin: 7,
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,

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
    paddingLeft: 20,
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
    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: -10,
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
