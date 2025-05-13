import axios from 'axios';
import { expect } from 'chai';

const API_URL = 'https://your-api-url.com'; // Change to your actual API endpoint

Given('I have valid payment details', async function () {
    this.payload = {
        cardInfo: {
            encryptedCardNumber: 'validCardNumber'
        },
        amount: 1000 // example amount
    };
});

When('I submit the payment request', async function () {
    this.response = await axios.post(`${API_URL}/payments`, this.payload);
});

Then('I should receive a {int} OK response with payment confirmation details', function (statusCode) {
    expect(this.response.status).to.equal(statusCode);
    expect(this.response.data.message).to.equal('Payment processed successfully');
});

Given('I have an invalid card number', async function () {
    this.payload = {
        cardInfo: {
            encryptedCardNumber: 'invalidCardNumber'
        },
        amount: 1000 // example amount
    };
});

Then('I should receive a {int} response with validation error details', function (statusCode) {
    expect(this.response.status).to.equal(statusCode);
    expect(this.response.data.title).to.equal('Business validation error');
    expect(this.response.data.detail).to.equal('Invalid Data');
});

Given('the merchant account is not configured for unreferenced refunds', function () {
    this.payload = {
        refundType: 'unreferenced',
        // other required fields
    };
});

When('I attempt to process an unreferenced refund', async function () {
    this.response = await axios.post(`${API_URL}/refunds`, this.payload);
});

Then('I should receive a {int} Forbidden error response', function (statusCode) {
    expect(this.response.status).to.equal(statusCode);
    expect(this.response.data.message).to.equal('Not allowed');
});

Given('the unreferenced refund role is not enabled', function () {
    this.payload = {
        // required fields
    };
});

When('I submit a refund request without a receipt number', async function () {
    this.response = await axios.post(`${API_URL}/refunds`, this.payload);
});

Then('I should receive a {int} response with specific error message', function (statusCode) {
    expect(this.response.status).to.equal(statusCode);
    expect(this.response.data.message).to.equal('Unreferenced refunds are not permitted please re-issue as referenced refund');
});

Given('the request is received from a third-party provider', function () {
    this.payload = {
        // example request data
    };
});

When('I attempt to process the request', async function () {
    this.response = await axios.post(`${API_URL}/third-party/payments`, this.payload);
});