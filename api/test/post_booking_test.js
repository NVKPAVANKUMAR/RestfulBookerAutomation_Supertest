const assert = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-json-schema'));
const dataToken = require('../data/auth_data.json');
const env = require('dotenv').config();
var data = require('../test_data/data');
const page = require('../page/post_booking_page');
const code = require('../helper/response_code_message.json');
const schema = require('../data/schema/booking_schema.json');

const testCase = {
  positive: {
    loginSuccess: 'As an User, I should be able to login',
    postBooking: 'As an User, I should be able to create booking',
  },
  negative: {
    loginFailed:
      'As a User, I should get error when I input blank on username field',
  },
};
var bookingID;
let credentials;

describe(`@postLoginTest`, () => {
  describe(`Positive Case Login`, () => {
    it(`@post ${testCase.positive.loginSuccess}`, async () => {
      const response = await page.postToken(dataToken);
      assert(response.status).to.equal(code.successOk);
      token = response.body.token;
    });
  });

  describe('Test Case for Post Booking', () => {
    it(`@post ${testCase.positive.postBooking}`, async () => {
      const response = await page.postBooking(data);
      assert(response.status).to.equal(code.successOk);
      assert(response.body).to.be.jsonSchema(schema);
      bookingID = response.body.bookingid;
      exports.id = bookingID;
    });
  });

  describe(`Negative Case Login`, () => {
    it(`@post ${testCase.negative.loginFailed}`, async () => {
      credentials = {
        email: '',
        password: process.env.USER_PASSWORD,
      };
      const loginResponse = await page.postToken(credentials);
      assert(loginResponse.status).to.equal(200);
      assert(loginResponse.body.reason).to.equal('Bad credentials');
    });
  });
});
