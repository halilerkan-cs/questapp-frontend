import { Avatar, CardContent, OutlinedInput } from '@mui/material';
import { Link } from 'react-router-dom';

const Comment = ({ comment, userId, userName }) => {
  return (
    <CardContent>
      <OutlinedInput
        disabled
        id="outlined-adornment-amount"
        multiline
        inputProps={{ maxLength: 100 }}
        fullWidth
        value={comment}
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
      ></OutlinedInput>
    </CardContent>
  );
};

export default Comment;
