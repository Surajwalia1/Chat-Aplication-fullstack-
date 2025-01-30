// src/pages/Login.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { Button, TextField, Container, Box, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../graphql/mutations';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [loginUser] = useMutation(LOGIN_USER);
  const navigate = useNavigate();

  const onSubmit = async (data: any) => {
    try {
      const { data: loginData } = await loginUser({ variables: { email: data.email, password: data.password } });
      console.log('Login successful', loginData);
      localStorage.setItem('token', loginData.login.token); // Save JWT in localStorage
      navigate('/'); // Redirect to HomePage
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  return (
    <Container>
      <Box display="flex" flexDirection="column" alignItems="center" justifyContent="center" height="100vh">
        <Typography variant="h4" gutterBottom>Login</Typography>
        
        <form onSubmit={handleSubmit(onSubmit)} style={{ width: '100%', maxWidth: '400px' }}>
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
          <Button type="submit" variant="contained" color="primary" fullWidth>Login</Button>
        </form>
      </Box>
    </Container>
  );
};

export default Login;
