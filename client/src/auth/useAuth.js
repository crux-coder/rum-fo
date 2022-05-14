import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storedUser, storedAccessToken, storedRefreshToken } from '../store/userSlice';

const useAuth = () => {
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    dispatch(storedUser(data.user));
    dispatch(storedAccessToken(data.tokens.access));
    dispatch(storedRefreshToken(data.tokens.refresh));
    navigate('/profile');
  };

  // call this function to sign out logged in user
  const logout = () => {
    dispatch(storedUser(null));
    dispatch(storedAccessToken(''));
    dispatch(storedRefreshToken(''));
    navigate('/', { replace: true });
  };
  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
