import React from 'react';
import {connect} from 'react-redux';
import Question from '../common/Question';
import NewQuestion from '../common/NewQuestion';
import { addQuestion, removeQuestion } from '../../store/actions/questions';


class Questions extends React.Component<any,any> {
  constructor(props){
    super(props);

    this.handleQuestionCreation = this.handleQuestionCreation.bind(this);
    this.handleQuestionRemoval = this.handleQuestionRemoval.bind(this);
    this.saveQuestions = this.saveQuestions.bind(this);
  }

  componentDidUpdate(){
    this.saveQuestions();
  }

  handleQuestionCreation(question) {
    this.props.dispatch(addQuestion(question));
  }

  handleQuestionRemoval(id) {
    this.props.dispatch(removeQuestion(id));
  }

  saveQuestions(){
    localStorage.setItem("questions", JSON.stringify(this.props.questions));
  }

  render() {
    return (
      <div>
          {this.props.questions.map(question => {
            return (
              <div key={question.id}>

                <Question 
                  question={question}
                  resetEnabled={true}
                />
                
                <div className="d-flex justify-content-end mt-3 mb-5">
                  <span 
                    onClick={() => this.handleQuestionRemoval(question.id)} 
                    className="btn btn-danger">
                    Remove</span>

                </div>
              </div>
            );
          })}

          <h2>Add new question:</h2>
          <NewQuestion
            handleQuestionCreation={this.handleQuestionCreation}
          />
      </div>
    );
  }
}

const mapStateToProps = state => ({ 
  questions: state.questions
});

export default connect(mapStateToProps)(Questions);
