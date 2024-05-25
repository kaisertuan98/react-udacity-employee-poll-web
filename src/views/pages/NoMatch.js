import React from 'react';
import { Box, Button, Container, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import errorImage from '../assets/error-2129569__340.jpg';
import { useNavigate } from 'react-router-dom';

export default function NoMatch() {
  const navigate = useNavigate();
  
return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth="md">
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Typography variant="h1">404</Typography>
            <Typography variant="h6">The page you’re looking for doesn’t exist.</Typography>
            <Button variant="contained" onClick={() => navigate('/')}>
              Back Home
            </Button>
          </Grid>
          <Grid item xs={6}>
            <img src={errorImage} alt="" width={500} height={250} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
