import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid';
import { useSelector } from 'react-redux';
import Typography from '@mui/material/Typography'


export default function Leaderboard() {
  const users = useSelector((state) => state.users.users);
  const leaderBoard = Object.keys(users)
    .map((userId) => ({
      ...users[userId],
      noAnswers: Object.keys(users[userId].answers).length,
      noQuestions: users[userId].questions.length, 
    }))
    .sort(({ noQuestions: noQuestionsA }, { noQuestions: noQuestionsB }) => noQuestionsB - noQuestionsA)
    .sort(({ noAnswers: noAnswerA }, { noAnswers: noAnswerB }) => noAnswerB - noAnswerA);

  return (
    <Container>
      <TableContainer component={Paper} elevation={4} sx={{ mt: 5 }}>
        <Table sx={{ minWidth: 650 }}>
          <TableHead>
            <TableRow sx={{ backgroundColor: 'grey.400' }}>
              <TableCell sx={{ fontWeight: 'bold' }}>Users</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Answers</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leaderBoard.map((user) => (
              <TableRow key={user.name}>
                <TableCell component="th" scope="row">
                  <Grid container spacing={2}>
                    <Grid item>
                      <Avatar alt="Remy Sharp" src={user.avatarURL} />
                    </Grid>
                    <Grid item>
                      <Grid container flexDirection='column' >
                        <Grid item>
                          <Typography variant="body1" color="initial">{user.name}</Typography>
                        </Grid>
                        <Grid item>
                          <Typography variant="caption" color="grey">{user.id}</Typography>
                        </Grid>
                      </Grid>
                    </Grid>
                  </Grid>
                </TableCell>
                <TableCell>{user.noAnswers}</TableCell>
                <TableCell>{user.noQuestions}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
}
