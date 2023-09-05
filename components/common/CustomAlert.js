import React from 'react';
import { Alert, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Dialog, { DialogContent } from 'react-native-popup-dialog';

const CustomAlert = ({ visible, message, onClose }) => {
    return (
        <Dialog visible={visible} onTouchOutside={onClose}>
            <DialogContent style={styles.bigBox}>
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
        width: 280,
        backgroundColor: '#FEF4EB',
    },
    alertBox: {
        backgroundColor: '#FEF4EB',
        borderRadius: 10,
        paddingLeft: 20,
        paddingRight: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        marginTop: 40,
        color: '#EF0000',
        fontFamily: 'Pretendard-SemiBold',
    },
    message: {
        fontSize: 18,
        marginTop: 10,
        marginBottom: 25,
        color: '#000000',
        fontFamily: 'Pretendard-SemiBold',
    },
    okButton: {
        backgroundColor: '#FD9639',
        borderRadius: 3,
        padding: 10,
        width: '60%',
    },
    okText: {
        color: 'black',
        fontSize: 18,
        textAlign: 'center',
        fontFamily: 'Pretendard-SemiBold',
    },
});

export default CustomAlert;
