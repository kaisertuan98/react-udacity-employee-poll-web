import React from 'react';
import PropTypes from 'prop-types';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { ANSWER_TYPE } from '../../constants/constant';
import Question from './Question';

const QuestionsList = ({ questions, questionType }) => {
  return (
    <div>
      <Container>
        <Typography
          variant="h3"
          color="initial"
          sx={{
            border: '1px solid lightgrey',
            borderRadius: '5px 5px 0px 0px',
            borderBottom: 'none',
            p: 1
          }}
        >
          {questionType === ANSWER_TYPE.ANSWER ? 'Done' : 'New Questions'}
        </Typography>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'left',
            gap: 4,
            mb: 4,
            border: '1px solid lightgrey',
            borderRadius: '0px 0px 5px 5px',
            p: 2,
          }}
        >
          {questions &&
            Object.keys(questions).map((id) => <Question key={id} question={questions[id]} />)}
        </Box>
      </Container>
    </div>
  );
};

QuestionsList.propTypes = {
  questions: PropTypes.object.isRequired,
  questionType: PropTypes.string.isRequired,
};

export default QuestionsList;
