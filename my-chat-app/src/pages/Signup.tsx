// src/pages/Signup.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SIGNUP_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const Signup: React.FC = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [signupUser] = useMutation(SIGNUP_USER);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const { data: signupData } = await signupUser({ variables: { username: data.username, email: data.email, password: data.password } });
      console.log('Signup successful', signupData);
      localStorage.setItem('token', signupData.signup.token); // Save JWT in localStorage
      navigate('/'); // Redirect to HomePage
    } catch (error) {
      console.error('Signup failed', error);
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" gutterBottom>Signup</Typography>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '400px' }}>
          <TextField
            label="Username"
            fullWidth
            margin="normal"
            {...register('username', { required: 'Username is required' })}
            error={!!errors.username}
            helperText={errors.username?.message}
          />
          <TextField
            label="Email"
            fullWidth
            margin="normal"
            {...register('email', { required: 'Email is required' })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            {...register('password', { required: 'Password is required' })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>Signup</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Signup;
