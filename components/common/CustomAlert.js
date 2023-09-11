import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import {iconPath} from '../measurePage/iconPath';

const CustomAlert = ({ visible, message, onClose }) => {
    return (
        <Dialog visible={visible} onTouchOutside={onClose}>
            <DialogContent style={styles.bigBox}>
                <Image
                    source={iconPath.infoIcon}
                    style={styles.icon}
                />
                <View style={styles.alertBox}>
                    <Text style={styles.title}>저장 실패</Text>
                    <Text style={styles.message}>{message}</Text>
                    <TouchableOpacity onPress={onClose} style={styles.okButton}>
                        <Text style={styles.okText}>돌아가기</Text>
                    </TouchableOpacity>
                </View>
            </DialogContent>
        </Dialog>
    );
};

const styles = StyleSheet.create({
    bigBox: {
        height: 250,
        width: 330,
        backgroundColor: '#FEF4EB',
    },
    icon: {
        width: 70,
        height: 70,
        marginTop: 35,
        marginLeft: 110,
    },
    alertBox: {
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginTop: 10,
        color: '#EF0000',
        fontFamily: 'Pretendard-SemiBold',
    },
    message: {
        fontSize: 18,
        marginBottom: 15,
        color: '#000000',
        fontFamily: 'Pretendard-SemiBold',
    },
    okButton: {
        backgroundColor: '#FD9639',
        borderRadius: 30,
        padding: 10,
        marginTop: 10,
        width: '45%',
    },
    okText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Pretendard-SemiBold',
    },
});

export default CustomAlert;
