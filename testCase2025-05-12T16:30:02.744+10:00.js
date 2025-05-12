const axios = require('axios');
const assert = require('assert');

Given('I attempt to process an unreferenced refund without the necessary permissions', async function () {
    try {
        await axios.post('/unreferenced/refund', { /* request data */ });
    } catch (error) {
        this.errorResponse = error.response;
    }
});

Then('I receive the message {string}', function (expectedMessage) {
    assert.strictEqual(this.errorResponse.data.message, expectedMessage);
});

Then('QA verifies specific error message is returned for unreferenced refunds without permissions', function () {
    assert.strictEqual(this.errorResponse.data.message, "Unreferenced refund not allowed. Please reissue.");
});

Given('I submit an unreferenced refund request without the merchant account configured', async function () {
    try {
        await axios.post('/unreferenced/refund', { /* request data */ });
    } catch (error) {
        this.errorResponse = error.response;
    }
});

Then('I should receive a {int} Forbidden response', function (statusCode) {
    assert.strictEqual(this.errorResponse.status, statusCode);
});

Given('I attempt to access an unreferenced refund endpoint without valid API keys', async function () {
    try {
        await axios.post('/unreferenced/refund', { /* request data */ }, { headers: { Authorization: 'InvalidAPIKey' } });
    } catch (error) {
        this.errorResponse = error.response;
    }
});

Then('I receive a {int} Unauthorized response', function (statusCode) {
    assert.strictEqual(this.errorResponse.status, statusCode);
});

Given('I send an improperly formatted request for an unreferenced refund', async function () {
    try {
        await axios.post('/unreferenced/refund', { /* incorrectly formatted data */ });
    } catch (error) {
        this.errorResponse = error.response;
    }
});

Then('the system returns {string} and a {int} status code', function (errorMessage, statusCode) {
    assert.strictEqual(this.errorResponse.data.message, errorMessage);
    assert.strictEqual(this.errorResponse.status, statusCode);
});

Given('there is a server error while processing an unreferenced refund', async function () {
    try {
        await axios.post('/unreferenced/refund', { /* request data that triggers server error */ });
    } catch (error) {
        this.errorResponse = error.response;
    }
});

Then('I should see a {string} message', function (errorMessage) {
    assert.strictEqual(this.errorResponse.data.message, errorMessage);
});

Then('QA checks for correct error response handling in case of server failures', function () {
    assert.strictEqual(this.errorResponse.status, 500);
});