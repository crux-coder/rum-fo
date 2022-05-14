import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { storedUser, storedAccessToken, storedRefreshToken } from '../store/userSlice';
import ROUTES from '../util/routes';

const useAuth = () => {
  const user = useSelector((state) => state.userData.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // call this function when you want to authenticate the user
  const login = async (data) => {
    dispatch(storedUser(data.user));
    dispatch(storedAccessToken(data.tokens.access));
    dispatch(storedRefreshToken(data.tokens.refresh));
    localStorage.setItem('user', JSON.stringify(data.user));
    localStorage.setItem('accessToken', JSON.stringify(data.tokens.access.token));
    localStorage.setItem('refreshToken', JSON.stringify(data.tokens.refresh.token));
    navigate(ROUTES.HOME);
  };

  // call this function to sign out logged in user
  const logout = () => {
    dispatch(storedUser(null));
    dispatch(storedAccessToken(''));
    dispatch(storedRefreshToken(''));
    localStorage.removeItem('user');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate(ROUTES.SIGN_IN, { replace: true });
  };
  return {
    user,
    login,
    logout,
  };
};

export default useAuth;
