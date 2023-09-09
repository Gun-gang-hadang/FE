import {
  View,
  ScrollView,
  Text,
  Image,
  StyleSheet,
  Pressable,
} from 'react-native';
import colors from '../../assets/colors/colors';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Nutrition from './Nutrition';
import Icon from 'react-native-vector-icons/Ionicons';
//import colors from '../../assets/colors/colors';
//import {useRoute} from '@react-navigation/native';

const MealAnalysis = props => {
  const [nutrition, setNutrition] = useState([]);
  const [order, setOrder] = useState('');
  const onPress = () => {
    props.onChangeMode('BUTTONPAGE');
  };
  //const route = useRoute();
  const receivedUri = props.urisource;

  // useEffect(() => {
  //   axios.get('/mealAnalysis').then(response => {
  //     setOrder(response.data.order);
  //     setNutrition(response.data.foods);

  //     setNutrition(response.data);
  //   });
  // });

  //서버에서 음식 정보 받아오기
  useEffect(() => {
    fetch('http://10.0.2.2:8080/api/v1/analyze')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Assuming the response is in JSON format
      })
      .then(
        data => {
          // Handle the data
          setNutrition(data);
        },
        [nutrition],
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

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.title}>식단 분석</Text>
          <Pressable
            style={({pressed}) => [styles.button]}
            android_ripple={{color: 'white'}}
            onPress={onPress}>
            <Icon name="arrow-back-outline" size={40} style={styles.icon} />
          </Pressable>
        </View>
        <View style={styles.imageContainer}>
          <Image
            source={{uri: receivedUri}}
            style={styles.foodImage}
            resizeMode="contain"
          />
        </View>

        <View style={styles.order}>
          <Text style={styles.subTitle}>순서대로 드시면 좋아요</Text>
          <Text style={styles.orderText}>{order}</Text>
        </View>
        <View style={styles.nutrient}>
          <Text style={styles.subTitle}>영양소 확인</Text>
          <Nutrition nutrition={nutrition} />

          {/* ui 테스트
          <View style={styles.nutrientBox}>
            <View style={styles.foodBox}>
              <Text style={styles.foodName}>김치</Text>
              <Text style={styles.foodAmount}>1인분 / 100g</Text>
            </View>

            <View style={styles.foodNutrientBox}>
              <Text style={styles.nutrientText}>칼로리: 95kcal</Text>
              <Text style={styles.nutrientText}>탄수화물: 0.67g</Text>
              <Text style={styles.nutrientText}>단백질: 3.38g</Text>
              <Text style={styles.nutrientText}>지방: 0.6g</Text>
            </View>
          </View>*/}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },

  title: {
    fontSize: 35,
    color: 'black',
    margin: 20,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  foodImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
    margin: 10,
  },

  order: {
    backgroundColor: colors.sub1,
    borderRadius: 15,
    margin: 10,

    alignItems: 'center',
    padding: 15,

    //그림자 설정
    elevation: 5,
  },

  subTitle: {
    color: '#000000',
    fontSize: 27,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },

  orderText: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },

  nutrient: {
    backgroundColor: colors.sub1,
    borderRadius: 15,
    margin: 10,
    padding: 15,

    //그림자 설정
    elevation: 5,
  },
  button: {
    width: 55,
    height: 55,
    borderRadius: 50,
    marginLeft: 170,
    marginTop: 12,
    backgroundColor: '#FEF4EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
  },

  //Nutrition

  nutrientBox: {
    borderRadius: 15,
    backgroundColor: colors.sub2,
    flexDirection: 'row',
    padding: 15,
    margin: 10,
  },

  foodBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  foodName: {
    color: '#000000',
    fontSize: 24,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 5,
    fontWeight: 'bold',
  },

  foodAmount: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },

  foodNutrientBox: {
    flex: 1,
    justifyContent: 'center',
  },

  nutrientText: {
    flex: 1,
    color: '#000000',
    fontSize: 20,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 5,
  },
});

export default MealAnalysis;
