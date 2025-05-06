```javascript
import { test, expect } from '@playwright/test';

const baseURL = 'https://api.adyen.com'; // Replace with your API base URL

test.describe('Adyen Refund API Tests', () => {

  test('Test 01: Unreferenced Refund when API role is not enabled', async ({ request }) => {
    const response = await request.post(`${baseURL}/payments`, {
      data: {
        // Add request payload for unreferenced refund
      }
    });
    
    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      title: "Business validation error",
      status: 422,
      type: "/problems/business-validation-failure",
      detail: "Invalid Data",
      instance: "/traceId/b150e2a3-ed4d-462c-ada1-18a0b65d50f3",
      violations: [{
        field: "authorization",
        message: "Unreferenced refunds are not permitted please re-issue as referenced refund"
      }]
    });
  });

  test('Test 02: Referenced Refund or Payment when API role is not enabled', async ({ request }) => {
    const response = await request.post(`${baseURL}/payments`, {
      data: {
        // Add request payload for referenced refund or payment
      }
    });
    
    expect(response.status()).toBe(403);
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      title: "Forbidden error",
      status: 403,
      type: "/problems/forbidden-error",
      detail: "Not allowed",
      instance: "/traceId/d79fe0e6-7d1b-4cae-be29-9dd939b3e5b2"
    });
  });

  test('Test 03: Unreferenced Refund when successful', async ({ request }) => {
    const response = await request.post(`${baseURL}/payments`, {
      data: {
        // Add request payload for successful unreferenced refund
      }
    });
    
    expect(response.status()).toBe(200); // Adjust status as per the successful response if needed
    const responseBody = await response.json();
    expect(responseBody).toEqual({
      refundStatus: "Received",
      receiptNumber: "883590043303790G",
      refundReference: "refund for customer",
      originalReceiptNumber: "8835900433037AB"
    });
  });

});
```