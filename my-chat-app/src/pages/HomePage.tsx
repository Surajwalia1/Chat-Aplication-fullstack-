import React, { useState, useEffect } from 'react';
import { Button, Container, Typography, Box, Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [dynamicText, setDynamicText] = useState<string>("Welcome to our Chat App");

  // Simulate real-time data change (e.g., live updates)
  useEffect(() => {
    const interval = setInterval(() => {
      setDynamicText(prevText =>
        prevText === "Welcome to our Chat App" ? "Start chatting now!" : "Welcome to our Chat App"
      );
    }, 3000);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <Container>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="100vh"
        padding={3}
      >
        {/* Animated Welcome Message */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Typography variant="h4" gutterBottom>
            {dynamicText}
          </Typography>
        </motion.div>

        {/* Introduction Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <Typography variant="body1" align="center" paragraph>
            Chat with your friends, share media, and enjoy real-time conversations. 
            Our app makes it easy to stay connected and share what's important to you.
          </Typography>
        </motion.div>

        {/* Adding padding below the Introduction Text */}
        <Box paddingBottom={4} />

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          <Grid container spacing={3} justifyContent="center" style={{ marginBottom: '32px' }}>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Typography variant="h6">Real-Time Chat</Typography>
                <Typography variant="body2">
                  Connect with others instantly with our real-time messaging feature.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Typography variant="h6">Media Sharing</Typography>
                <Typography variant="body2">
                  Easily share images, videos, and more in your conversations.
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} sm={4}>
              <Box textAlign="center">
                <Typography variant="h6">Secure Conversations</Typography>
                <Typography variant="body2">
                  Enjoy a secure chat environment with end-to-end encryption.
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </motion.div>

        {/* Call-to-Action Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <Typography variant="body2" align="center" paragraph style={{ marginBottom: '16px' }}>
            Ready to get started? Choose an option below to sign in or create an account and begin chatting!
          </Typography>
        </motion.div>

        {/* Animated Login Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
           transition={{ type: 'spring', stiffness: 300 }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate('/login')}
            fullWidth
            style={{ marginBottom: '16px' }}
          >
            Login
          </Button>
        </motion.div>

        {/* Animated Signup Button */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
        >
          <Button
            variant="contained"
            color="secondary"
            onClick={() => navigate('/signup')}
            fullWidth
          >
            Signup
          </Button>
        </motion.div>
      </Box>
    </Container>
  );
};

export default HomePage;
