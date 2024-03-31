import { useEffect, useState } from "react";
import { connect } from "react-redux";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { setAuthedUser } from "../actions/authedUser";
import { useLocation, useNavigate } from "react-router-dom";

const defaultTheme = createTheme();

const SignIn = ({ users, dispatch, authedUser }) => {
  const [error, setError] = useState("");
  const [isDisabledBtn, setIsDisabledBtn] = useState(true);
  let navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    authedUser && navigate("/");
  });
  const getFormData = (currentTarget) => {
    const formData = new FormData(currentTarget);
    const userName = formData.get("userName");
    const password = formData.get("password");
    return { userName, password };
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const { userName, password } = getFormData(event.currentTarget);
    const user = users[userName] ?? null;

    if (!user) {
      setError("User does not exist. Pls try another account!");
      return;
    }

    if (user.password !== password) {
      setError("Password is not correct. Pls try again!");
      return;
    }

    dispatch(setAuthedUser(userName));
    navigate(location.state ?? "/");
  };

  const handleChange = (event) => {
    event.preventDefault();
    setError("");
    const { userName, password } = getFormData(event.currentTarget);
    if (!userName || !password) {
      setIsDisabledBtn(true);
      return;
    }
    setIsDisabledBtn(false);
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} onChange={handleChange} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="userName"
              label="User Name"
              name="userName"
              autoComplete="off"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {
              <Typography component="p" variant="body1" color="red">
                {error}
              </Typography>
            }

            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }} disabled={isDisabledBtn}>
              Sign In
            </Button>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

const mapStateToProps = ({ users, authedUser }) => ({ users, authedUser });

export default connect(mapStateToProps)(SignIn);
