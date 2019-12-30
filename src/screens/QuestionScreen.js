import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { _retrieveForm, _storeForm } from './../utils/offlineStorage';
import { HeaderBackButton } from 'react-navigation-stack';

const questions = require('./../db/questions.json');

export default class QuestionScreen extends React.Component {
  
  static navigationOptions = ({ navigation }) => {
    return {
        
        headerStyle: {
            elevation: 0,
            backgroundColor: '#2c2c2e',
        },
        headerLeft: (<HeaderBackButton tintColor='#FEFEFE' />)
        
    }
}
  
  constructor(){
    super();
    this.state = {
        forms: [],
        formId: null,
        questionId: null,
        question: '',
    }
  }

  refresh = () => {
    _retrieveForm().then(forms => {
      const { navigation } = this.props;
      if (forms != null) {
        let formId = parseInt(JSON.stringify(navigation.getParam('formId', 'NO-ID')));
        let form = forms.find(item => item.id === formId);
        let questionId = 0;
        
        for (let i = 0; i < questions.length; i++){
          if (form.answers){
            if (!form.answers.find(item => item.question === i)){
              break;
            }
            questionId++;
          } else {
            break;
          }
        }
        this.setState({ questionId: questionId});
        if (questions[questionId]){
          this.setState({ question: questions[questionId].rule });
        } else {
          this.props.navigation.navigate('FormDetailScreen', { formId: formId });
        }
        this.setState({ forms });
        this.setState({formId});
      }
    });
  }

  nextPage = (answer) => {
    let forms = this.state.forms;
    
    if (forms.find(item => item.id === this.state.formId).answers){
      forms.find(item => item.id === this.state.formId).answers.push(
      {
        question: this.state.questionId,
        answer: answer
      }
      );
    }
    _storeForm(forms);
    this.refresh();

  }

  componentDidMount() {
    this.refresh();
  }

  render() {
    
    return (
      <View style={styles.container}>
        <Text style={styles.mainText}>{this.state.question}</Text>
        
        <View style={{flexDirection: 'row', justifyContent: 'space-between', paddingTop: 20}}>
          <View style={{ flex:1, paddingLeft: 10, paddingRight: 10 }}>
            <Button
                onPress={() => this.nextPage(1)}
                title="Aprovado"
                color="#4286f4"
            />
          </View>
          <View style={{ flex:1, paddingLeft: 10, paddingRight: 10 }}>
             <Button
                onPress={() => this.nextPage(2)}
                title="Dúvida"
                color="#FFD300"
            />
          </View>
          <View style={{ flex:1, paddingLeft: 10, paddingRight: 10 }}>
             <Button
                onPress={() => this.nextPage(0)}
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
    textAlign: 'center',
    fontFamily: 'roboto-regular'
  }
});
