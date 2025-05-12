const axios = require('axios');
const { Given, When, Then } = require('cucumber');
const assert = require('assert');

const API_URL = 'https://your.api.endpoint'; // Replace with actual API endpoint
let response;

Given('the user attempts to process an unreferenced refund without the necessary permissions', async () => {
  response = await axios.post(`${API_URL}/refunds/unreferenced`, {}, { headers: { 'Authorization': 'Bearer invalid_token' } });
});

Then('the system shall provide a specific error message', () => {
  assert.strictEqual(response.data.message, 'Unreferenced refund not allowed. Please reissue.');
});

Given('the user submits an unreferenced refund request without the merchant account configured', async () => {
  response = await axios.post(`${API_URL}/refunds/unreferenced`, { amount: 100 });
});

Then('the system must return a 403 Forbidden status', () => {
  assert.strictEqual(response.status, 403);
});

Given('the user attempts to access the unreferenced refund endpoint without valid API keys', async () => {
  response = await axios.post(`${API_URL}/refunds/unreferenced`, {}, { headers: { 'Authorization': 'Bearer invalid_token' } });
});

Then('the system must return 401 Unauthorized', () => {
  assert.strictEqual(response.status, 401);
});

Given('the user sends an improperly formatted request for an unreferenced refund', async () => {
  response = await axios.post(`${API_URL}/refunds/unreferenced`, { invalid: 'data' });
});

Then('the system shall handle invalid requests with a descriptive error message', () => {
  assert.strictEqual(response.data.message, 'Invalid Data - Ensure correct formatting');
  assert.strictEqual(response.status, 422);
});

Given('the user triggers a server error while processing an unreferenced refund', async () => {
  // Assuming a specific endpoint that simulates a server error
  response = await axios.post(`${API_URL}/refunds/unreferenced/server-error`);
});

Then('the system shall return a 500 status code for internal server errors', () => {
  assert.strictEqual(response.status, 500);
});