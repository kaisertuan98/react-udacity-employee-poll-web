import { ANSWER_OPTION } from '../../constants/constant';

export const checkIfAnswered = (question, authedUser) => {
  const optionOneVoters = question[ANSWER_OPTION.OPTION_FIRST].votes;
  const optionTwoVoters = question[ANSWER_OPTION.OPTION_SECOND].votes;
  
return optionOneVoters.includes(authedUser) || optionTwoVoters.includes(authedUser);
};
