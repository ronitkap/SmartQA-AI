```javascript
import { test, expect } from '@playwright/test';

test.describe('Gateway Service Error Transformation', () => {
  
  test('should transform Adyen error code 101 for invalid card number', async ({ request }) => {
    const response = await request.post('/your-endpoint', {
      data: {
        cardInfo: {
          encryptedCardNumber: 'invalid-card-number'
        }
      }
    });
    
    const responseBody = await response.json();

    expect(response.status()).toBe(422);
    expect(responseBody).toEqual({
      status: 422,
      errorCode: '101',
      message: 'Invalid card number',
      errorType: 'validation',
      pspReference: expect.any(String)  // Use expect.any(String) to allow any string reference
    });
  });

  test('should return business validation error for invalid data', async ({ request }) => {
    const response = await request.post('/your-endpoint', {
      data: {
        cardInfo: {
          encryptedCardNumber: 'invalid-card-number'
        }
      }
    });
    
    const responseBody = await response.json();

    expect(response.status()).toBe(422);
    expect(responseBody).toEqual({
      title: 'Business validation error',
      status: 422,
      type: '/problems/business-validation-failure',
      detail: 'Invalid Data',
      instance: expect.stringContaining('/traceId/'), // Use stringContaining to match the pattern
      violations: [
        {
          field: 'cardInfo.encryptedCardNumber',
          message: 'Invalid card number'
        }
      ]
    });
  });

});
```