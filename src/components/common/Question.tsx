import React from 'react';

class Question extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            selected: -1,
            answerChecked: false,
        }
        this.handleAnswerCheck = this.handleAnswerCheck.bind(this);
        this.renderAnswer = this.renderAnswer.bind(this);
        this.resetQuestion = this.resetQuestion.bind(this);
        this.renderResetButton = this.renderResetButton.bind(this);
        this.renderCheckButton = this.renderCheckButton.bind(this);
    }

    componentDidUpdate(prevProps){
        if(prevProps.question.id !== this.props.question.id) {
            this.resetQuestion();
        }
    }

    handleAnswerCheck() {
        const { selected } = this.state;
        if(selected === -1) return;
        this.setState({answerChecked: true});

        if(this.props.handleAnswerCheck){
            this.props.handleAnswerCheck(this.props.question.correctAnswer === selected);
        }
    }

    resetQuestion() {
        this.setState({
            selected: -1,
            answerChecked: false
        });
    }

    renderResetButton() {
        if(this.props.resetEnabled) {
            return (<span className="btn btn-warning mr-3" onClick={this.resetQuestion}>Reset</span>);
        }
    }

    renderCheckButton() {
        if(this.state.answerChecked) {
            return (<span className="btn btn-secondary">Check</span>);
        }
        else {
            return (<span className="btn btn-success" onClick={this.handleAnswerCheck}>Check</span>);
        }
    }

    renderAnswer(answer, key) {
        key = +key;
        const answerChecked = this.state.answerChecked;
        const selected = this.state.selected;
        const correctAnswer = this.props.question.correctAnswer;

        let status = '';
        if(answerChecked && key === correctAnswer) status = 'correct';
        else if(answerChecked && selected !== correctAnswer && key === selected) status = 'incorrect';
        else if(!answerChecked && selected === key) status = 'active'; 

        return (
            <li 
                key={key}
                className={`list-group-item ${status}`}
                onClick={() => !answerChecked && this.setState({selected: key})}
            >{answer}</li>
        );
    }


    render() {
        const {question} = this.props;
        return (
            <div>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">{question.question}</h5>
                        <ul className="list-group" style={{cursor: "pointer"}}>
                            {Object.keys(question.answers).map((key) => this.renderAnswer(question.answers[key], key))}
                        </ul>
                        <div className="d-flex justify-content-end mt-3">
                            {this.renderResetButton()}
                            {this.renderCheckButton()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Question;
