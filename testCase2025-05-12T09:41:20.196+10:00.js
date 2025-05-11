```javascript
const axios = require('axios');
const { Given, When, Then } = require('@cucumber/cucumber');
const assert = require('assert');

const apiUrl = 'http://your-api-url.com/payment-gateway';

Given('the user submits an invalid card number', async function () {
    this.response = await axios.post(apiUrl, { cardNumber: 'invalid' });
});

When('the user submits a payment request with missing or invalid card number', async function () {
    this.response = await axios.post(apiUrl, { cardNumber: '' });
});

When('the user submits a valid payment request', async function () {
    this.response = await axios.post(apiUrl, { cardNumber: '4111111111111111' });
});

When('the user submits a payment request with missing required fields', async function () {
    this.response = await axios.post(apiUrl, {});
});

When('the user submits an unauthorized request', async function () {
    this.response = await axios.post(apiUrl, {}, { headers: { Authorization: 'invalid-token' } });
});

When('an unhandled exception occurs', async function () {
    // Implement logic to trigger an unhandled exception
});

Then('the Payment Gateway should return a transformed error message', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.data.message, 'Transformed error message');
});

Then('the response should return a 422 status', function () {
    assert.strictEqual(this.response.status, 422);
});

Then('the Payment Gateway should return a 200 OK status', function () {
    assert.strictEqual(this.response.status, 200);
});

Then('the response should return a 400 status code with a meaningful error message', function () {
    assert.strictEqual(this.response.status, 400);
    assert.strictEqual(this.response.data.message, 'Missing required fields');
});

Then('the response should return a 401 Unauthorized status', function () {
    assert.strictEqual(this.response.status, 401);
});

Then('the response should result in a 500 Internal Server Error status', function () {
    assert.strictEqual(this.response.status, 500);
});
```