import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Font from 'expo-font';

export default class Card extends React.Component {

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
            </View>
        );
    }
}

const styles = StyleSheet.create({
    mainText: {
        fontFamily: "roboto-bold",
        marginRight: 30
    },
    subText: {
        fontFamily: "roboto-regular"
    },
    card: {
        height: 'auto',
        borderRadius: 15,
        backgroundColor: '#FEFEFE',
        overflow: 'hidden',
        marginBottom: 7
    },
    cardContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 25,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 10,
        height: 60  
    }
});