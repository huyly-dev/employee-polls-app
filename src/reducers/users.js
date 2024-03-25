import { RECEIVE_USERS, UPDATE_ANSWER_USERS, UPDATE_QUESTION_USERS } from "../actions/users";

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case UPDATE_ANSWER_USERS:
      return {
        ...state,
        [action.info.authedUser]: {
          ...state[action.info.authedUser],
          answers: {
            ...state[action.info.authedUser].answers,
            [action.info.qid]: action.info.answer,
          },
        },
      };

    case UPDATE_QUESTION_USERS:
      return {
        ...state,
        [action.info.authedUser]: {
          ...state[action.info.authedUser],
          questions: [...state[action.info.authedUser].questions].concat([action.info.qid]),
        },
      };
    default:
      return state;
  }
}
