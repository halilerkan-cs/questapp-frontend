import { Button, FormHelperText, TextField } from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import useAutoRedirect from '../../hooks/useAutoRedirect';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const user = useAuth();
  useAutoRedirect();

  const handleLogin = () => {
    user.loginAction({ userName: username, password: password });
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
          onClick={handleLogin}
        >
          Login
        </Button>
        <FormHelperText>
          {"Don't have an account?"} <Link to="/auth/register">Register</Link>
        </FormHelperText>
      </div>
    </div>
  );
};

export default Login;
