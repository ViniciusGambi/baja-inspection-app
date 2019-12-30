import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, FlatList, TextInput } from 'react-native';
import { _retrieveForm, _storeForm } from './../utils/offlineStorage';
import Card from '../components/Card';
import Modal from "react-native-modal";

const formsDb = require('./../db/forms.json');

import * as Font from 'expo-font';

class FormsScreen extends React.Component {
  static navigationOptions = {
    headerStyle: {
      elevation: 0,
      backgroundColor: '#2c2c2e'
    },
  };

  constructor() {
    super();
    this.state = {
      forms: [],
      fontLoaded: false,
      isModalVisible: false,
      name: ''
    }
  }

  async componentDidMount() {

    await Font.loadAsync({
      'roboto-bold': require('./../assets/fonts/Roboto-Bold.ttf'),
    });

    await Font.loadAsync({
      'roboto-regular': require('./../assets/fonts/Roboto-Regular.ttf'),
    });

    await Font.loadAsync({
      'roboto-medium': require('./../assets/fonts/Roboto-Medium.ttf'),
    });

    this.setState({ fontLoaded: true });


    _retrieveForm().then(json => {
      if (json != null) {
        this.setState({ forms: json });
      }
    });
  }

  newForm = () => {
    let id = this.state.forms.length;
    for (let i = 0; i < this.state.forms.length + 1; i++) {
      if (this.state.forms.find(item => item.id === i) === 'undefined') {
        id = i;
        break;
      }
    }

    let date = new Date();
    let dateString = date.getDate() + '/' + (date.getMonth()+1) + '/' + date.getFullYear() + ' ' + date.toLocaleTimeString();

    let json = {
      id: id,
      name: this.state.name,
      wasCreated: dateString,
      answers: []
    }

    let state = this.state.forms;
    state.push(json);


    this.setState({ forms: state });
    _storeForm(state);

    this.setState({ name : '' })
  }

  deleteForms = () => {
    let array = [];
    this.setState({ forms: [] });
    _storeForm(array);
  }

  toggleModal = () => {
    this.setState({ isModalVisible: !this.state.isModalVisible });
  };

  render() {

    return (

      <View style={styles.container}>

        <Modal isVisible={this.state.isModalVisible}>
          <View style={styles.modalBox}>
            <Text style={{fontFamily: 'roboto-medium'}}>Dê um nome para a inspeção</Text>
            <TextInput
              style={{ height: 40, paddingLeft: 11, marginTop: 10, marginBottom: 10, elevation: 1,  backgroundColor: '#eee', borderRadius: 15 }}
              onChangeText={(name) => this.setState({name})}
              value={this.state.name}
            />
            <View style={styles.lineButtons}>
              <View style={styles.borderButton}>
                <Button title="Cancelar" onPress={this.toggleModal} />
              </View>
              <View style={styles.borderButton}>
                <Button title="Criar" onPress={ () => {this.newForm(); this.toggleModal()} } />
              </View>

            </View>

          </View>
        </Modal>

        <View style={styles.headerBar}>
          {
            this.state.fontLoaded ? (
              <Text style={styles.headerText}>Inspeções</Text>
            ) : null
          }
        </View>
        <View style={styles.list}>
          <FlatList
            data={this.state.forms}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestionScreen', { formId: item.id })}>
                <View style={{ elevation: 8 }}>
                  {
                    this.state.fontLoaded ? (
                      <Card mainText={item.name} subText={item.wasCreated} color={item.answer} />
                    ) : null
                  }
                </View>
              </TouchableOpacity >
            )}
            keyExtractor={item => 'list-item-' + item.id}
          />
        </View>

        <TouchableOpacity onPress={() => this.toggleModal()} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => this.deleteForms()} style={styles.fab2}>
          <Text style={styles.fabIcon}>-</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#2c2c2e',
  },
  borderButton: {
    width: '48%'
  },
  lineButtons: {
    display: 'flex',
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between'
  },
  modalBox: {
    padding: 15,
    elevation: 5,
    height: 'auto',
    borderRadius: 15,
    backgroundColor: '#FEFEFE',
    overflow: 'hidden',
    marginBottom: 7
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 20,
    backgroundColor: '#03A9F4',
    borderRadius: 30,
    elevation: 8
  },
  fab2: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 85,
    bottom: 20,
    backgroundColor: 'tomato',
    borderRadius: 30,
    elevation: 8
  },
  fabIcon: {
    fontSize: 40,
    color: 'white',
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
  headerBar: {
    paddingLeft: 25,
  },
  headerText: {
    fontFamily: 'roboto-medium',
    fontSize: 32,
    color: 'white'
  },
});

export default FormsScreen;