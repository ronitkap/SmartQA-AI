```javascript
import { test, expect } from '@playwright/test';

// Test case for successful refundWithData operation
test('refundWithData operation returns appropriate error message', async ({ request }) => {
    const response = await request.post('/adyen-endpoint', {
        data: { /* mock request data for the refundWithData operation */ }
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(422);
    expect(responseBody).toEqual({
        provider: "Adyen",
        status: 422,
        operation: "refundWithData",
        providerCode: "010",
        providerDescription: "Not allowed",
        field: "authorization",
        message: "Unreferenced refunds are not permitted please re-issue as referenced refund",
        details: "Invalid Data"
    });
});

// Test case for default error message when operation does not match
test('non-refundWithData operation returns default error message', async ({ request }) => {
    const response = await request.post('/adyen-endpoint', {
        data: { /* mock request data for a different operation */ }
    });

    const responseBody = await response.json();
    expect(response.status()).toBe(403);
    expect(responseBody).toEqual({
        provider: "Adyen",
        status: 403,
        providerCode: "010",
        providerDescription: "Not allowed",
        field: "authorization",
        message: "Not allowed",
        details: ""
    });
});
```