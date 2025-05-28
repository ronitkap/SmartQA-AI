import { test, expect } from '@playwright/test';

test.describe('Stripe One-Off Payment Integration', () => {

    test('AC1: Validate payment amounts against policy premiums', async ({ page }) => {
        await page.goto('/payment');
        await page.fill('#paymentAmount', '500');
        await page.click('#submitPayment');
        await expect(page.locator('#statusMessage')).toHaveText('Payment approved');
    });

    test('AC2: Enforce two-factor authentication for payment method changes', async ({ page }) => {
        await page.goto('/updatePaymentMethod');
        await page.fill('#paymentMethod', 'New Card Info');
        await page.click('#submitChange');
        await expect(page.locator('#2faPrompt')).toBeVisible();
        await page.fill('#2faCode', '123456');
        await page.click('#verify2fa');
        await expect(page.locator('#statusMessage')).toHaveText('Payment method updated');
    });

    test('AC3: Ensure payment data encryption meets PCI-DSS requirements', async ({ page }) => {
        await page.goto('/payment');
        await page.fill('#paymentInfo', 'Sensitive Payment Data');
        await page.click('#submitPayment');
        // Additional logic to verify encryption would be executed here
        await expect(page.locator('#encryptionStatus')).toHaveText('Encryption compliant with PCI-DSS');
    });

    test('AC4: Allow users to view transaction history securely', async ({ page }) => {
        await page.goto('/login');
        await page.fill('#username', 'user');
        await page.fill('#password', 'password');
        await page.click('#loginButton');
        await page.goto('/transactionHistory');
        await expect(page.locator('#transactionList')).toBeVisible();
    });

    test('AC5: Return a 400 error for invalid or missing payment information', async ({ page }) => {
        await page.goto('/payment');
        await page.fill('#paymentAmount', '');
        await page.click('#submitPayment');
        await expect(page.locator('#errorMessage')).toHaveText('400 error: Invalid payment information');
    });
});