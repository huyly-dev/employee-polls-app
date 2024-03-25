import { Divider, Typography } from "@mui/material";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helper";
import Question from "./Question";

const QuestionsList = ({ newQuestions, anweredQuestions, isLoading }) => {
  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <div className="questions-list-container">
        <Typography component="div" variant="h4" sx={{ width: "100%", textAlign: "center" }}>
          New Questions
        </Typography>
        <Divider sx={{ width: "100%" }} />
        {newQuestions.length > 0 ? (
          newQuestions.map((item) => <Question question={item} key={item.id}></Question>)
        ) : (
          <Typography component="div" variant="h5" sx={{ width: "100%", textAlign: "center" }}>
            No New Questions to show.
          </Typography>
        )}
      </div>
      <div className="questions-list-container">
        <Typography component="div" variant="h4" sx={{ width: "100%", textAlign: "center" }}>
          Done
        </Typography>
        <Divider sx={{ width: "100%" }} />
        {anweredQuestions && anweredQuestions.map((item) => <Question question={item} key={item.id}></Question>)}
      </div>
    </>
  );
};

const mapStateToProps = ({ questions, authedUser, isLoading }) => {
  let newQuestions = [];
  let anweredQuestions = [];

  const sorted = Object.keys(questions).sort((a, b) => questions[b].timestamp - questions[a].timestamp);

  sorted.map((id) => {
    const formatedQuestion = formatQuestion(questions[id], authedUser);
    formatedQuestion.hasAnwered ? anweredQuestions.push(formatedQuestion) : newQuestions.push(formatedQuestion);
  });
  return { newQuestions, anweredQuestions, isLoading };
};

export default connect(mapStateToProps)(QuestionsList);
