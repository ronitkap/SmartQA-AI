```javascript
import { test, expect } from '@playwright/test';

test.describe('Refund API Tests', () => {

  test('Scenario 1: Unreferenced Refund requested with role not enabled', async ({ request }) => {
    const response = await request.post('/payments', {
      data: { /* refundWithData */ },
      headers: { /* Add relevant headers */ },
    });

    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body).toEqual({
      title: "Business validation error",
      status: 422,
      type: "/problems/business-validation-failure",
      detail: "Invalid Data",
      instance: expect.any(String),
      violations: [
        {
          field: "authorization",
          message: "Unreferenced refunds are not permitted please re-issue as referenced refund"
        }
      ]
    });
  });

  test('Scenario 2: Referenced Refund or Payment requested with role not enabled', async ({ request }) => {
    const response = await request.post('/payments', {
      data: { /* referencedRefundOrPaymentData */ },
      headers: { /* Add relevant headers */ },
    });

    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body).toEqual({
      title: "Forbidden error",
      status: 403,
      type: "/problems/forbidden-error",
      detail: "Not allowed",
      instance: expect.any(String)
    });
  });

  test('Scenario 3: Unreferenced Refund requested successfully', async ({ request }) => {
    const response = await request.post('/payments', {
      data: { /* refundWithData */ },
      headers: { /* Add relevant headers */ },
    });

    expect(response.status()).toBe(200); // Adjust expected status if needed
    const body = await response.json();
    expect(body).toEqual({
      refundStatus: "Received",
      receiptNumber: "883590043303790G",
      refundReference: "refund for customer",
      originalReceiptNumber: "8835900433037AB"
    });
  });

});
```