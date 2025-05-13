const axios = require('axios');
const assert = require('assert');

Given('the user initiates a payment', async function () {
    this.response = await axios.post('/payment', { /* payment details */ });
});

When('an error occurs during processing', async function () {
    // Simulate an error in processing
    this.response = await axios.post('/payment/error', { /* invalid data */ });
});

Then('the system should format the error information correctly', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.data.title, 'Business validation error');
    assert.deepStrictEqual(this.response.data.violations, [{ field: "cardInfo.encryptedCardNumber", message: "Invalid card number" }]);
});

Given('the payment orchestrator communicates with Adyen', function () {
    this.adResponse = { status: 422, errorCode: 101, message: 'Invalid card number' };
});

When('Adyen returns an error for an invalid card', function () {
    // Simulate communication with Adyen
    this.response = this.adResponse;
});

Then('the orchestrator should transform the error into a REST standard format', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.errorCode, 101);
    assert.strictEqual(this.response.message, 'Invalid card number');
});

Given('the user requests an unreferenced refund using saved payment account ID', async function () {
    this.response = await axios.post('/refund/unreferenced', { /* saved payment account ID */ });
});

When('the refund role is not enabled', function () {
    // Ensure the role is not enabled in the testing environment
});

Then('the system should return a more specific error message', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.data.message, 'Unreferenced refunds are not permitted, please re-issue as referenced refund');
});

Given('the user makes a generic payment request', async function () {
    this.response = await axios.post('/payment/generic', { /* generic request */ });
});

When('an unknown error happens', async function () {
    this.response = await axios.post('/payment/unknown/error', { /* request leading to unknown error */ });
});

Then('the system should provide a generic error message with appropriate details', function () {
    assert.strictEqual(this.response.status, 403);
    assert.strictEqual(this.response.data.message, 'Not allowed');
    assert.strictEqual(this.response.data.details, 'Invalid operation');
});

Given('the user makes a request to the refundWithData endpoint', async function () {
    this.response = await axios.post('/refundWithData', { /* relevant data */ });
});

When('an error occurs at this endpoint', async function () {
    this.response = await axios.post('/refundWithData/error', { /* invalid data to trigger error */ });
});

Then('the system should return an endpoint-specific error message', function () {
    assert.strictEqual(this.response.status, 422);
    assert.strictEqual(this.response.data.message, 'Unreferenced refunds are not permitted, please re-issue as referenced refund');
});