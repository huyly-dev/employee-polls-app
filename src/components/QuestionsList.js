import { Box, Divider, Tab, Tabs, Typography } from "@mui/material";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helper";
import Question from "./Question";
import { useState } from "react";

const QuestionsList = ({ newQuestions, anweredQuestions, isLoading }) => {
  const [value, setValue] = useState(0);

  if (isLoading) return <div>Loading</div>;

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: "100%" }} className="questions-list-container">
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="New Questions" {...a11yProps(0)} />
            <Tab label="Done" {...a11yProps(1)} />
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <Box className="questions-list-body">
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
          </Box>
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          <Box className="questions-list-body">
            <Typography component="div" variant="h4" sx={{ width: "100%", textAlign: "center" }}>
              Done
            </Typography>
            <Divider sx={{ width: "100%" }} />
            {anweredQuestions && anweredQuestions.map((item) => <Question question={item} key={item.id}></Question>)}
          </Box>
        </CustomTabPanel>
      </Box>
    </>
  );
};

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ pt: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

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
