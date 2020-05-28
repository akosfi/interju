import { ADD_QUESTION, ADD_QUESTIONS, REMOVE_QUESTION } from "./consants";

export function addQuestion(question) {
    return {
        type: ADD_QUESTION,
        payload: {
            question
        }
    }
}

export function addQuestions(questions) {
    return {
        type: ADD_QUESTIONS,
        payload: {
            questions
        }
    }
}

export function removeQuestion(id) {
    return {
        type: REMOVE_QUESTION,
        payload: {
            id
        }
    }
}