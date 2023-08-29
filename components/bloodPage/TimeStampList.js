import React, {useState} from 'react';
import {FlatList, View, Text, StyleSheet, TouchableOpacity} from 'react-native';

function TimeStampList(props) {
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
  };
  return (
    <FlatList
      style={styles.list}
      data={props.timestamp}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() => onSelect(item.id)}
          style={{
            backgroundColor: item.done ? '#FFC38C' : '#FFEB8A',
            borderRadius: 10,
          }}>
          <Text
            style={{
              fontSize: 25,
              margin: 5,
              textAlign: 'center',
              color: '#381B00',
              fontWeight: 'bold',
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
