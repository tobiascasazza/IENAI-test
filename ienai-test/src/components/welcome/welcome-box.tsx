import React from 'react'
import { Box, Typography, Button, Container } from '@mui/material';

export const WelcomeBox:React.FC = () =>  {
  return (
       <Box
      sx={{
        backgroundColor: '#f5f5f5',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Container
        maxWidth="sm"
        sx={{
          textAlign: 'center',
          padding: 4,
          borderRadius: 2,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 'bold', color: "text.secondary" }}>
          Welcome to the IENAI Technical Test
        </Typography>
        <Typography variant="h6" color="text.secondary" gutterBottom>
          Developed by <strong>Tobias Casazza</strong>.
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 3 }}>
          Use the navigation bar at the top to explore the page. Discover the features
          carefully designed for this technical test.
        </Typography>
        <Button
          href="/python-panel"
          variant="contained"
          color="primary"
          size="large"
          sx={{
            textTransform: 'none',
            boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.2)',
          }}
        >
          Explore Python Panel
        </Button>
      </Container>
    </Box>
  )
}
