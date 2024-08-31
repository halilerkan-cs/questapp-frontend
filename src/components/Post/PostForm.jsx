import { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { Alert, Button, OutlinedInput, Snackbar } from '@mui/material';
import { PostWithAuth } from '../../services/HttpService';
import { useAuth } from '../../hooks/AuthProvider';

export const PostForm = ({ userId, userName, refreshPosts }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [open, setOpen] = useState(false);
  const user = useAuth();

  useEffect(() => {
    if (isSent) {
      setTitle('');
      setContent('');
    }
  }, [isSent]);

  const savePost = () => {
    PostWithAuth(user.accessToken, '/api/posts', {
      userId: userId,
      title: title,
      content: content,
    })
      .then((response) => {
        response.json();
        setOpen(true);
        refreshPosts();
      })
      .catch((error) => {
        console.error('Error:', error);
        refreshPosts();
      });
  };

  const handleSubmit = () => {
    savePost();
    setIsSent(true);
  };

  const handleSaveTitle = (value) => {
    setTitle(value);
    setIsSent(false);
  };

  const handleSaveContent = (value) => {
    setContent(value);
    setIsSent(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your post has been sent successfully!
        </Alert>
      </Snackbar>
      <Card sx={{ width: '800px' }}>
        <CardHeader
          avatar={
            <Link to={`/users/${userId}`}>
              <Avatar
                sx={{
                  background:
                    'linear-gradient(45deg, #1895c7 30%, #6fbede 90%)',
                }}
                aria-label="recipe"
              >
                {userName[0].toUpperCase()}
              </Avatar>
            </Link>
          }
          title={
            <OutlinedInput
              id="outlined-adornment-amount"
              placeholder="Title"
              inputProps={{ maxLength: 25 }}
              fullWidth
              onChange={(e) => handleSaveTitle(e.target.value)}
              value={title}
            ></OutlinedInput>
          }
        />
        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {
              <OutlinedInput
                id="outlined-adornment-amount"
                multiline
                placeholder="Write Here..."
                inputProps={{ maxLength: 250 }}
                fullWidth
                endAdornment={
                  <Button
                    variant="contained"
                    sx={{
                      background:
                        'linear-gradient(45deg, #1895c7 30%, #6fbede 90%)',
                      ':focus': { outline: 'none' },
                    }}
                    onClick={handleSubmit}
                  >
                    Post
                  </Button>
                }
                onChange={(e) => handleSaveContent(e.target.value)}
                value={content}
              ></OutlinedInput>
            }
          </Typography>
        </CardContent>
      </Card>
    </div>
  );
};

export default PostForm;
