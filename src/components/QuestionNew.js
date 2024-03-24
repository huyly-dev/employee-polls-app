import { useState } from "react";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import PollIcon from "@mui/icons-material/Poll";
import { handleAddQuestion } from "../actions/questions";
import { useNavigate } from "react-router-dom";

const QuestionNew = ({ dispatch }) => {
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  const [optionOne, setOptionOne] = useState("");
  const [optionTwo, setOptionTwo] = useState("");
  let navigate = useNavigate();

  const getFormData = (formData) => {
    const optionOne = formData.get("optionOne");
    const optionTwo = formData.get("optionTwo");
    setOptionOne(optionOne);
    setOptionTwo(optionTwo);
    return { optionOne, optionTwo };
  };

  const resetFormData = (formData) => {
    setOptionOne("");
    setOptionTwo("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { optionOne, optionTwo } = getFormData(formData);
    dispatch(
      handleAddQuestion({ optionOneText: optionOne, optionTwoText: optionTwo })
    );
    resetFormData();
    navigate("/");
  };

  const handleChange = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { optionOne, optionTwo } = getFormData(formData);
    if (!optionOne || !optionTwo) {
      setIsDisabledBtn(true);
      return;
    }
    setIsDisabledBtn(false);
  };

  return (
    <Box
      sx={{
        marginTop: 8,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
        <PollIcon></PollIcon>
      </Avatar>
      <Typography component="div" variant="h4">
        World You Rather
      </Typography>
      <Typography component="div" variant="body1">
        Create Your Own Poll
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        onChange={handleChange}
        noValidate
        sx={{ mt: 1, width: "100%", textAlign: "center" }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          id="optionOne"
          label="First Option"
          name="optionOne"
          autoComplete="off"
          autoFocus
          value={optionOne}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          name="optionTwo"
          label="Second Option"
          type="text"
          id="optionTwo"
          autoComplete="off"
          value={optionTwo}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, width: "100px" }}
          disabled={isDisabledBtn}
        >
          Create
        </Button>
      </Box>
    </Box>
  );
};

const mapStateToProps = ({ authedUser }) => ({ authedUser });

export default connect(mapStateToProps)(QuestionNew);
