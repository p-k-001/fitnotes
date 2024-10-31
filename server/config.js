const endpoints = {
  workouts: {
    getAll: '/',
    getById: (id) => `/${id}`,
    upload: '/upload',
    deleteAll: '/clear',
    deleteById: (id) => `/${id}`,
  },

  users: {
    getAll: '/users',
    getById: (id) => `/users/${id}`,
    register: '/users/register',
    login: '/users/login',
  },
};

module.exports = { endpoints };
