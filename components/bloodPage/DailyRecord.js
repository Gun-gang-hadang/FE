import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {useState} from 'react';
import colors from '../../assets/colors/colors';
import config from '../config';

const proxyUrl = config.proxyUrl;

const DailyRecord = props => {
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View>
      {props.record &&
        props.record.map(data => {
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
                  <TouchableOpacity
                    style={styles.modal}
                    onPress={() => {
                      props.setID(data.post_id);
                      props.setModal();
                    }}>
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
    margin: 7,
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
    fontSize: 14,
    fontFamily: 'Pretendard-Bold',
    padding: 8,
    paddingLeft: 20,
  },

  trashcan: {
    flex: 1,
    flexDirection: 'row-reverse',
  },

  icon: {
    width: 16,
    height: 16,
    marginRight: 15,
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
    fontSize: 20,
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
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },

  level: {
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: -6,
  },
});

export default DailyRecord;
