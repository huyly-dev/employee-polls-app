import { Button, Typography, Divider } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../utils/helper";

const Question = ({ question }) => {
  let navigate = useNavigate();

  return (
    <div className="question-container">
      <Typography component="h5" variant="h5" sx={{ marginBottom: 1 }}>
        {question && question.author}
      </Typography>
      <Typography component="div" variant="body1" sx={{ marginBottom: 1 }}>
        {question && formatDate(question.timestamp)}
      </Typography>
      <Divider sx={{ width: "100%" }} />
      <Button
        variant="outlined"
        sx={{ marginTop: 2 }}
        onClick={() => navigate(`/question/${question.id}`)}
        data-testid="btn-add-question"
      >
        Show
      </Button>
    </div>
  );
};

export default Question;
