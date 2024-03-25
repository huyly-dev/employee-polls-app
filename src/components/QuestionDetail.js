import { Typography, Box, Avatar, Button } from "@mui/material";
import { useEffect } from "react";
import { connect } from "react-redux";
import { handleSaveQuestionAnswer } from "../actions/questions";
import { formatQuestion, withRouter } from "../utils/helper";

const QuestionDetail = ({ question, author, router, dispatch, isLoading, users }) => {
  useEffect(() => {
    if (!question && !isLoading) {
      router.navigate("/page-not-found");
    }
  }, [question, isLoading]);

  if (!question) {
    return <div> Loading </div>;
  }

  const onSaveQuestionAnswer = (answer) => {
    dispatch(handleSaveQuestionAnswer({ qid: question.id, answer: answer }));
    router.navigate("/");
  };

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography component="div" variant="h4">
        Poll by {author.name}
      </Typography>
      <Avatar
        sx={{ width: "200px", height: "200px", margin: "24px auto" }}
        alt="User image"
        src={author.avatarURL}
      ></Avatar>
      {question.hasAnwered ? (
        <>
          <Typography component="div" variant="h5">
            You rather chose {question.choseOption}
          </Typography>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              marginTop: 3,
            }}
          >
            <Box sx={{ width: "100%", border: "solid 1px #574c4c", borderRadius: 1 }}>
              <Typography component="p" variant="h5" sx={{ padding: 2 }}>
                {question.optionOne.text}
              </Typography>
              <Typography component="p" variant="body1">
                People who voted: {question.optionOne.votes.length}
              </Typography>
              <Typography component="p" variant="body1">
                Percentage: {(question.optionOne.votes.length / Object.keys(users).length) * 100}%
              </Typography>
            </Box>
            <Box sx={{ width: "100%", border: "solid 1px #574c4c", borderRadius: 1 }}>
              <Typography component="p" variant="h5" sx={{ padding: 2 }}>
                {question.optionTwo.text}
              </Typography>
              <Typography component="p" variant="body1">
                People who voted: {question.optionTwo.votes.length}
              </Typography>
              <Typography component="p" variant="body1">
                Percentage: {(question.optionTwo.votes.length / Object.keys(users).length) * 100}%
              </Typography>
            </Box>
          </Box>
        </>
      ) : (
        <Box>
          <Typography component="div" variant="h5">
            Would you rather
          </Typography>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              gap: 2,
              marginTop: 3,
            }}
          >
            <Box sx={{ width: "100%" }}>
              <Typography
                component="p"
                variant="body1"
                sx={{ border: "solid 1px #574c4c", borderRadius: 1, padding: 2 }}
              >
                {question.optionOne.text}
              </Typography>
              <Button variant="contained" sx={{ width: "100%" }} onClick={() => onSaveQuestionAnswer("optionOne")}>
                Click
              </Button>
            </Box>
            <Box sx={{ width: "100%" }}>
              <Typography
                component="p"
                variant="body1"
                sx={{ border: "solid 1px #574c4c", borderRadius: 1, padding: 2 }}
              >
                {question.optionTwo.text}
              </Typography>
              <Button variant="contained" sx={{ width: "100%" }} onClick={() => onSaveQuestionAnswer("optionTwo")}>
                Click
              </Button>
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
};

const mapStateToProps = ({ users, questions, isLoading, authedUser }, { router }) => {
  const { question_id } = router.params;
  const question = !questions[question_id] ? null : formatQuestion(questions[question_id], authedUser);
  const author = question ? users[question.author] : null;
  return { question, author, router, isLoading, users };
};

export default withRouter(connect(mapStateToProps)(QuestionDetail));
