const assert = require('chai').expect;
const chai = require('chai');
chai.use(require('chai-json-schema'));
const code = require('../helper/response_code_message.json');
const env = require('dotenv').config();
const page = require('../page/delete_booking_page');
const bookingID = require('./post_booking_test');
const updatePage = require('../test/update_booking_test');
const testCaseDelete = {
  positive: {
    deleteBookingID:
      'As an User, I should be able to delete booking according to the ID',
  },
  negative: {
    invalidID:
      'As an User, I should not be able to delete booking if the ID provided is invalid',
    invalidToken:
      'As an User, I should not be able to delete booking if the token is invalid',
  },
};

let invalidToken = process.env.INVALID_TOKEN;
let invalidBookingID = process.env.INVALID_BOOKING_ID;

describe('Test Case for Delete Booking', () => {
  it(`@delete ${testCaseDelete.positive.deleteBookingID}`, async () => {
    const response = await page.deleteBooking(JSON.parse(bookingID.id), token);
    assert(response.status).to.equal(code.successProcess);
  });

  it(`@delete ${testCaseDelete.negative.invalidToken}`, async () => {
    const response = await page.deleteBooking(bookingID, invalidToken);
    assert(response.status).to.equal(
      code.failedForbiddenInvalidToken.codeNumber
    );
  });

  it(`@delete ${testCaseDelete.negative.invalidID}`, async () => {
    const response = await page.deleteBooking(invalidBookingID, token);
    assert(response.status).to.equal(code.failedMethodNotAllowed.codeNumber);
  });
});
