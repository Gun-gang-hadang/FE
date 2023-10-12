import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Modal } from 'react-native';
import Dialog, {DialogContent} from 'react-native-popup-dialog';
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
        height: 200,
        width: 300,
        backgroundColor: '#FEF4EB',
    },
    icon: {
        width: 40,
        height: 40,
        marginTop: 30,
        marginLeft: 113,
    },
    alertBox: {
        borderRadius: 15,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        marginTop: 10,
        color: '#EF0000',
        fontFamily: 'Pretendard-SemiBold',
    },
    message: {
        fontSize: 13,
        marginBottom: 8,
        color: '#000000',
        fontFamily: 'Pretendard-SemiBold',
    },
    okButton: {
        backgroundColor: '#FD9639',
        borderRadius: 30,
        padding: 5,
        marginTop: 12,
        width: '45%',
    },
    okText: {
        color: 'black',
        fontSize: 14,
        textAlign: 'center',
        fontFamily: 'Pretendard-SemiBold',
    },
});

export default CustomAlert;