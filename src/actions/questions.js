import { _saveQuestion, _saveQuestionAnswer } from "../utils/_DATA";
import { hideLoading, showLoading } from "./shared";
import { updateAnswerUsers, updateQuestionUsers } from "./users";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const ADD_QUESTION = "ADD_QUESTION";
export const SAVE_QUESTION_ANSWER = "SAVE_QUESTION_ANSWER";

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}

function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

function saveQuestionAnswer(answer) {
  return {
    type: SAVE_QUESTION_ANSWER,
    answer,
  };
}

export function handleAddQuestion(question) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return _saveQuestion({ ...question, author: authedUser })
      .then((question) => dispatch(addQuestion(question)))
      .then(({ question }) => dispatch(updateQuestionUsers({ qid: question.id, authedUser })))
      .then(() => dispatch(hideLoading()));
  };
}

export function handleSaveQuestionAnswer(answer) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    return _saveQuestionAnswer({ ...answer, authedUser })
      .then(() => dispatch(saveQuestionAnswer({ ...answer, authedUser })))
      .then(() => dispatch(updateAnswerUsers({ authedUser, ...answer })));
  };
}
