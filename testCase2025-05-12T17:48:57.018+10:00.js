import { Given, When, Then } from '@cucumber/cucumber';
import axios from 'axios';
import { expect } from 'chai';

const API_URL = 'https://your-api-endpoint.com'; 

Given('the user submits a payment of {int} for a {int} premium', async function (paymentAmount, premiumAmount) {
    this.response = await axios.post(`${API_URL}/payment`, { amount: paymentAmount });
});

Then('the system should approve the payment', function () {
    expect(this.response.status).to.equal(200);
});

Given('the user selects to update their payment method', function () {
    // Initiate action for updating payment method, assume 2FA is required
});

When('the user completes two-factor authentication', async function () {
    this.response = await axios.post(`${API_URL}/updatePaymentMethod`, { /* authentication details */ });
});

Then('the system allows the user to update the payment method', function () {
    expect(this.response.status).to.equal(200);
});

When('the system encrypts payment data', function () {
    // Simulate or check encryption logic, not directly testable via a request
});

Then('the payment data encryption meets PCI-DSS requirements', function () {
    // Validation for compliance, could be a mock call or a property check
});

Given('the user is an authenticated policyholder', function () {
    // Set user as authenticated, possibly by mocking session
});

When('the user requests their transaction history', async function () {
    this.response = await axios.get(`${API_URL}/transactionHistory`);
});

Then('the system should return the transaction history', function () {
    expect(this.response.status).to.equal(200);
    expect(this.response.data).to.be.an('array');
});

Given('the user submits a payment request with missing card information', async function () {
    this.response = await axios.post(`${API_URL}/payment`, { /* missing card info */ });
});

Then('the system should respond with a 400 error', function () {
    expect(this.response.status).to.equal(400);
});