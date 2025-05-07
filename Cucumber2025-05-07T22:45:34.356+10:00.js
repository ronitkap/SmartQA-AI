Here's a set of Cucumber.js step definitions that implement the scenarios based on the provided acceptance criteria:

```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

const baseURL = 'http://your-payment-gateway-url'; // replace with actual URL
let response;

Given('an invalid card number is submitted', async function () {
  this.requestData = {
    cardNumber: 'invalid_card_number', // specify an invalid card number
    // other required fields
  };
});

When('the payment request is made', async function () {
  response = await axios.post(`${baseURL}/payment`, this.requestData);
});

Then('a transformed error message is returned following REST standards', function () {
  assert.strictEqual(response.status, 422);
  assert.ok(response.data.errorMessage); // Add specific checks against your expected error message structure
});

Given('the card number is missing or invalid', async function () {
  this.requestData = {
    // omit cardNumber or set it to invalid 
  };
});

Then('a 422 status is returned with an appropriately formatted error message', function () {
  assert.strictEqual(response.status, 422);
  assert.ok(response.data.errorMessage);
});

Given('valid payment details are submitted', async function () {
  this.requestData = {
    cardNumber: 'valid_card_number', // specify a valid card number
    // other required fields
  };
});

Then('a 200 OK status is returned', function () {
  assert.strictEqual(response.status, 200);
});

Given('the request is missing required fields', async function () {
  this.requestData = {
    // omit required fields
  };
});

Then('a 400 status code is returned with a meaningful error message', function () {
  assert.strictEqual(response.status, 400);
  assert.ok(response.data.errorMessage); // Add specific checks against your expected error message structure
});

Given('an unauthorized request is made to the Payment Gateway', async function () {
  this.requestData = {
    // Add necessary data for unauthorized access
  };
  // Typically, this would involve not passing an auth token
});

Then('a 401 Unauthorized status is returned', function () {
  assert.strictEqual(response.status, 401);
});

When('an unhandled exception occurs in the Payment Gateway', async function () {
  // This may require setting up the backend to force an exception for the test case, or mocking
});

Then('a 500 Internal Server Error status is returned', function () {
  assert.strictEqual(response.status, 500);
});
```

Note: 
- Modify the `baseURL` and the request body (`this.requestData`) according to your actual API specifications.
- Ensure that your test cases are running against a proper testing environment.