import React, {useState, useEffect, useRef} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function TimeStampList(props) {
  const flatListRef = useRef(null);
  //const [selected, setSelected] = useState(new Map());
  const onSelect = id => {
    props.setID(id);
    let newTimestamp = [...props.timestamp];
    let findIndex = props.timestamp.findIndex(item => item.id === id);
    for (let i = 0; i < newTimestamp.length; i++) {
      newTimestamp[i].done = false;
    }
    newTimestamp[findIndex].done = true;
    props.setStamp(newTimestamp);

    // 선택되면 자동으로 스크롤 되게
    flatListRef.current.scrollToIndex({
      index: findIndex,
      animated: true,
      viewPosition: 0.5,
    });
  };

  // onSelect 초기값 설정
  useEffect(() => {
    onSelect(1);
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      style={styles.list}
      data={props.timestamp}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onSelect(item.id)}
          style={{
            backgroundColor: item.done ? '#FD9639' : '#FFEB8A',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: item.done ? 26 : 20,
              margin: item.done ? 10 : 6,
              textAlign: 'center',
              color: item.done ? '#000000' : '#807645',
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

export default TimeStampList;
