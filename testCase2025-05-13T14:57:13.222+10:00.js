import { test, expect } from '@playwright/test';

test('Validate existence of PayId in the CLP Payments Database', async ({ request }) => {
    const response = await request.post('/validatePayId', { data: { payId: '123456' } });
    const data = await response.json();
    expect(data.exists).toBe(false);
    expect(data.message).toBe('PayId not found');
});

test('Validate error message when PayId does not exist', async ({ request }) => {
    const response = await request.post('/validatePayId', { data: { payId: '654321' } });
    const data = await response.json();
    expect(data.exists).toBe(false);
    expect(data.message).toBe('PayId not found');
});

test('Validate appropriate message when PayId exists', async ({ request }) => {
    const response = await request.post('/validatePayId', { data: { payId: '789012' } });
    const data = await response.json();
    expect(data.exists).toBe(true);
    expect(data.message).toBe('PayId exists');
});

test('Check behavior with a null PayId', async ({ request }) => {
    const response = await request.post('/validatePayId', { data: { payId: null } });
    const data = await response.json();
    expect(data.exists).toBe(false);
    expect(data.message).toBe('Invalid PayId');
});

test('Validate PayId format enforcement during validation', async ({ request }) => {
    const response = await request.post('/validatePayId', { data: { payId: 'abc123' } });
    const data = await response.json();
    expect(data.exists).toBe(false);
    expect(data.message).toBe('Invalid PayId format');
});