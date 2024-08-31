import { Alert, Snackbar } from '@mui/material';
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GetWithAuth, Post, PutWithAuth } from '../services/HttpService';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userId, setUserId] = useState(null);
  const [userName, setUserName] = useState('');
  const [avatarId, setAvatarId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const navigate = useNavigate();

  const handleClose = () => {
    setIsAlertOpen(false);
  };

  useEffect(() => {
    setIsError(false);
    if (localStorage.getItem('userId') != null) {
      setUserId(localStorage.getItem('userId'));
      setAccessToken(localStorage.getItem('accessToken'));
      setUserName(localStorage.getItem('userName'));
      navigate('/');
    }
  }, []);

  const updateAvatar = async (newAvatarId) => {
    await PutWithAuth(accessToken, '/api/users/' + userId, {
      avatar: newAvatarId,
    }).catch((error) => console.log(error));

    await fetchAvatar(userId);
  };

  const fetchAvatar = async (userId, tokenParam) => {
    await GetWithAuth(
      tokenParam ? tokenParam : accessToken,
      '/api/users/' + userId
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);

        setAvatarId(result.avatarId);
      });
  };

  const loginAction = async (data) => {
    try {
      const response = await Post('/api/auth/login', data);

      const res = await response.json();
      setUserId(res.userId);
      setUserName(data.userName);
      setAccessToken(res.accessToken);
      setRefreshToken(res.refreshToken);
      fetchAvatar(res.userId, res.accessToken);
      localStorage.setItem('userId', res.userId);
      localStorage.setItem('userName', data.userName);
      localStorage.setItem('accessToken', res.accessToken);
      localStorage.setItem('refreshToken', res.refreshToken);
      setIsAlertOpen(true);
      setAlertMessage(
        'You have successfully logged in. Redirecting to the home page...'
      );

      setTimeout(() => navigate('/'), [2000]);
    } catch (error) {
      console.log(error);
      setIsAlertOpen(true);
      setAlertMessage('Error..');
      setIsError(true);
    }
  };

  const logoutAction = (isRefreshExpired = false) => {
    setUserId(null);
    setUserName('');
    setAccessToken(null);
    localStorage.removeItem('userId');
    localStorage.removeItem('userName');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    if (isRefreshExpired) {
      setIsAlertOpen(true);
      setAlertMessage(
        'Your session has been terminated. You have to logged in again.'
      );
      setIsError(true);
    }
    setTimeout(() => {
      navigate('/auth/login');
      setIsError(false);
    }, 2000);
  };

  const refreshAccessToken = (newAccessToken) => {
    setAccessToken(newAccessToken);
    localStorage.setItem('accessToken', newAccessToken);
  };

  return (
    <>
      <Snackbar
        open={isAlertOpen}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          severity={isError ? 'error' : 'success'}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <AuthContext.Provider
        value={{
          loginAction,
          logoutAction,
          refreshAccessToken,
          userId,
          userName,
          avatarId,
          accessToken,
          refreshToken,
          updateAvatar,
        }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;
