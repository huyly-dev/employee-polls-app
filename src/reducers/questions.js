import {
  RECEIVE_QUESTIONS,
  ADD_QUESTION,
  SAVE_QUESTION_ANSWER,
} from "../actions/questions";

export default function questions(state = {}, action) {
  switch (action.type) {
    case RECEIVE_QUESTIONS:
      return {
        ...state,
        ...action.questions,
      };

    case ADD_QUESTION:
      return {
        ...state,
        [action.question.id]: action.question,
      };

    case SAVE_QUESTION_ANSWER:
      return {
        ...state,
        [action.answer.qid]: {
          ...state[action.answer.qid],
          [action.answer.answer]: {
            ...state[action.answer.qid][action.answer.answer],
            votes: state[action.answer.qid][action.answer.answer].votes.concat([
              action.answer.authedUser,
            ]),
          },
        },
      };

    default:
      return state;
  }
}
