import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import { iconPath } from '../measurePage/iconPath';

const CustomConfirmDialog = ({ visible, message, onConfirm, onCancel }) => {
  return (
    <Dialog visible={visible} onTouchOutside={onCancel}>
      <DialogContent style={styles.bigBox}>
        <Image source={iconPath.warnIcon} style={styles.icon} />
        <View style={styles.alertBox}>
          <Text style={styles.title}>정말 삭제하시겠습니까?</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={onConfirm} style={[styles.button, styles.confirmButton]}>
              <Text style={styles.buttonText}>예</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={onCancel} style={[styles.button, styles.cancelButton]}>
              <Text style={styles.buttonText}>아니요</Text>
            </TouchableOpacity>
          </View>
        </View>
      </DialogContent>
    </Dialog>
  );
};

const styles = StyleSheet.create({
  bigBox: {
    height: 170,
    width: 280,
    backgroundColor: '#FEF4EB',
  },
  icon: {
    width: 50,
    height: 50,
    marginTop: 25,
    marginLeft: 96,
  },
  alertBox: {
    borderRadius: 15,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    marginTop: 5,
    marginBottom: 20,
    color: '#EF0000',
    fontFamily: 'Pretendard-SemiBold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 28,
    paddingRight: 28,
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    height: 30,
  },
  cancelButton: {
    backgroundColor: '#FD9639',
    marginLeft: 10,
  },
  confirmButton: {
    backgroundColor: '#d7d7d7',
    marginRight: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Pretendard-SemiBold',
  },
});

export default CustomConfirmDialog;
