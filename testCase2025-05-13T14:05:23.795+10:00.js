const axios = require('axios');
const assert = require('assert');

Given('I have valid payment details', async function () {
    this.paymentDetails = {
        cardNumber: '4111111111111111',
        expirationDate: '12/25',
        cvv: '123'
    };
});

When('I submit the payment request', async function () {
    const response = await axios.post('/api/payment', this.paymentDetails);
    this.response = response.data;
});

Then('I should receive a 200 OK response with payment confirmation details', function () {
    assert.strictEqual(this.response.status, 200);
    assert.strictEqual(this.response.message, 'Payment processed successfully');
});

Given('I have an invalid card number', async function () {
    this.paymentDetails = {
        cardNumber: '1234567890123456',
        expirationDate: '12/25',
        cvv: '123'
    };
});

Then('I should receive a 422 response with validation error details', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.title, 'Business validation error');
    assert.strictEqual(this.response.detail, 'Invalid Data');
    assert.strictEqual(this.response.violations[0].field, 'cardInfo.encryptedCardNumber');
    assert.strictEqual(this.response.violations[0].message, 'Invalid card number');
});

Given('the merchant account is not configured for unreferenced refunds', async function () {
    // Setup the environment for this scenario
});

When('I attempt to process an unreferenced refund', async function () {
    const response = await axios.post('/api/refund/unreferenced', {});
    this.response = response.data;
});

Then('I should receive a 403 Forbidden error response', function () {
    assert.strictEqual(this.response.status, 403);
    assert.strictEqual(this.response.message, 'Not allowed');
});

Given('the unreferenced refund role is not enabled', async function () {
    // Setup the environment for this scenario
});

When('I submit a refund request without a receipt number', async function () {
    const response = await axios.post('/api/refund/unreferenced', { receiptNumber: null });
    this.response = response.data;
});

Then('I should receive a 422 response with specific error message', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.message, 'Unreferenced refunds are not permitted please re-issue as referenced refund');
});

Given('the request is received from a third-party provider', async function () {
    // Setup the environment for this scenario
});

When('I attempt to process the request', async function () {
    const response = await axios.post('/api/payment/third-party', {});
    this.response = response.data;
});

Then('I should receive a 403 Forbidden error response', function () {
    assert.strictEqual(this.response.status, 403);
    assert.strictEqual(this.response.message, 'Not allowed');
});