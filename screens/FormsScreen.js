import React from 'react';
import { View, Text, Button, StyleSheet, TouchableOpacity, FlatList } from 'react-native';
import Fab from 'native-base';

const formsDb = require('./../db/forms.json');
//onPress={() => this.props.navigation.navigate('Question')}
class FormsScreen extends React.Component {
  static navigationOptions = {
    title: 'Checagens',
  };  
  render() {

    return (
      <View style={styles.container}>
        <FlatList
          data={formsDb.forms}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => this.props.navigation.navigate('QuestionScreen')}>
              <View  style={styles.list}>
                <Text>Data : {item.wasCreated}</Text>
              </View>
            </TouchableOpacity >
          )}
          keyExtractor={item => item.id}
        />
        
        <TouchableOpacity onPress={() => console.log(formsDb.forms)} style={styles.fab}>
          <Text style={styles.fabIcon}>+</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
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
  fabIcon: {
    fontSize: 40,
    color: 'white',
  },
  list: {
    margin: 5,
    backgroundColor: 'white',
    height: 80,
    justifyContent: 'space-around',
    paddingLeft: 10,
    elevation: 1
  }
});

export default FormsScreen;