import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { connect } from "react-redux";
import { Box } from "@mui/system";
import { Avatar, Typography } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(name, id, avatarURL, anwered, created) {
  return { name, id, avatarURL, anwered, created };
}

const LeaderBoard = ({ users }) => {
  let rows = [];
  if (!users) return;

  rows = Object.keys(users).map((id) =>
    createData(
      users[id].name,
      id,
      users[id].avatarURL,
      Object.keys(users[id].answers).length,
      users[id].questions.length
    )
  );
  if (rows.length > 0) {
    return (
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 700 }} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>User</StyledTableCell>
              <StyledTableCell align="right">Answered</StyledTableCell>
              <StyledTableCell align="right">Created</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <StyledTableRow key={row.name}>
                <StyledTableCell component="th" scope="row">
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar alt="User Image" src={`${row?.avatarURL}`}></Avatar>
                    <Box>
                      <Typography component="div" variant="h5">
                        {row.name}
                      </Typography>
                      <Typography component="div" variant="body1">
                        {row.id}
                      </Typography>
                    </Box>
                  </Box>
                </StyledTableCell>
                <StyledTableCell align="right">{row.anwered}</StyledTableCell>
                <StyledTableCell align="right">{row.created}</StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    <Typography sx={{ mt: 4, mb: 4, ml: 1 }} component="div" variant="body1">
      Loading
    </Typography>
  );
};

const mapStateToProps = ({ users }) => {
  return { users };
};
export default connect(mapStateToProps)(LeaderBoard);
