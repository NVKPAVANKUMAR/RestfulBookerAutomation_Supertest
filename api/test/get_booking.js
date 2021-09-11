const assert = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-json-schema'));
const code = require('../helper/response_code_message.json');

const env = require('dotenv').config();

const { getUser } = require('../page/get_booking_page');
const schemaGetUser = require('../data/get_user_schema.json');

const testCase = {
  positive: {
    getUserSuccess: 'As an User, I should be able to get user list',
  },
  negative: {
    getUserNotFound:
      'As an User, I should get error when I request get for not found user',
  },
};

let userID;

describe(`@getUserTest`, () => {
  describe(`Positive Case get User`, () => {
    it(`@get ${testCase.positive.getUserSuccess}`, async () => {
      userID = process.env.VALID_BOOKING_ID;
      const response = await getUser(userID);
      assert(response.status).to.equal(code["i'm teapot"]);
    });
  });

  describe(`Negative Case Get User`, () => {
    it(`@get ${testCase.negative.getUserNotFound}`, async () => {
      userID = process.env.INVALID_BOOKING_ID;
      const getUserResponse = await getUser(userID);
      assert(getUserResponse.status).to.equal(404);
    });
  });
});
