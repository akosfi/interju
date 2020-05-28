import React from 'react';
import {connect} from 'react-redux';
import Question from '../common/Question';


class Game extends React.Component<any, any> {
  constructor(props){
    super(props);

    this.state = {
      username: '',
      started: false,
      questionIds: [],
      currentQuestionId: -1,
      currentAnswerChecked: false,
      points: 0,
    };

    this.renderQuestion = this.renderQuestion.bind(this);
    this.renderLogin = this.renderLogin.bind(this);
    this.renderError = this.renderError.bind(this);
    this.renderNextButton = this.renderNextButton.bind(this);
    this.handleGameStart = this.handleGameStart.bind(this);
    this.handleAnswerCheck = this.handleAnswerCheck.bind(this);
    this.handleNextButton = this.handleNextButton.bind(this);
    this.initGame = this.initGame.bind(this);

  }

  componentWillMount() {
    this.initGame();
  }

  initGame() {
    const questionIds = Object.keys(this.props.questions).map(key => this.props.questions[key].id);
    const currentQuestionId = questionIds.pop();
    this.setState({
      questionIds: questionIds,
      currentQuestionId,
      points: 0,
    });
  }

  handleGameStart() {
    if(!this.state.username) return;
    this.setState({started: true});
  }

  handleNextButton() {
    const questionIds = [...this.state.questionIds];
    const currentQuestionId = questionIds.pop();
    this.setState({
      questionIds,
      currentQuestionId
    });
  }

  handleAnswerCheck(success) {
    this.setState({currentAnswerChecked: true})
    if(success) {
      let points = this.state.points + 1;
      this.setState({points})
    }
  }

  renderLogin() {
    if(this.state.started === false && this.props.questions.length > 0) {
      return (
        <div className="d-flex justify-content-center my-5">
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            
            <input 
              type="text"
              className="form-control"
              id="name"
              placeholder="Enter your name"
              value={this.state.username}
              onChange={(e) => this.setState({username: e.target.value})}/>

            <button type="button" className="btn btn-success my-2" onClick={this.handleGameStart}>Start</button>
          </div>
        </div>
      );
    }
  }

  renderError() {
    if(this.props.questions.length <= 0) {
      return (
        <div className="alert alert-warning" role="alert">
          You have to add at least one question to begin!
        </div>
      );
    }
  }

  renderNextButton() {
    const {currentAnswerChecked, questionIds} = this.state;
    if(currentAnswerChecked && questionIds.length > 0) {
      return (
        <span className="btn btn-primary" onClick={this.handleNextButton}>Next</span>
      );
    }
  }

  renderQuestion() {
    const {questions} = this.props;
    const currentQuestion = questions.find(q => q.id === this.state.currentQuestionId)
    if(this.state.started === true) {
      return (
        
        <div>
          {this.state.question}
          <Question
            question={currentQuestion}
            handleAnswerCheck={this.handleAnswerCheck}
          />

          <div className="d-flex justify-content-between align-items-center my-3">
            <h5>Point(s): {this.state.points}</h5>
            {this.renderNextButton()}
          </div>

        </div>
      );
    }
  }

  render() {
    return (
        <div>
          {this.renderError()}
          {this.renderLogin()}
          {this.renderQuestion()}
        </div>
    );
  }
}

const mapStateToProps = state => ({ 
  questions: state.questions
});

export default connect(mapStateToProps)(Game);
