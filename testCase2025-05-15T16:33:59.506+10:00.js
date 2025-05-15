import { test, expect } from '@playwright/test';

test('Testing Unreferenced Refund with disabled role', async ({ request }) => {
    const response = await request.post('/refund', {
        data: { paymentAccountID: '12345' }
    });
    expect(response.status()).toBe(403);
    const body = await response.json();
    expect(body).toEqual({
        status: 403,
        detail: "Not allowed",
        title: "Forbidden error",
        instance: "/traceId/xxxx",
        code: "010"
    });
});

test('Testing Unreferenced Refund with missing required roles', async ({ request }) => {
    const response = await request.post('/refund', {
        data: { paymentAccountID: 'invalidID' }
    });
    expect(response.status()).toBe(422);
    const body = await response.json();
    expect(body).toEqual({
        title: "Business validation error",
        status: 422,
        type: "/problems/business-validation-failure",
        detail: "Invalid Data",
        instance: "/traceId/xxxx",
        violations: [{
            field: "authorization",
            message: "Unreferenced refunds are not permitted please re-issue as referenced refund"
        }]
    });
});

test('Testing a Successful Unreferenced Refund', async ({ request }) => {
    const response = await request.post('/refund', {
        data: { paymentAccountID: 'validID', amount: 100 }
    });
    expect(response.status()).toBe(200);
    const body = await response.json();
    expect(body).toEqual({
        refundStatus: "Received",
        receiptNumber: "1234567890",
        refundReference: "refund for customer",
        originalReceiptNumber: "A123456789"
    });
});

test('Testing Unreferenced Refund with incorrect API usage', async ({ request }) => {
    const response = await request.post('/refund', {
        data: { paymentAccountID: '' }
    });
    expect(response.status()).toBe(400);
    const body = await response.json();
    expect(body).toEqual({
        title: "Contract violation",
        status: 400,
        detail: "Missing brand",
        instance: "/traceId/xxxx"
    });
});

test('Testing error handling for unexpected server error', async ({ request }) => {
    const response = await request.post('/refund', {
        data: { paymentAccountID: 'validID', causeError: true }
    });
    expect(response.status()).toBe(500);
    const body = await response.json();
    expect(body).toEqual({
        title: "Server error",
        status: 500,
        detail: "Something went wrong",
        instance: "/traceId/xxxx"
    });
});