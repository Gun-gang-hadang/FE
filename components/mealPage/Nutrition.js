import {View, Text, StyleSheet} from 'react-native';
import colors from '../../assets/colors/colors';

const Nutrition = ({nutrition}) => {
  return (
    <View>
      {nutrition &&
        nutrition.map(data => {
          return (
            <View key={data.id} style={styles.nutrientBox}>
              <View style={styles.foodBox}>
                <Text style={styles.foodName}>{data.food}</Text>
              </View>

              <View style={styles.foodNutrientBox}>
                <Text style={styles.nutrientText}>칼로리: {data.kcal}kcal</Text>
                <Text style={styles.nutrientText}>탄수화물: {data.carbo}g</Text>
                <Text style={styles.nutrientText}>단백질: {data.prot}g</Text>
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
    marginBottom: 10,
    fontWeight: 'bold',
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
    marginBottom: 10,
  },
});

export default Nutrition;
