import {View, ScrollView, Text, Image, StyleSheet, Pressable,} from 'react-native';
import colors from '../../assets/colors/colors';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Nutrition from './Nutrition';
import Icon from 'react-native-vector-icons/Ionicons';
//import colors from '../../assets/colors/colors';
//import {useRoute} from '@react-navigation/native';
import config from '../config';

const proxyUrl = config.proxyUrl;

const MealAnalysis = props => {
  var order='';
  const [nutrition, setNutrition] = useState([]);
  const onPress = () => { props.onChangeMode('BUTTONPAGE');};
  const receivedUri = props.urisource;
  
  const imageWidth = props.imageWidth;
  const imageHeight = props.imageHeight;

  //서버에서 음식 정보 받아오기
  useEffect(() => {
    fetch(proxyUrl + '/api/v1/analyze/nutrient')
      .then(response => {
        if (!response.ok) {
          throw new Error('get nutrient Network response was not ok');
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

  //식단순서 계산
  if(Object.keys(nutrition).length>0)
  {
      let kcalOrder=nutrition.sort((a, b) => a.kcal - b.kcal).map((item) => item);
      //console.log(kcalOrder);
      let carbsOrder=nutrition.sort((a, b) => a.carbs - b.carbs).map((item) => item);
      //console.log(carbsOrder);
      let proteinOrder = nutrition.sort((a, b) => b.protein - a.protein).map((item) => item);
      let fatOrder = nutrition.sort((a, b) => a.fat - b.fat).map((item) => item);
    
      let nutritionSum = nutrition.map(data => {
        var sum = (kcalOrder.findIndex(i => i.food_id === data.food_id)+1)*2
        +carbsOrder.findIndex(i => i.food_id === data.food_id)+1
        +proteinOrder.findIndex(i => i.food_id === data.food_id)+1
        +fatOrder.findIndex(i => i.food_id === data.food_id)+1;
        //var food=data.name 
        return {name: data.name, cal: sum};
      })
      nutritionSum.sort((a, b) => a.cal - b.cal); 
      const sortedSum = nutritionSum;
      order+=sortedSum.map((item)=>item.name);
      order = order.replace(/,/g,' → ');
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{flexDirection: 'row'}}>
          <Text style={styles.titleText}>식단 분석</Text>
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
            style={{
              width: imageWidth > imageHeight ? '90%' : undefined,
              height: imageHeight > imageWidth ? '95%' : undefined,
              aspectRatio: imageWidth / imageHeight,
            }}
            resizeMode="contain"
          />
        </View>

        <View style={styles.order}>
          <Text style={styles.subTitle}>순서대로 드시면 좋아요</Text>
          <Text style={styles.orderText}>{order}</Text>
        </View>
        <View style={styles.nutrient}>
          <Text style={styles.subTitle}>영양소를 확인해보세요</Text>
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

  titleText: {
    fontSize: 28,
    color: 'black',
    margin: 20,
    marginLeft: 26,
    marginTop: 33,
    marginBottom: 20,
    fontFamily: 'TheJamsil4-Medium',
    alignItems: 'flex-start',
  },

  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5,
    marginTop: 15,
  },

  order: {
    backgroundColor: colors.sub1,
    borderRadius: 15,
    margin: 15,
    marginBottom: 0,

    alignItems: 'center',
    padding: 15,

    //그림자 설정
    elevation: 5,
  },

  subTitle: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TheJamsil4-Medium',
    marginBottom: 15,
    marginTop: 5,
    textAlign: 'center',
  },

  orderText: {
    color: '#000000',
    fontSize: 16,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 10,
    textAlign: 'center',
  },

  nutrient: {
    backgroundColor: colors.sub1,
    // backgroundColor: '#f6e1b6',
    borderRadius: 15,
    margin: 15,
    paddingTop: 15,
    padding: 10,

    //그림자 설정
    elevation: 5,
  },
  button: {
    width: 50,
    height: 40,
    borderRadius: 50,
    marginLeft: 120,
    marginTop: 25,
    backgroundColor: '#FEF4EB',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
  },

  // ui 테스트
  // nutrientBox: {
  //   borderRadius: 15,
  //   backgroundColor: colors.sub2,
  //   flexDirection: 'row',
  //   padding: 10,
  //   margin: 10,
  // },

  // foodBox: {
  //   flex: 1,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   marginRight: 10,
  // },

  // foodName: {
  //   color: '#000000',
  //   fontSize: 16,
  //   fontFamily: 'Pretendard-SemiBold',
  //   marginBottom: 5,
  //   fontWeight: 'bold',
  // },

  // foodAmount: {
  //   color: '#000000',
  //   fontSize: 14,
  //   fontFamily: 'Pretendard-SemiBold',
  // },

  // foodNutrientBox: {
  //   flex: 1,
  //   justifyContent: 'center',
  // },

  // nutrientText: {
  //   flex: 1,
  //   color: '#000000',
  //   fontSize: 16,
  //   fontFamily: 'Pretendard-SemiBold',
  //   marginBottom: 5,
  //   marginTop: 5,
  // },
});

export default MealAnalysis;
