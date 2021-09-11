const assert = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-json-schema'));
const dataToken = require('../data/auth_data.json');
const env = require('dotenv').config();
var data = require('../test_data/data');
const page = require('../page/update_booking_page');
const code = require('../helper/response_code_message.json');
const schema = require('../data/schema/booking_schema.json');
const bookingID = require('./post_booking_test');
const { postToken } = require('../page/post_booking_page');
const testCase = {
  positive: {
    loginSuccess: 'As an User, I should be able to login',
    updateBooking: 'As an User, I should be able to update booking',
  },
  negative: {
    loginFailed:
      'As a User, I should get error when I input blank on username field',
  },
};
var token;

describe(`@UpdateTest`, () => {
  describe(`Positive Case Login`, () => {
    it(`@post ${testCase.positive.loginSuccess}`, async () => {
      const response = await postToken(dataToken);
      assert(response.status).to.equal(code.successOk);
      token = response.body.token;
    });
  });

  describe('Test Case for Update Booking', () => {
    it(`@put ${testCase.positive.updateBooking}`, async () => {
      const response = await page.updateBooking(
        JSON.parse(bookingID.id),
        token,
        data
      );
      assert(response.status).to.equal(code.successOk);
    });
  });
});
