import './Navbar.css';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/AuthProvider';
import { useState } from 'react';
import { Button, Modal } from '@mui/material';

const linkStyle = { textDecoration: 'none', color: 'white' };
const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  display: 'flex',
  flexDirection: 'column',
  gap: '1em',
  alignItems: 'center',
};

const Navbar = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const user = useAuth();

  const handleLogout = () => {
    closeModal();
    user.logoutAction();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ flexGrow: 0, width: '100%', position: 'fixed', zIndex: 2 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1, textAlign: 'left' }}>
            <Link to="/" style={linkStyle}>
              Home
            </Link>
          </Typography>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, textAlign: 'right' }}
          >
            {user.userId == null ? (
              <Link to="/auth/login" style={linkStyle}>
                Login
              </Link>
            ) : (
              <div
                style={{
                  display: 'flex',
                  gap: 10,
                  alignItems: 'center',
                  justifyContent: 'end',
                }}
              >
                <Link to={`/users/${user.userId}`} style={linkStyle}>
                  Profile
                </Link>
                <IconButton onClick={() => setIsModalOpen(true)}>
                  <LockOpenIcon></LockOpenIcon>
                </IconButton>
                <Modal
                  open={isModalOpen}
                  onClose={closeModal}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  sx={{ alignSelf: 'center', justifySelf: 'center' }}
                >
                  <Box sx={modalStyle}>
                    <Typography
                      id="keep-mounted-modal-title"
                      variant="h6"
                      component="h2"
                      sx={{ color: 'black' }}
                    >
                      You are logging out. Are you sure?
                    </Typography>
                    <div
                      style={{
                        display: 'flex',
                        gap: '1em',
                      }}
                    >
                      <Button variant="contained" onClick={handleLogout}>
                        Yes
                      </Button>
                      <Button variant="text" onClick={closeModal}>
                        No
                      </Button>
                    </div>
                  </Box>
                </Modal>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
