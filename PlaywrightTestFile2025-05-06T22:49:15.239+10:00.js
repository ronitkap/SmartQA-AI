```javascript
import { test, expect } from '@playwright/test';

test.describe('Unreferenced Refund Error Handling', () => {
  
  test('should return a generic error message when unreferenced refund role is not enabled', async ({ request }) => {
    const response = await request.post('/refunds', {
      data: {
        paymentAccountId: 'customer-saved-account-id',
        refundAmount: 100,
      },
    });
    expect(response.status()).toBe(403);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('Not Allowed');
    expect(responseBody.providerCode).toBe('010');
  });

  test('should return a generic error message when merchant account is not configured for unreferenced refunds', async ({ request }) => {
    const response = await request.post('/refunds', {
      data: {
        paymentAccountId: 'another-customer-saved-account-id',
        refundAmount: 50,
      },
    });
    expect(response.status()).toBe(403);
    const responseBody = await response.json();
    expect(responseBody.message).toBe('Not Allowed');
    expect(responseBody.providerCode).toBe('010');
  });

  test('should propagate generic error message to FSCD and Billing Centre', async ({ request }) => {
    const response = await request.post('/refunds', {
      data: {
        paymentAccountId: 'propagation-test-account-id',
        refundAmount: 100,
      },
    });
    expect(response.status()).toBe(403);
    const responseBody = await response.json();

    // Simulate forwarding to FSCD
    const fscdResponse = await request.post('/fscd-endpoint', {
      data: {
        error: responseBody,
      },
    });

    expect(fscdResponse.status()).toBe(200);
    const fscdResponseBody = await fscdResponse.json();
    expect(fscdResponseBody.forwardedError).toEqual(responseBody);

    // Simulate forwarding to Billing Centre
    const bcResponse = await request.post('/billing-centre-endpoint', {
      data: {
        error: fscdResponseBody.forwardedError,
      },
    });

    expect(bcResponse.status()).toBe(200);
    const bcResponseBody = await bcResponse.json();
    expect(bcResponseBody.receivedError).toEqual(fscdResponseBody.forwardedError);
  });

});
```