```javascript
import { test, expect } from '@playwright/test';

test.describe('Gateway Service Error Handling', () => {
  
  test('should transform Adyen error into a REST standard format', async ({ request }) => {
    const response = await request.post('/your-endpoint', {
      data: {
        // your request payload here
      },
    });

    expect(response.status()).toBe(422);
    const responseBody = await response.json();
    
    expect(responseBody).toEqual({
      status: 422,
      errorCode: "101",
      message: "Invalid card number",
      errorType: "validation",
      pspReference: "F7WCWRG6JPHR8HG2",
    });
  });

  test('should return business validation error in REST format', async ({ request }) => {
    const response = await request.post('/your-endpoint', {
      data: {
        // your request payload here
      },
    });

    expect(response.status()).toBe(422);
    const responseBody = await response.json();

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