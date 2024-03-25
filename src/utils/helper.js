import { useLocation, useNavigate, useParams } from "react-router-dom";

export function formatDate(timestamp) {
  const d = new Date(timestamp);
  const time = d.toLocaleTimeString("en-US");
  return time.substr(0, 5) + time.slice(-2) + " | " + d.toLocaleDateString();
}

export function getAuthedUser() {
  const authedUserID = localStorage.getItem("authedUser") ?? null;
  return JSON.parse(authedUserID);
}

export function setAuthedUserToLocalStorage(authedUserID) {
  localStorage.setItem("authedUser", JSON.stringify(authedUserID));
}

export function formatQuestion(question, authedUserID) {
  const { id, author, timestamp, optionOne, optionTwo } = question;
  const hasAnwered = optionOne.votes.includes(authedUserID) || optionTwo.votes.includes(authedUserID);
  let choseOption;
  if (hasAnwered) {
    choseOption = optionOne.votes.includes(authedUserID) ? "option one" : "option two";
  }
  return {
    id,
    author,
    timestamp,
    optionOne,
    optionTwo,
    hasAnwered,
    choseOption,
  };
}

export const withRouter = (Component) => {
  const ComponentWithRouterProp = (props) => {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return <Component {...props} router={{ location, navigate, params }} />;
  };

  return ComponentWithRouterProp;
};
