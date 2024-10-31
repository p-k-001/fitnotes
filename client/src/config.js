export const baseApiUrl = 'http://localhost:3000';

export const endpoints = {
  workouts: {
    getAll: '/workouts',
    getById: (id) => `/workouts/${id}`,
    upload: '/workouts/upload',
    deleteAll: '/workouts/clear',
    deleteById: (id) => `/workouts/${id}`,
  },

  users: {
    getAll: '/users',
    getById: (id) => `/users/${id}`,
    register: '/users/register',
    login: '/users/login',
  },
};
