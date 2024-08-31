import { useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import CommentIcon from '@mui/icons-material/Comment';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Link } from 'react-router-dom';
import { Container } from '@mui/material';
import Comment from '../Comment/Comment';
import CommentForm from '../Comment/CommentForm';
import { useAuth } from '../../hooks/AuthProvider';
import { DeleteWithAuth, Get, PostWithAuth } from '../../services/HttpService';

const ExpandMore = styled((props) => {
  // eslint-disable-next-line no-unused-vars
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(0deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

export const Post = ({ postId, title, content, userId, userName, likes }) => {
  const [expanded, setExpanded] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [commentList, setCommentList] = useState([]);
  const [likeCount, setLikeCount] = useState(likes.length);
  const [likeId, setLikeId] = useState(-1);
  const user = useAuth();
  let disabled = user.userId === null ? true : false;

  const handleExpandClick = () => {
    setExpanded((prev) => !prev);
  };

  const handleLike = () => {
    if (isLiked) {
      unlikePost();
    } else {
      likePost();
    }
  };

  const likePost = () => {
    PostWithAuth(user.accessToken, '/api/likes', {
      postId: postId,
      userId: user.userId,
    }).then((response) => {
      response.json();
      setLikeCount(likeCount + 1);
      setIsLiked(true);
    });
  };

  const unlikePost = () => {
    DeleteWithAuth(user.accessToken, `/api/likes/${likeId}`, {}).then(() => {
      setLikeCount(likeCount - 1);
      setIsLiked(false);
    });
  };

  const refreshComments = () => {
    Get(`/api/comments?postId=${postId}`)
      .then((res) => res.json())
      .then((result) => {
        setIsLoaded(true);
        setCommentList(result);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  };

  useEffect(() => {
    if (!expanded || commentList.length > 0) {
      return;
    }
    refreshComments();
  }, [expanded]);

  useEffect(() => {
    const like = likes.find((like) => like.userId === user.userId);

    if (like !== undefined) {
      setIsLiked(() => true);
      setLikeId(() => like.id);
    }
  }, [user, likes]);

  return (
    <Card sx={{ width: '800px' }}>
      <CardHeader
        avatar={
          <Link to={`/users/${userId}`}>
            <Avatar
              sx={{
                background: 'linear-gradient(45deg, #1895c7 30%, #6fbede 90%)',
              }}
              aria-label="recipe"
            >
              {userName[0].toUpperCase()}
            </Avatar>
          </Link>
        }
        title={title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {content}
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton
          disabled={disabled}
          aria-label="add to favorites"
          onClick={handleLike}
          sx={{ ':focus': { outline: 'none' } }}
        >
          <FavoriteIcon sx={isLiked ? { color: 'red' } : {}} />
        </IconButton>
        {likeCount}
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show comments"
          sx={{ ':focus': { outline: 'none' } }}
        >
          <CommentIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Container fixed>
          {error ? (
            <div>Error: {error}</div>
          ) : !isLoaded ? (
            <div>Loading...</div>
          ) : (
            commentList.length !== 0 &&
            commentList.map((comment) => (
              <Comment
                key={comment.id}
                comment={comment.comment}
                userId={4}
                userName={'N'}
              />
            ))
          )}
          {!disabled && (
            <CommentForm
              postId={postId}
              userId={user.userId}
              userName={user.userName}
              refreshComments={refreshComments}
            />
          )}
        </Container>
      </Collapse>
    </Card>
  );
};
