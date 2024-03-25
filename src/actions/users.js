export const RECEIVE_USERS = "RECEIVE_USERS";
export const UPDATE_ANSWER_USERS = "UPDATE_ANSWER_USERS";
export const UPDATE_QUESTION_USERS = "UPDATE_QUESTION_USERS";

export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}

export function updateAnswerUsers(info) {
  return {
    type: UPDATE_ANSWER_USERS,
    info,
  };
}

export function updateQuestionUsers(info) {
  return {
    type: UPDATE_QUESTION_USERS,
    info,
  };
}
