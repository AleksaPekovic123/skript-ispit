import axios from 'axios';
import { getUserInfo, post } from '../../api/api.js';

const signUp = async (credentials, router) => {
  try {
    const responseData = await axios({
      method: 'post',
      url: `/auth/register`,
      data: { userInfo: credentials },
    });
    const userData = getUserInfo(responseData.data);
    localStorage.setItem('user-info', JSON.stringify(userData));
    localStorage.setItem('token', JSON.stringify(responseData.data));
    router.push('/');
  } catch (error) {
    alert(error.message);
  }
};

export default signUp;
