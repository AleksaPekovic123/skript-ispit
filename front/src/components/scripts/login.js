import { getUserInfo, post } from '../../api/api.js';

const login = async (credentials, router) => {
  try {
    const responseData = await post(`/auth/login`, {}, credentials);
    const userData = getUserInfo(responseData.data);
    localStorage.setItem('user-info', JSON.stringify(userData));
    localStorage.setItem('token', JSON.stringify(responseData.data));
    router.push('/');
  } catch (error) {
    alert(error.message);
  }
};

export default login;
