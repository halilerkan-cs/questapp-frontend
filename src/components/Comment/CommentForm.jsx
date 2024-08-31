import {
  Alert,
  Avatar,
  Button,
  CardContent,
  OutlinedInput,
  Snackbar,
} from '@mui/material';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { PostWithAuth } from '../../services/HttpService';
import { useAuth } from '../../hooks/AuthProvider';

const CommentForm = ({ postId, userId, userName, refreshComments }) => {
  const [comment, setComment] = useState('');
  const [open, setOpen] = useState(false);
  const user = useAuth();

  const handleClose = () => {
    setOpen(false);
  };

  const commentSave = () => {
    PostWithAuth(user.accessToken, '/api/comments', {
      postId: postId,
      userId: userId,
      comment: comment,
    }).then((response) => {
      response.json();
      setComment('');
      setOpen(true);
      refreshComments();
    });
  };

  const handleSubmit = () => {
    commentSave();
  };

  return (
    <CardContent>
      <OutlinedInput
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 100 }}
        fullWidth
        value={comment}
        placeholder="Write a comment..."
        onChange={(e) => setComment(e.target.value)}
        sx={{
          display: 'flex',
          gap: '10px',
        }}
        startAdornment={
          <Link
            to={`/users/${userId}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Avatar
              sx={{
                background: 'linear-gradient(45deg, #798282 30%, #9aa6a6  90%)',
                width: 30,
                height: 30,
              }}
              aria-label="recipe"
            >
              {userName[0].toUpperCase()}
            </Avatar>
          </Link>
        }
        endAdornment={
          <Button
            variant="contained"
            sx={{
              background: 'linear-gradient(45deg, #1895c7 30%, #6fbede 90%)',
              ':focus': { outline: 'none' },
            }}
            onClick={handleSubmit}
          >
            Comment
          </Button>
        }
      ></OutlinedInput>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          onClose={handleClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          Your comment has been sent successfully!
        </Alert>
      </Snackbar>
    </CardContent>
  );
};

export default CommentForm;
