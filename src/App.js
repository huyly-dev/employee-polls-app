import { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import QuestionNew from "./components/QuestionNew";
import LeaderBoard from "./components/LeaderBoard";
import SignIn from "./components/SignIn";
import { handleInitialData } from "./actions/shared";
import QuestionDetail from "./components/QuestionDetail";
import PageNotFound from "./components/PageNotFound";
import { withLoggedIn } from "./utils/helper";

function App({ dispatch, authedUser }) {
  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  const HomeRoute = withLoggedIn(Home, authedUser);
  const QuestionDetailRoute = withLoggedIn(QuestionDetail, authedUser);
  const LeaderBoardRoute = withLoggedIn(LeaderBoard, authedUser);
  const QuestionNewRoute = withLoggedIn(QuestionNew, authedUser);

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-in" element={<SignIn />} />
        <Route element={<LayOut />}>
          <Route path="/" exact element={<HomeRoute />} />
          <Route path="/question/:question_id" element={<QuestionDetailRoute />} />
          <Route path="/leader-board" element={<LeaderBoardRoute />} />
          <Route path="/new" element={<QuestionNewRoute />} />
        </Route>
        <Route path="*" element={<PageNotFound />} />
        <Route path="/page-not-found" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

const LayOut = () => {
  return (
    <>
      <Navbar></Navbar>
      <div className="app-container">
        <Outlet />
      </div>
    </>
  );
};

const mapStateToProps = ({ authedUser }) => ({
  authedUser,
});

export default connect(mapStateToProps)(App);
