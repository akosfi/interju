
import { ADD_QUESTION, REMOVE_QUESTION, ADD_QUESTIONS } from "../actions/consants";

const initialState = [
  {
    "question": "What does the acronym MVC stand for?",
    "correctAnswer": 2,
    "answers": {
      "0": "Method, Variable, Constant",
      "1": "Method, View, Constant",
      "2": "Model, View, Controller",
      "3": "None of the above"
    },
    "id": "111"
  },
  {
    "question": "3 * 14?",
    "correctAnswer": 2,
    "answers": {
      "0": "58",
      "1": "41",
      "2": "42",
      "3": "2"
    },
    "id": "222"
  },
  {
    "question": "Which is not a color?",
    "correctAnswer": 0,
    "answers": {
      "0": "Car",
      "1": "Yellow",
      "2": "Green",
      "3": "Red"
    },
    "id": "333"
  }
];

export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_QUESTION: {
      const { question } = action.payload;
      const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
      question.id = id;
      return [
        question,
        ...state
      ];
    }
    case ADD_QUESTIONS: {
      const { questions } = action.payload;
      return [
        ...questions
      ];
    }
    case REMOVE_QUESTION: {
      const { id } = action.payload;
      const modifiedState = state.filter((q: any) => q.id !== id);
      return [...modifiedState];
    }
    default:
      return state;
  }
}
