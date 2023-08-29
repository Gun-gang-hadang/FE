import {View, ScrollView, Text, Image, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';
import axios from 'axios';
import {useEffect, useState} from 'react';
import Nutrition from './Nutrition';
import {useRoute} from '@react-navigation/native';

const MealAnalysis = () => {
  const [nutrition, setNutrition] = useState([]);
  const [order, setOrder] = useState('');

  const route = useRoute();
  const receivedUri = route.params.uri;

  useEffect(() => {
    axios.get('/mealAnalysis').then(response => {
      setOrder(response.data.order);
      setNutrition(response.data.foods);

      // setNutrition(response.data);
    });
  });

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>식단 분석</Text>

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
});

export default MealAnalysis;
