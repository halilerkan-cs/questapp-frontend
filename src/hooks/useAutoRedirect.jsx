import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthProvider';

const useAutoRedirect = () => {
  const user = useAuth();
  const navigate = useNavigate();

  return useEffect(() => {
    if (user.userId != null) {
      navigate('/');
    }
  }, []);
};

export default useAutoRedirect;
