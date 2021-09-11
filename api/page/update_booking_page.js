const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL);

const updateBooking = (idBooking, token, payload) =>
  api
    .put(`/booking/${idBooking}`)
    .set('Cookie', 'token=' + token)
    .set('Content-Type', 'application/json')
    .set('Accept', 'application/json')
    .send(payload);
module.exports = {
  updateBooking,
};
