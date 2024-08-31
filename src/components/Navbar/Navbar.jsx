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

const Navbar = () => {
  const user = useAuth();

  const linkStyle = { textDecoration: 'none', color: 'white' };

  const handleLogout = () => {
    user.logoutAction();
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
                <IconButton onClick={handleLogout}>
                  <LockOpenIcon></LockOpenIcon>
                </IconButton>
              </div>
            )}
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
