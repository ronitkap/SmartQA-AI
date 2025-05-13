import { test, expect } from '@playwright/test';

test('AC1 - Error message for unreferenced refund attempts', async ({ request }) => {
    const response = await request.post('/refund', { data: { reference: null } });
    expect(await response.text()).toBe('Unreferenced refund not allowed. Please reissue.');
});

test('AC2 - Validate access control for unreferenced refunds', async ({ request }) => {
    const response = await request.post('/refund', { data: { reference: null }, headers: { role: 'user' } });
    expect(response.status()).toBe(403);
});

test('AC3 - Reject requests lacking authorization headers', async ({ request }) => {
    const response = await request.post('/refund', { data: { reference: null } });
    expect(response.status()).toBe(401);
});

test('AC4 - Respond with 403 status for misconfigured merchant account', async ({ request }) => {
    const response = await request.post('/refund', { data: { reference: null }, headers: { merchantId: 'invalid' } });
    expect(response.status()).toBe(403);
});

test('AC5 - Handle internal errors gracefully with 500 status code', async ({ request }) => {
    const response = await request.post('/refund', { data: { reference: null }, simulateError: true });
    expect(response.status()).toBe(500);
});

test('S.No 1 - Test error formatting feature in payment gateway service', async ({ request }) => {
    const response = await request.post('/payment', { data: { cardInfo: { encryptedCardNumber: 'invalid' } } });
    const responseBody = await response.json();
    expect(responseBody).toEqual({ 
        status: 422, 
        title: 'Business validation error', 
        detail: 'Invalid Data', 
        violations: [{ field: 'cardInfo.encryptedCardNumber', message: 'Invalid card number' }] 
    });
});

test('S.No 2 - Test handling of errors from Adyen service', async ({ request }) => {
    const response = await request.post('/payment', { data: { cardInfo: { encryptedCardNumber: 'invalid' } } });
    const responseBody = await response.json();
    expect(responseBody).toEqual({ 
        status: 422, 
        errorCode: 101, 
        message: 'Invalid card number' 
    });
});

test('S.No 3 - Validate transformed error message for unreferenced refunds', async ({ request }) => {
    const response = await request.post('/refund', { data: { accountId: 'saved', reference: null }, headers: { role: 'user' } });
    const responseBody = await response.json();
    expect(responseBody).toEqual({ 
        status: 422, 
        message: 'Unreferenced refunds are not permitted, please re-issue as referenced refund' 
    });
});

test('S.No 4 - Test fallback error message for unknown error', async ({ request }) => {
    const response = await request.post('/payment', { data: { cardInfo: { encryptedCardNumber: 'unknown' } } });
    const responseBody = await response.json();
    expect(responseBody).toEqual({ 
        status: 403, 
        message: 'Not allowed', 
        details: 'Invalid operation' 
    });
});

test('S.No 5 - Verify endpoint-specific error message functionality', async ({ request }) => {
    const response = await request.post('/refundWithData', { data: { reference: null } });
    const responseBody = await response.json();
    expect(responseBody).toEqual({ 
        status: 422, 
        message: 'Unreferenced refunds are not permitted, please re-issue as referenced refund' 
    });
});