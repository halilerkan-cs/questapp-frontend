import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemText,
  Modal,
  Typography,
  Avatar,
  Radio,
} from '@mui/material';
import { useEffect, useState } from 'react';
import { useAuth } from '../../hooks/AuthProvider';

const AVATARS = [1, 2, 3, 4, 5];

const UserAvatar = () => {
  const user = useAuth();
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(0);
  const [avatarId, setAvatarId] = useState(0);
  console.log(selectedAvatar);

  const handleToggle = (value) => () => {
    setSelectedAvatar(value);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
  };
  const handleSave = () => {
    user.updateAvatar(selectedAvatar);
    setAvatarId(selectedAvatar);
    setOpen(false);
  };

  useEffect(() => {
    setAvatarId(user.avatarId);
    console.log('AVATAR: ', user.avatarId);
  }, [user.avatarId]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ alignSelf: 'center', justifySelf: 'center' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <List
            dense
            sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}
          >
            {AVATARS.map((avatarId__) => {
              const labelId = `checkbox-list-secondary-label-${avatarId__}`;
              return (
                <ListItem
                  key={avatarId__}
                  secondaryAction={
                    <Radio
                      edge="end"
                      onChange={handleToggle(avatarId__)}
                      checked={selectedAvatar == avatarId__}
                      inputProps={{ 'aria-labelledby': labelId }}
                    />
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemAvatar>
                      <Avatar
                        alt={`Avatar n°${avatarId__}`}
                        src={`/avatars/avatar${avatarId__}.png`}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      id={labelId}
                      primary={`Line item ${avatarId__ + 1}`}
                    />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
          <Button
            variant="contained"
            color="success"
            onClick={handleSave}
            sx={{
              alignSelf: 'end',
            }}
          >
            Save
          </Button>
        </div>
      </Modal>
      <Card
        sx={{
          maxWidth: 250,
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '10px',
        }}
      >
        <CardMedia
          sx={{ width: 150, height: 150 }}
          image={`/avatars/avatar${avatarId}.png`}
          title="user avatar"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Username
          </Typography>
          <Typography variant="body2" color="text.secondary">
            User Info
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleOpen}>
            Change Avatar
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default UserAvatar;
