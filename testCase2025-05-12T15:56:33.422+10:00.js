```javascript
const axios = require('axios');
const assert = require('assert');

Given('a request to process payment', async function () {
    this.requestPayload = {}; // Populate with request data
});

When('a payment error occurs from Adyen', async function () {
    try {
        // Simulate request to the payment gateway
        await axios.post('YOUR_API_ENDPOINT', this.requestPayload);
    } catch (error) {
        this.errorResponse = error.response.data;
    }
});

Then('the system should format the error message according to REST standards', function () {
    const expectedResponse = {
        title: "Business validation error",
        status: 422,
        type: "/problems/business-validation-failure",
        detail: "Invalid Data",
        instance: "/traceId/32a07189-5012-4e27-b56a-effc70a2488b",
        violations: [
            {
                field: "cardInfo.encryptedCardNumber",
                message: "Invalid card number"
            }
        ]
    };

    assert.deepStrictEqual(this.errorResponse, expectedResponse);
});

Given('a request sent to {string}', async function (service) {
    this.service = service;
    this.requestPayload = {}; // Populate with request data
});

When('validated through SERVICES', async function () {
    // Implement service validation logic
});

Then('the request should be routed to payment orchestrator BFF, payment gateway, and payment data', function () {
    const expectedResponse = {
        services: [
            "PAYMENT_ORCHESTRATOR_BFF",
            "PAYMENT_GATEWAY",
            "PAYMENT_DATA"
        ],
        scope: "BATCH"
    };

    assert.deepStrictEqual(this.response, expectedResponse);
});

Given('no changes in PAYMENT MFE', async function () {
    // Setup logic
});

When('this feature is requested', async function () {
    // Implement request logic
});

Then('it should return a {string} status of {string}', function (field, status) {
    // Implement validation logic
});

Given('no changes in Orchestrator BFF', async function () {
    // Setup logic
});

When('validation occurs', async function () {
    // Implement validation logic
});

Given('a request for changes in Payment Gateway', async function () {
    // Setup logic
});

When('validated for testing requirements', async function () {
    // Implement validation logic
});

Given('an error from Adyen', async function () {
    // Setup logic
});

When('an error occurs with a status of {int}', async function (status) {
    // Simulate error handling logic
});

Then('the error should be transformed to a standard REST format showing the appropriate error message', function () {
    // Implement transformation validation logic
});

Given('a request that results in an error', async function () {
    // Setup logic
});

When('the error is captured', async function () {
    // Implement error capturing logic
});

Then('the system should return a context-appropriate error message indicating the specific endpoint where the error occurred', function () {
    // Implement error message validation logic
});

Given('that the operation for a payment error is known', async function () {
    // Setup logic
});

When('an error occurs with a specified operation', async function () {
    // Simulate specific operation error
});

Then('the response should reflect the correct error message based on the operation', function () {
    // Implement response validation logic
});
```