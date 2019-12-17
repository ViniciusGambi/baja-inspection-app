import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

const questions = require('./../db/questions.json');
const forms = require('./../db/forms.json')
const formsDb = require('./../db/forms.json');

let current = 0;

export default class QuestionScreen extends React.Component {
  constructor(){
    super();
    this.state = {
        form: 0,  //formsDb.forms.find(item => item.id === i)
        question: questions[current].rule,
        answer: null
    }
  }

  componentWillMount() {
    let count = 0;
    for (i = 0; i < questions.length; i++){
      if (!formsDb.forms.answers.find(item => item.question === i)){
        break;
      }
      count++;
    }
    this.setState({ question: questions[current].rule });
  }

  nextPage = () => {
    console.log(forms);
    current += 1;
    if (current < questions.length){
      this.setState({
        question: questions[current].rule
      })
    }
    else{
      this.setState({
        question: "Fim de papo"
      })
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>{this.state.question}</Text>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20}}>
          <View style={{ flex:1, paddingLeft: 10, paddingRight: 10 }}>
            <Button
                onPress={this.nextPage}
                title="Aprovado"
                color="#4286f4"
            />
          </View>
          <View style={{ flex:1, paddingLeft: 10, paddingRight: 10 }}>
            <Button
                onPress={this.nextPage}
                title="Dúvida"
                color="#FFD300"
            />
          </View>
          <View style={{ flex:1, paddingLeft: 10, paddingRight: 10 }}>
            <Button
                onPress={this.nextPage}
                title="Recheck"
                color="#f44242"
            />
          </View>      
        </View>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10
  },
  mainText:{
    fontSize: 20, 
    textAlign: 'center'
  }
});
