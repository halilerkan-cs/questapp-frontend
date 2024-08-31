import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar/Navbar';
import User from './components/User/User';
import Home from './components/Home/Home';
import Register from './components/Auth/Register';
import Login from './components/Auth/Login';
import PrivateRoute from './services/PrivateRoute';
import AuthProvider from './hooks/AuthProvider';

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <AuthProvider>
          <Navbar />
          <div style={{ marginTop: '64px', width: '100%', height: '100%' }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route element={<PrivateRoute />}>
                <Route path="/users/:userId" element={<User />} />
              </Route>
              <Route path="/auth">
                <Route path="register" element={<Register />} />
                <Route path="login" element={<Login />} />
              </Route>
            </Routes>
          </div>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
