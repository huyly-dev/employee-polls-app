import { useEffect } from "react";
import { connect } from "react-redux";
import Navbar from "./components/Navbar";
import { Routes, Route, Outlet } from "react-router-dom";
import Home from "./components/Home";
import QuestionNew from "./components/QuestionNew";
import LeaderBoard from "./components/LeaderBoard";
import SignIn from "./components/SignIn";
import { handleInitialData } from "./actions/shared";
import { setAuthedUser } from "./actions/authedUser";
import { getAuthedUser } from "./utils/helper";
import QuestionDetail from "./components/QuestionDetail";
import PageNotFound from "./components/PageNotFound";

function App({ dispatch }) {
  dispatch(setAuthedUser(getAuthedUser()));
  const authedUser = getAuthedUser();

  useEffect(() => {
    dispatch(handleInitialData());
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/sign-in" exact element={<SignIn />} />
        {authedUser && (
          <Route element={<LayOut />}>
            <Route path="/" exact element={<Home />} />
            <Route path="/question/:question_id" element={<QuestionDetail />} />
            <Route path="/leader-board" element={<LeaderBoard />} />
            <Route path="/new" element={<QuestionNew />} />
          </Route>
        )}
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
