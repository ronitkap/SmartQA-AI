```javascript
const { Given, When, Then } = require('@cucumber/cucumber');
const axios = require('axios');
const assert = require('assert');

const BASE_URL = 'http://payment-gateway/api';

let response;

Given('the user submits an invalid card number', async () => {
    response = await axios.post(`${BASE_URL}/payment`, { cardNumber: 'invalid' });
});

Then('the Payment Gateway should return a transformed error message', () => {
    assert.strictEqual(response.status, 422);
    assert.strictEqual(response.data.message, 'Invalid card number.'); // expected error message
});

Given('the user submits a request without a card number', async () => {
    response = await axios.post(`${BASE_URL}/payment`, {});
});

Then('the Payment Gateway should return a 422 status with an appropriately formatted error message', () => {
    assert.strictEqual(response.status, 422);
    assert.strictEqual(response.data.message, 'Card number is required.'); // expected error message
});

Given('the user submits a valid payment request', async () => {
    response = await axios.post(`${BASE_URL}/payment`, { cardNumber: '4111111111111111', amount: 100 });
});

Then('the Payment Gateway should return a 200 OK status', () => {
    assert.strictEqual(response.status, 200);
});

Given('the user submits a payment request missing required fields', async () => {
    response = await axios.post(`${BASE_URL}/payment`, { amount: 100 });
});

Then('the response should return a 400 status code with a meaningful error message', () => {
    assert.strictEqual(response.status, 400);
    assert.strictEqual(response.data.message, 'Card number is required.'); // expected error message
});

Given('the user submits an unauthorized request to the Payment Gateway', async () => {
    response = await axios.post(`${BASE_URL}/payment`, {}, { headers: { Authorization: 'Bearer invalid-token' } });
});

Then('the response should return a 401 Unauthorized status', () => {
    assert.strictEqual(response.status, 401);
});

Given('the Payment Gateway encounters an unhandled exception', async () => {
    // Simulate a request that triggers an unhandled exception
    response = await axios.post(`${BASE_URL}/payment/error`, {});
});

Then('the response should result in a 500 Internal Server Error status', () => {
    assert.strictEqual(response.status, 500);
});
```