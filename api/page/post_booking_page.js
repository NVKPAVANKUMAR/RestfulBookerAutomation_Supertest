const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL);

//Hit API Login
const postLogin = (credentials) =>
  api
    .post('/api/login')
    .set('Content-Type', 'application/json')
    .send(credentials);

const postToken = (payload) =>
  api.post('/auth').set('Content-Type', 'application/json').send(payload);

const postBooking = (payload) =>
  api
    .post('/booking')
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(payload);

module.exports = {
  postLogin,
  postBooking,
  postToken,
};
