import React from 'react';


class NewQuestion extends React.Component<any,any> {
    constructor(props) {
        super(props);
        this.state = {
            question: "",
            correctAnswer: -1 as Number,
            answers: {
                0: "",
                1: "",
                2: "",
                3: "",
            }
        }
        this.handleAnswerChange = this.handleAnswerChange.bind(this);
        this.handleQuestionSubmit = this.handleQuestionSubmit.bind(this);
        this.resetForm = this.resetForm.bind(this);
    }

    handleAnswerChange(event, i) {
        let answers = this.state.answers;
        answers[i] = event.target.value;

        this.setState({answers});
    }

    handleQuestionSubmit() {
        const {answers, question, correctAnswer} = this.state;
        if(Object.keys(answers).filter(k => answers[k] === "").length > 0 || question === "" || correctAnswer === -1) return;
        
        this.props.handleQuestionCreation(this.state);
        this.resetForm();
    }

    resetForm() {
        const inital = {
            question: "",
            correctAnswer: -1 as Number,
            answers: {
                0: "",
                1: "",
                2: "",
                3: "",
            }
        };
        this.setState({...inital});
    }

    render() {
        return (
        <div>
            <div className="card">
                <div className="card-body">
                    <input
                        type="text"
                        className="form-control card-title"
                        placeholder="Enter question."
                        value={this.state.question}
                        onChange={(e) => this.setState({question: e.target.value})}/>

                    <p className="card-text">Select the correct answer by clicking on it!</p>

                    <ul className="list-group" style={{cursor: "pointer"}}>
                        {[...Array(4)].map((x, i) =>
                            <li 
                                key={i}
                                className={`list-group-item ${this.state.correctAnswer === i ? "active" : ""}`}
                                onClick={() => this.setState({correctAnswer: i})}>
                                <input 
                                    type="text"
                                    className="form-control card-title"
                                    placeholder="Enter answer"
                                    value={this.state.answers[i]}
                                    onChange={(e) => this.handleAnswerChange(e, i)}/>
                            </li>
                        )}
                    </ul>
                </div>
            </div>
            <div className="d-flex justify-content-end mt-3 mb-5">
                <span onClick={this.handleQuestionSubmit} className="btn btn-success">Save</span>
            </div>
        </div>
        );
    }
}

export default NewQuestion;
