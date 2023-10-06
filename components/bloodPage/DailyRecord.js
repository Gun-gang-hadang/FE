import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import colors from '../../assets/colors/colors';
import config from '../config';

const proxyUrl = config.proxyUrl;

const DailyRecord = ({record}) => {
  // 혈당 기록 삭제
  const deleteRecord = post_id => {
    const data = {
      post_id: post_id,
    };
    fetch(proxyUrl + '/api/v1/mysugar/' + post_id, {
      method: 'DELETE',
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
  };
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
              <View style={styles.top}>
                <View style={styles.dateSection}>
                  <Text style={styles.date}>{data.date}</Text>
                </View>
                <View style={styles.trashcan}>
                  <TouchableOpacity onPress={() => deleteRecord(data.post_id)}>
                    <Image
                      source={require('../../assets/images/bin.png')}
                      style={styles.icon}
                    />
                  </TouchableOpacity>
                </View>
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
    margin: 13,
    marginBottom: 8,
    marginLeft: 10,
    marginRight: 10,

    //그림자 설정
    elevation: 5,
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    borderBottomColor: '#381B00',
    borderBottomWidth: 0.7,
  },
  dateSection: {
    flex: 1,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
  },
  date: {
    width: '100%',
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Pretendard-Bold',
    padding: 8,
    paddingLeft: 20,
  },
  trashcan: {
    flex: 1,
    flexDirection: 'row-reverse',
  },
  icon: {
    width: 17,
    height: 25,
    marginRight: 25,
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
    borderLeftWidth: 0.7,
  },
  bloodsugar: {
    color: '#000000',
    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
  },
  level: {
    fontSize: 30,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: -6,
  },
});

export default DailyRecord;
