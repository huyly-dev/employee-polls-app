import { Avatar } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { setAuthedUser } from "../actions/authedUser";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

const Navbar = ({ authedUser, users, dispatch }) => {
  let navigate = useNavigate();
  const currentUser = users ? users[authedUser] : null;
  const handleLogout = () => {
    localStorage.removeItem("authedUser");
    dispatch(setAuthedUser(null));
    navigate("/sign-in");
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Typography omponent="h5" variant="h5" className="logo">
          Employee Polls
        </Typography>
        <div className={`nav-elements active`}>
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/leader-board">Leader Board</NavLink>
            </li>
            <li>
              <NavLink to="/new">New</NavLink>
            </li>
          </ul>
        </div>
        <div className="user-info">
          <Avatar alt="Authed User" src={currentUser?.avatarURL}></Avatar>
          <Typography omponent="p" variant="body1">
            {currentUser?.name}
          </Typography>
          <Button variant="outlined" onClick={handleLogout}>
            Logout
          </Button>
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ authedUser, users }) => ({ authedUser, users });

export default connect(mapStateToProps)(Navbar);
