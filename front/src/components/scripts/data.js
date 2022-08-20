import {
  checkLike,
  getEntities,
  getReviews,
  likeEntity,
  reviewOneEntity,
  searchEntities,
} from '../../api/api.js';

export const fetchAllEnt = async (dataName, entityId) => {
  try {
    const response = await getEntities(dataName, entityId);
    if (!entityId)
      localStorage.setItem(
        dataName.toLowerCase(),
        JSON.stringify(response.data)
      );
    else localStorage.setItem('entity', JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const fetchReviews = async (entityId) => {
  try {
    const response = await getReviews(entityId);
    localStorage.setItem(`reviews`, JSON.stringify(response.data));
  } catch (error) {
    console.log(error);
  }
};

export const likeEntities = async (entityType, entityId, token) => {
  if (!checkLoggedIn()) {
    alert('Please login');
    return;
  }
  try {
    const response = await checkLike(entityId, token);
    const liked = response.data.liked;
    const responseT = await likeEntity(
      liked ? 'UNLIKE' : 'LIKE',
      entityId,
      entityType,
      token
    );
    localStorage.setItem('entity', JSON.stringify(responseT.data));
    return responseT.data;
  } catch (error) {
    alert(error.message);
  }
};

export const reviewEntities = async (
  entityId,
  entityType,
  rating,
  comment,
  token
) => {
  if (!checkLoggedIn()) {
    alert('Please login');
    return;
  }
  try {
    const response = await reviewOneEntity(
      entityType,
      entityId,
      comment,
      rating,
      token
    );
    localStorage.setItem('entity', JSON.stringify(response.data));
    return response.data;
  } catch (error) {
    console.log(error);
    alert(error.message);
  }
};

export const filterEntities = async (entityType, text) => {
  try {
    const response = await searchEntities(entityType, text);
    localStorage.setItem(
      entityType.toLowerCase(),
      JSON.stringify(response.data)
    );
  } catch (error) {
    console.log(error);
  }
};

export const setSelected = (elementId) => {
  try {
    document
      .getElementById(elementId)
      .setAttribute('style', 'color: rgb(255,7,110)');
    localStorage.setItem('current_tab', elementId.split('_')[0].toUpperCase());
  } catch (error) {
    console.log(error);
  }
};

export const determineEntityType = (object) => {
  const keys = Object.keys(object);
  if (keys.includes('director')) return 'MOVIE';
  if (keys.includes('author')) return 'BOOK';
  if (keys.includes('artist')) return 'SONG';
};

export const calculateDuration = (object, entityType) => {
  if (entityType === 'MOVIE') {
    const hours = Math.floor(object.duration / 60).toFixed(0);
    const minutes = object.duration % 60;
    return `${hours}h ${minutes}min`;
  }
  if (entityType === 'SONG') {
    const minutes = Math.floor(object.duration / 60).toFixed(0);
    const seconds = object.duration % 60;
    return `${minutes}min ${seconds}sec`;
  }
};

export const getAllEntitiesIntoOne = async () => {
  try {
    const entityList = ['MOVIE', 'SONG', 'BOOK'];
    const arr = [];
    for (const type of entityList) {
      const response = await getEntities(type);
      response.data.forEach((entity) => {
        arr.push(entity);
      });
    }
    localStorage.setItem('all_entities', JSON.stringify(shuffle(arr)));
  } catch (error) {
    console.log(error);
  }
};

export const checkLoggedIn = () => {
  return localStorage.getItem('token') ? true : false;
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};
