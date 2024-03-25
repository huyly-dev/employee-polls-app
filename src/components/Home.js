import { connect } from "react-redux";
import "./Home.css";
import QuestionsList from "./QuestionsList";
import { useNavigate } from "react-router-dom";
import { Avatar, Box, Button, Typography } from "@mui/material";
import PollIcon from "@mui/icons-material/Poll";

const Home = ({ authedUser }) => {
  let navigate = useNavigate();
  if (!authedUser) {
    return (
      <Box sx={{ marginY: 10, display: "flex", flexDirection: "column", alignItems: "center", gap: 5 }}>
        <Avatar sx={{ width: "100px", height: "100px" }}>
          <PollIcon></PollIcon>
        </Avatar>
        <Typography omponent="h4" variant="h4">
          You need to sign-in before seeing awesome features.
        </Typography>
        <Button variant="outlined" onClick={() => navigate("/sign-in")}>
          Sign-In
        </Button>
      </Box>
    );
  }
  return (
    <div className="">
      <QuestionsList></QuestionsList>
    </div>
  );
};

const mapStateToProps = ({ authedUser }) => {
  return { authedUser };
};
export default connect(mapStateToProps)(Home);
