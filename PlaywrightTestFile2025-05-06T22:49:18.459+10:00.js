```javascript
import { test, expect } from '@playwright/test';

test.describe('Gateway Service Error Handling', () => {
  
  test('should transform Adyen error code and description to REST standard format', async ({ request }) => {
    const response = await request.post('/api/payment', {
      data: {
        // payment data here
      }
    });
    
    const responseBody = await response.json();
    expect(response.status()).toBe(422);
    expect(responseBody).toEqual({
      status: 422,
      errorCode: "101",
      message: "Invalid card number",
      errorType: "validation",
      pspReference: "F7WCWRG6JPHR8HG2"
    });
  });

  test('should return business validation error with detailed instance and violations', async ({ request }) => {
    const response = await request.post('/api/payment', {
      data: {
        // payment data here
      }
    });
    
    const responseBody = await response.json();
    expect(response.status()).toBe(422);
    expect(responseBody).toEqual({
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
    });
  });
});
```