const supertest = require('supertest');
const env = require('dotenv').config();

const api = supertest(process.env.BASE_URL);

const deleteBooking = (idBooking, token) =>
  api.delete(`/booking/${idBooking}`).set('Cookie', 'token=' + token);
module.exports = {
  deleteBooking,
};
