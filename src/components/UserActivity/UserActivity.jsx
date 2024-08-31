import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';
import { Modal } from '@mui/material';
import { Post } from '../Post/Post';
import { GetWithAuth, RefreshToken } from '../../services/HttpService';

const notificationStyle = {
  textAlign: 'center',
  transition: 'font-size .2s ease-in-out',
  height: 20,
  ':hover': {
    fontSize: 'larger',
    height: 20,
  },
};

const UserActivity = () => {
  const [lastActivities, setLastActivities] = useState([]);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [post, setPost] = useState({});
  const user = useAuth();

  const getActivity = () => {
    GetWithAuth(user.accessToken, '/api/users/activity/' + user.userId)
      .then((response) => {
        if (response.status == 401) {
          RefreshToken(user.userId, user.refreshToken)
            .then((res) => {
              if (res.status == 401) {
                console.log('refresh expired');
                user.logoutAction(true);
              }
              return res.json();
            })
            .then((data) => {
              user.refreshAccessToken(data.accessToken);
              GetWithAuth(
                data.accessToken,
                '/api/users/activity/' + user.userId
              )
                .then((response) => response.json())
                .then((data) => setLastActivities(data));
            });
        }
        return response.json();
      })
      .then((data) => setLastActivities(data));
  };

  useEffect(() => {
    getActivity();
  }, []);

  const handleNotification = (postId) => () => {
    GetWithAuth(user.accessToken, '/api/posts/' + postId)
      .then((res) => res.json())
      .then((result) => (setIsLoaded(true), setPost(result)))
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });

    setIsNotificationOpen(true);
  };

  return (
    <div style={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                sx={{ textAlign: 'center', backgroundColor: '#e3e3e3' }}
              >
                <p
                  style={{
                    fontWeight: 'bold',
                    fontSize: 'large',
                    margin: 0,
                  }}
                >
                  Last Activities
                </p>
              </TableCell>
            </TableRow>
          </TableHead>
          {lastActivities.length != 0 && (
            <TableBody sx={{ display: 'flex', flexDirection: 'column' }}>
              {lastActivities.map((row, index) => (
                <TableRow
                  key={index}
                  onClick={handleNotification(row[1])}
                  sx={{ display: 'contents', cursor: 'pointer' }}
                >
                  <TableCell component="th" scope="row" sx={notificationStyle}>
                    {row[3] + ' ' + row[0] + ' post ' + row[1]}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          )}
        </Table>
      </TableContainer>
      <div>
        <Modal
          open={isNotificationOpen}
          onClose={() => setIsNotificationOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div>
            {isLoaded ? (
              <Post
                postId={post.id}
                userId={post.userId}
                userName={post.userName}
                title={post.title}
                content={post.content}
                likes={post.likes}
              />
            ) : error ? (
              'Error...'
            ) : (
              'Loading...'
            )}
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default UserActivity;
