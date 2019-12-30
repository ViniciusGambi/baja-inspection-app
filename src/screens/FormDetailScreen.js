import React from 'react';
import { StyleSheet, Text, View, Button, FlatList, BackHandler } from 'react-native';
import { _retrieveForm, _storeForm } from './../utils/offlineStorage';
import ColorCard from '../components/ColorCard';
import { HeaderBackButton } from 'react-navigation-stack';

const questions = require('./../db/questions.json');

export default class FormDetailScreen extends React.Component {

    static navigationOptions = ({ navigation }) => {
        return {
            
            headerStyle: {
                elevation: 0,
                backgroundColor: '#2c2c2e'
            },
            headerLeft: (<HeaderBackButton tintColor='#FEFEFE' onPress={() => { navigation.navigate('FormsScreen') }} />)
        }
    }

    constructor() {
        super();
        this.state = {
            notOkAnswers: []
        }
    }

    componentDidMount() {
        const { navigation } = this.props;
        this.backHandler = BackHandler.addEventListener('hardwareBackPress', () => {
            navigation.navigate('FormsScreen'); // works best when the goBack is async
            return true;
        });

        _retrieveForm().then(forms => {
            let notOkAnswers = [];

            let formId = parseInt(JSON.stringify(navigation.getParam('formId', 'NO-ID')));

            if (forms != null) {
                for (let i = 0; i < forms[formId].answers.length; i++) {
                    if (forms[0].answers[i].answer !== 1) {
                        notOkAnswers.push(forms[formId].answers[i]);
                    }
                }
                this.setState({ notOkAnswers })
            }
        });
    }

    componentWillUnmount() {
        this.backHandler.remove();
    }

    render() {

        return (
            <View style={styles.container}>
                <View style={styles.headerBar}>
                    <Text style={styles.headerText}>Relatório</Text>
                </View>
                
                <View style={styles.list}>
                    <FlatList
                        data={this.state.notOkAnswers}
                        renderItem={({ item }) => (
                            <ColorCard mainText={questions[item.question].ratbsb} subText={questions[item.question].rule} color={item.answer} />
                        )}
                        keyExtractor={item => 'list-item-' + item.question}
                    />
                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2c2c2e',
    },
    headerBar: {
        paddingLeft: 25,
    },
    headerText: {
        fontFamily: 'roboto-medium',
        fontSize: 32,
        color: 'white'
    },
    list: {
        marginTop: 10,
        backgroundColor: '#F1F5F9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        paddingHorizontal: 10,
        height: '100%'
    },
    card: {
        flexDirection: 'row',
        elevation: 0.5,
        height: 75,
        borderRadius: 15,
        backgroundColor: '#FEFEFE',
        overflow: 'hidden',
        marginBottom: 7
    },
    cardContainer: {
        flex: 1,
        padding: 20
    },
    colorDetail: {
        width: '5%',
    }
});
