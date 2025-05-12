import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import assert from 'assert';

const BASE_URL = 'https://your-api-url.com';

Given('I have an unreferenced refund request without permissions', function () {
    this.request = {
        // unreferenced refund request data without proper permissions
    };
});

When('I submit the unreferenced refund request', async function () {
    try {
        this.response = await axios.post(`${BASE_URL}/unreferenced-refund`, this.request);
    } catch (error) {
        this.response = error.response;
    }
});

Then('I should receive an error message {string}', function (expectedMessage) {
    assert.equal(this.response.data.message, expectedMessage);
});

Then('I should receive a {int} Forbidden status', function (expectedStatus) {
    assert.equal(this.response.status, expectedStatus);
});

Given('I have an unreferenced refund request with an unconfigured account', function () {
    this.request = {
        // unreferenced refund request data with an unconfigured merchant account
    };
});

Then('I should receive a {int} Unauthorized status', function (expectedStatus) {
    assert.equal(this.response.status, expectedStatus);
});

Given('I have an improperly formatted unreferenced refund request', function () {
    this.request = {
        // improperly formatted request data
    };
});

Then('I should receive a {int} status code for invalid data', function (expectedStatus) {
    assert.equal(this.response.status, expectedStatus);
});

Then('I should see a message {string} for invalid data', function (expectedMessage) {
    assert.equal(this.response.data.message, expectedMessage);
});

Given('I have a request that causes a server error', function () {
    this.request = {
        // data that causes server error
    };
});

When('I submit the server error request', async function () {
    try {
        this.response = await axios.post(`${BASE_URL}/unreferenced-refund`, this.request);
    } catch (error) {
        this.response = error.response;
    }
});

Then('I should receive a {int} Internal Server Error status', function (expectedStatus) {
    assert.equal(this.response.status, expectedStatus);
});