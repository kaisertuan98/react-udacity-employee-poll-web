import React from 'react';
import { Check } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import { Paper, Typography } from '@mui/material';
import PropTypes from 'prop-types';

export const OptionBox = ({ children, clickHandler, isAnswered, loading = false, isSelected }) => {
  return (
    <Paper elevation={4} sx={{ flex: 1, display: 'flex', flexFlow: 'column' }}>
      <Typography sx={{ p: 3, fontSize: 23 }} color="initial">
        {children}
      </Typography>
      <LoadingButton
        onClick={clickHandler}
        variant="contained"
        color="success"
        sx={{ width: '100%', flex: 1, py: 2 }}
        disabled={isAnswered}
        loading={loading}
      >
        {isSelected && <Check color="success" fontSize="large" />}
        Click
      </LoadingButton>
    </Paper>
  );
};

OptionBox.propTypes = {
  clickHandler: PropTypes.func.isRequired,
  isAnswered: PropTypes.bool.isRequired,
  loading: PropTypes.bool,
  isSelected: PropTypes.bool.isRequired,
};
