import {
  Alert,
  Button,
  FormHelperText,
  Snackbar,
  TextField,
} from '@mui/material';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useAutoRedirect from '../../hooks/useAutoRedirect';
import { Post } from '../../services/HttpService';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const navigate = useNavigate();
  useAutoRedirect();

  const handleRegister = () => {
    Post('/api/auth/register', { userName: username, password: password })
      .then((response) => {
        localStorage.setItem('accessToken', response.accessToken);
        localStorage.setItem('refreshToken', response.refreshToken);
        localStorage.setItem('currentUser', response.userId);
        localStorage.setItem('userName', username);
        window.dispatchEvent(new Event('storage'));
        setIsAlertOpen(true);
        setTimeout(function () {
          navigate('/auth/login');
        }, 3000);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  const handleClose = () => {
    setIsAlertOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: '#f0f5ff',
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'center',
      }}
    >
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          You have been registered successfully! You are redirected to the login
          page.
        </Alert>
      </Snackbar>
      <div
        style={{
          paddingTop: 100,
          display: 'flex',
          flexDirection: 'column',
          gap: 30,
        }}
      >
        <TextField
          id="standard-basic"
          label="Username"
          variant="standard"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          type="text"
        />
        <TextField
          id="standard-basic"
          label="Password"
          variant="standard"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
        />
        <Button
          variant="contained"
          sx={{
            background: 'linear-gradient(45deg, #1895c7 30%, #6fbede 90%)',
          }}
          onClick={handleRegister}
        >
          Register
        </Button>
        <FormHelperText>
          Already have an account? <Link to="/auth/login">Login</Link>
        </FormHelperText>
      </div>
    </div>
  );
};

export default Register;
