const API_URL = 'https://technical-share-20.herokuapp.com/v1';
const HTTP_METHODS = { GET: 'GET', POST: 'POST', PATCH: 'PATCH', PUT: 'PUT', DELETE: 'DELETE' };

function setFetchConfig(method, body) {
  return {
    method,
    headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
    body: body ? body : undefined
  }
}

async function getCategories(nameToQuery) {
  const config = setFetchConfig(HTTP_METHODS.GET);
  const searchString = nameToQuery ? `?name=${nameToQuery}` : '';

  return await fetch(`${API_URL}/categories${searchString}`, config)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.warn('Error on getCategories: ', err));
}

async function findCategory(categoryId) {
  const config = setFetchConfig(HTTP_METHODS.GET);

  if (categoryId) {
    return await fetch(`${API_URL}/categories/${categoryId}`, config)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.warn('Error on findCategory: ', err));
  }

  return console.warn('Category ID is required');
}

async function findUsersByCategory(categoryId) {
  const config = setFetchConfig(HTTP_METHODS.GET);

  if (categoryId) {
    return await fetch(`${API_URL}/categories/${categoryId}/users`, config)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.warn('Error on findUsersByCategory: ', err));
  }

  return console.warn('Category ID is required');
}

async function getUsers() {
  const config = setFetchConfig(HTTP_METHODS.GET);

  return await fetch(`${API_URL}/users`, config)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.warn('Error on getUsers: ', err));
}

async function findUserById(userId) {
  const config = setFetchConfig(HTTP_METHODS.GET);

  if (userId) {
    return await fetch(`${API_URL}/users/${userId}`, config)
      .then(response => response.json())
      .then(data => data)
      .catch(err => console.warn('Error on findUserById: ', err));
  }

  return console.warn('User ID is required');
}

async function createUser({ name, email, password }) {
  const config = setFetchConfig(HTTP_METHODS.POST, JSON.stringify({ name, email, password }));

  return await fetch(`${API_URL}/users`, config)
    .then(response => response.json())
    .then(data => data)
    .catch(err => console.warn('Error on createUser: ', err));
}