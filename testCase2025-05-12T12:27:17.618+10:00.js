```javascript
const axios = require('axios');
const { Given, When, Then } = require('cucumber');
const assert = require('assert');

const apiUrl = 'http://your-payment-gateway-url.com/api'; // Replace with your actual API URL

Given('a request with invalid card number', async function () {
    this.response = await axios.post(`${apiUrl}/payment`, {
        cardNumber: '1234567890123456', // Invalid card number
    }).catch(error => {
        this.response = error.response;
    });
});

Then('the Payment Gateway should return a transformed error message', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.data.message, 'Transformed error message');
});

Given('a request with missing card number', async function () {
    this.response = await axios.post(`${apiUrl}/payment`, {
        // No card number
    }).catch(error => {
        this.response = error.response;
    });
});

Then('the response should return a 422 status', function () {
    assert.strictEqual(this.response.status, 422);
});

Given('a request with valid payment details', async function () {
    this.response = await axios.post(`${apiUrl}/payment`, {
        cardNumber: '4012888888881881', // Valid card number
        amount: 1000,
    });
});

Then('the Payment Gateway should return a 200 OK status', function () {
    assert.strictEqual(this.response.status, 200);
});

Given('a request missing required fields', async function () {
    this.response = await axios.post(`${apiUrl}/payment`, {
        // Missing card number
        amount: 1000,
    }).catch(error => {
        this.response = error.response;
    });
});

Then('the response should return a 400 status code', function () {
    assert.strictEqual(this.response.status, 400);
    assert.strictEqual(this.response.data.message, 'Meaningful error message');
});

Given('an unauthorized request to the Payment Gateway', async function () {
    this.response = await axios.post(`${apiUrl}/payment`, {
        cardNumber: '4012888888881881',
        amount: 1000,
    }, {
        headers: { 'Authorization': 'Bearer InvalidToken' }
    }).catch(error => {
        this.response = error.response;
    });
});

Then('it should return a 401 Unauthorized status', function () {
    assert.strictEqual(this.response.status, 401);
});

Given('a scenario resulting in an unhandled exception', async function () {
    this.response = await axios.post(`${apiUrl}/payment`, {
        cardNumber: 'invalid_data',
    }).catch(error => {
        this.response = error.response;
    });
});

Then('it should return a 500 Internal Server Error status', function () {
    assert.strictEqual(this.response.status, 500);
});
```