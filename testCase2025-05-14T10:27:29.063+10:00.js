import { test, expect } from '@playwright/test';

test.describe('Unreferenced Refund Processing', () => {
  
  test('AC1 - Attempt unreferenced refund without permissions', async ({ page }) => {
    await page.goto('/refund');
    await page.click('#unreferencedRefundButton');
    const errorMessage = await page.locator('#errorMessage').textContent();
    expect(errorMessage).toBe('Unreferenced refund not allowed. Please reissue.');
  });

  test('AC2 - Attempt unreferenced refund when account not configured', async ({ page }) => {
    await page.goto('/refund');
    await page.fill('#merchantAccount', 'notConfiguredAccount');
    await page.click('#unreferencedRefundButton');
    const errorMessage = await page.locator('#errorMessage').textContent();
    expect(errorMessage).toBe('Merchant account is not configured for unreferenced refunds.');
  });

  test('AC3 - Log refund transactions', async ({ page }) => {
    await page.goto('/refund');
    await page.click('#unreferencedRefundButton');
    // Assume there's a function to check logs
    const logs = await checkAuditLog();
    expect(logs).toContain('Refund attempt logged for unreferenced refund.');
  });

  test('AC4 - Ensure error messages do not disclose sensitive information', async ({ page }) => {
    await page.goto('/refund');
    await page.fill('#merchantAccount', 'notConfiguredAccount');
    await page.click('#unreferencedRefundButton');
    const errorMessage = await page.locator('#errorMessage').textContent();
    expect(errorMessage).not.toContain('System error details');
  });

  test('AC5 - User feedback during refund interaction', async ({ page }) => {
    await page.goto('/refund');
    await page.click('#unreferencedRefundButton');
    const feedbackMessage = await page.locator('#feedbackMessage').textContent();
    expect(feedbackMessage).toBe('Unreferenced refund not allowed. Please reissue.');
  });

  test('AC6 - Log and categorize common refund errors', async ({ page }) => {
    await page.goto('/refund');
    await page.click('#unreferencedRefundButton');
    const errorLogs = await getErrorLogs();
    expect(errorLogs).toEqual(expect.arrayContaining(['Common refund error categorized.']));
  });

});