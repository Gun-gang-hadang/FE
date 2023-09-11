import React, {Component} from 'react';
import {Text, StyleSheet, Pressable} from 'react-native';

export default class CustomButton extends Component {
  static defaultProps = {
    title: 'untitled',
    buttonColor: '#ffffff',
    titleColor: '#000000',
    onPress: () => null,
  };

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Pressable
        style={[styles.button, {backgroundColor: this.props.buttonColor}]}
        onPress={this.props.onPress}>
        <Text style={[styles.title, {color: this.props.titleColor}]}>
          {this.props.title}
        </Text>
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    width: 180,
    padding: 25,
    marginTop: 30,
    marginLeft: 15,

    //box-shadow
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  title: {
    fontSize: 30,
    fontFamily: 'TheJamsil3-Regular',
    textAlign: 'center',
  },
});
