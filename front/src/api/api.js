import axios from 'axios';
import jwt from 'jsonwebtoken';

export const post = async (url, body, additionalHeaders) => {
  try {
    let headers = {};
    if (additionalHeaders) {
      Object.entries(additionalHeaders).forEach(([name, value]) => {
        headers[`${name}`] = value;
      });
    }
    return await axios.post(url, headers, body);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getReviews = async (entityId) => {
  try {
    return await axios.get(`/reviews/get`, {
      params: {
        entityId,
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const likeEntity = async (action, entityId, entityType, token) => {
  try {
    return await axios({
      method: 'post',
      url: `/entities/like`,
      data: {
        action,
        entityId,
        entityType,
      },
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const checkLike = async (likeId, token) => {
  try {
    return await axios({
      method: 'post',
      url: `/entities/checkLike`,
      params: {
        entityId: likeId,
      },
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getEntities = async (entityType, entityId) => {
  try {
    return await axios.get(`/entities/get`, {
      params: {
        entityType,
        ...(entityId && { entityId }),
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const reviewOneEntity = async (
  entityType,
  entityId,
  comment,
  rating,
  token
) => {
  try {
    return await axios({
      method: 'patch',
      url: `/entities/review`,
      data: {
        entityId,
        entityType,
        comment,
        rating,
      },
      headers: {
        authorization: token,
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const searchEntities = async (entityType, searchText) => {
  try {
    return await axios.get(`/entities/search`, {
      params: {
        entityType,
        searchText,
      },
    });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const get = async (url, someBody, additionalHeaders) => {
  try {
    let headers = {};
    let body = {};
    if (additionalHeaders) {
      Object.entries(additionalHeaders).forEach(([name, value]) => {
        headers[`${name}`] = value;
      });
    }
    if (someBody) {
      Object.entries(someBody).forEach(([name, value]) => {
        body[`${name}`] = value;
      });
    }
    return await axios.get(url, { headers: headers, body: body });
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const patch = async (url, body, additionalHeaders) => {
  try {
    let headers = {};
    if (additionalHeaders) {
      Object.entries(additionalHeaders).forEach(([name, value]) => {
        headers[`${name}`] = value;
      });
    }
    return await axios.post(url, headers, body);
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

export const getUserInfo = (bearerToken) => {
  const userData = jwt.decode(bearerToken.split(' ')[1]);
  delete userData.exp;
  delete userData.iat;
  return userData;
};
