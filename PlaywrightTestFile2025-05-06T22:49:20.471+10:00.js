```javascript
import { test, expect } from '@playwright/test';

test.describe('Refund API Tests', () => {

  test('When Unreferenced Refund(refundWithData) is requested and the API role is not enabled for unreferenced refund at Adyen', async ({ request }) => {
    const response = await request.post('/payments', {
      data: {
        // include relevant refundWithData here
      },
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(422);
    expect(responseBody.title).toBe("Business validation error");
    expect(responseBody.detail).toBe("Invalid Data");
    expect(responseBody.violations[0].field).toBe("authorization");
    expect(responseBody.violations[0].message).toBe("Unreferenced refunds are not permitted please re-issue as referenced refund");
  });

  test('When referenced Refund or Payment is requested and the API role is not enabled for the requested operation at Adyen', async ({ request }) => {
    const response = await request.post('/payments', {
      data: {
        // include relevant referenced payment/refund data here
      }
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(403);
    expect(responseBody.title).toBe("Forbidden error");
    expect(responseBody.detail).toBe("Not allowed");
  });

  test('When Unreferenced Refund(refundWithData) is requested and it is successful', async ({ request }) => {
    const response = await request.post('/payments', {
      data: {
        // include relevant refundWithData here
      }
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(200); // Assuming success returns 200, change if different
    expect(responseBody.refundStatus).toBe("Received");
    expect(responseBody.receiptNumber).toBeDefined();
    expect(responseBody.refundReference).toBe("refund for customer");
    expect(responseBody.originalReceiptNumber).toBeDefined();
  });

});
```