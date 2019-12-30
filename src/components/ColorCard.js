import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';


export default class ColorCard extends React.Component {

    render() {
        return (
            <View style={styles.card}>
                <View style={styles.cardContainer}>

                    <Text style={styles.mainText}>
                        {this.props.mainText}
                    </Text>


                    <Text style={styles.subText}>
                        {this.props.subText}
                    </Text>

                </View>
                <View style={[styles.colorDetail, { backgroundColor: (this.props.color === 0) ? '#f44242' : '#FFD300' }]}></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainText: {
        fontFamily: "roboto-bold",
    },
    subText: {
        fontFamily: "roboto-regular"
    },
    card: {
        flexDirection: 'row',
        elevation: 1,
        height: 'auto',
        borderRadius: 15,
        backgroundColor: '#FEFEFE',
        overflow: 'hidden',
        marginBottom: 7
    },
    cardContainer: {
        flex: 1,
        paddingLeft: 20,
        paddingTop: 10,
        paddingRight: 30,
        paddingBottom: 10
    },
    colorDetail: {
        width: '5%',
    }
});