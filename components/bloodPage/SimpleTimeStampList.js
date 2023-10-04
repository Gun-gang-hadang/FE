import React, {useState, useEffect, useRef} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function SimpleTimeStampList(props) {
  const flatListRef = useRef(null);
  const onSelect = text => {
    props.setTime(text);
    props.setModal();
  };

  return (
    <FlatList
      ref={flatListRef}
      style={styles.list}
      data={props.timestamp}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onSelect(item.text)}
          style={{
            backgroundColor: 'white',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: item.done ? 26 : 20,
              margin: item.done ? 10 : 6,
              textAlign: 'center',
              color: '#381B00',
              fontFamily: item.done ? 'Pretendard-SemiBold' : 'Pretendard-Regular'
            }}>
            {item.text}
          </Text>
        </TouchableOpacity>
      )}
      keyExtractor={item => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
});

export default SimpleTimeStampList;