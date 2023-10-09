import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const Nutrition = ({nutrition}) => {
  return (
    <View>
      {nutrition &&
        nutrition.map(data => {
          return (
            <View key={data.food_id} style={styles.nutrientBox}>
              <View style={styles.foodBox}>
                <Text style={styles.foodName}>{data.name}</Text>
                <Text style={styles.foodAmount}>
                  {data.amount} / {data.gram}g
                </Text>
              </View>

              <View style={styles.foodNutrientBox}>
                <Text style={styles.nutrientText}>칼로리: {data.kcal}kcal</Text>
                <Text style={styles.nutrientText}>탄수화물: {data.carbs}g</Text>
                <Text style={styles.nutrientText}>단백질: {data.protein}g</Text>
                <Text style={styles.nutrientText}>지방: {data.fat}g</Text>
              </View>
            </View>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  nutrientBox: {
    borderRadius: 25,
    // backgroundColor: colors.sub1,
    backgroundColor: '#AEE29C',
    flexDirection: 'row',
    padding: 15,
    paddingBottom: 10,
    margin: 5,
  },

  foodBox: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  foodName: {
    color: '#000000',
    fontSize: 18,
    fontFamily: 'Pretendard-SemiBold',
  },

  foodAmount: {
    color: '#000000',
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
  },

  foodNutrientBox: {
    flex: 1,
    justifyContent: 'center',
  },

  nutrientText: {
    flex: 1,
    color: '#000000',
    fontSize: 15,
    fontFamily: 'Pretendard-SemiBold',
    marginBottom: 3,
  },
});

export default Nutrition;
