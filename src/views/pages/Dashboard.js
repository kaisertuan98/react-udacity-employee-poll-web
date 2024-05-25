import React, { useEffect, useState } from 'react';
import { Box, Tab, Tabs, Container } from '@mui/material';
import PropTypes from 'prop-types';
import QuestionsList from '../components/QuestionsList';
import { useSelector } from 'react-redux';
import { ANSWER_TYPE } from '../../constants/constant';

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

const Dashboard = () => {
  const [value, setValue] = useState(0);
  const authedUser = useSelector((state) => state.login.authedUser);
  const [newQuestions, setNewQuestions] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState({});
  const allQuestions = useSelector((state) => state.polls.polls);
  const users = useSelector((state) => state.users.users);

  useEffect(() => {
    if (authedUser) {
      const answeredQuestionIds = Object.keys(users[authedUser].answers).sort(
        (firstQId, secondQId) => {
          return allQuestions[secondQId].timestamp - allQuestions[firstQId].timestamp;
        },
      );
      const newQuestionIds = Object.keys(allQuestions)
        .filter((questionId) => !users[authedUser].answers[questionId])
        .sort((firstQId, secondQId) => {
          return allQuestions[secondQId].timestamp - allQuestions[firstQId].timestamp;
        });
      setNewQuestions(
        newQuestionIds.reduce((acc, questionId) => {
          return { ...acc, [questionId]: allQuestions[questionId] };
        }, {}),
      );
      setAnsweredQuestions(
        answeredQuestionIds.reduce((acc, questionId) => {
          return { ...acc, [questionId]: allQuestions[questionId] };
        }, {}),
      );
    }
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <Container maxWidth="xl">
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="New Question" />
              <Tab label="Done" />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <QuestionsList questions={newQuestions} questionType={ANSWER_TYPE.NOANSWER} />
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <QuestionsList questions={answeredQuestions} questionType={ANSWER_TYPE.ANSWER} />
          </CustomTabPanel>
        </Box>
      </Container>
    </div>
  );
};

export default Dashboard;
