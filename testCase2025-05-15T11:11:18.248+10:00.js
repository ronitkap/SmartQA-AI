import { test, expect } from '@playwright/test';

test.describe('Refund API Tests', () => {
    test('Test unreferenced refund enabled', async ({ request }) => {
        const response = await request.post('/refund', { data: { /* valid refund request data */ } });
        expect(response.ok()).toBeTruthy();
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            refundStatus: "Received",
            receiptNumber: "883590043303790G",
            refundReference: "refund for customer",
            originalReceiptNumber: "8835900433037AB"
        });
    });

    test('Test unreferenced refund when role not enabled', async ({ request }) => {
        const response = await request.post('/refund', { data: { /* valid refund request data */ } });
        expect(response.status()).toBe(403);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            errorCode: "010",
            message: "Unreferenced refund not allowed. Please reissue."
        });
    });

    test('Test unreferenced refund with missing required API roles', async ({ request }) => {
        const response = await request.post('/refund', { data: { /* valid refund request data */ } });
        expect(response.status()).toBe(401);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            detail: "Missing or invalid credentials",
            title: "Unauthorized"
        });
    });

    test('Test unreferenced refund with invalid data', async ({ request }) => {
        const response = await request.post('/refund', { data: { /* refund request with invalid parameters */ } });
        expect(response.status()).toBe(422);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            title: "Business validation error",
            detail: "Invalid data",
            violations: [{
                field: "brand",
                message: "Missing brand"
            }]
        });
    });

    test('Test unreferenced refund for server error', async ({ request }) => {
        const response = await request.post('/refund', { data: { /* valid refund request data */ } });
        expect(response.status()).toBe(500);
        const responseBody = await response.json();
        expect(responseBody).toMatchObject({
            detail: "Something went wrong",
            title: "Server error"
        });
    });
});