import React from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Grid from "@mui/material/Grid";

const PageNotFound = () => {
  let navigate = useNavigate();
  const onNavigate = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Container maxWidth="md">
        <Grid container>
          <Grid>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">
              The page you’re looking for doesn’t exist.
            </Typography>
            <Button variant="contained" onClick={onNavigate}>
              Back Home
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PageNotFound;
