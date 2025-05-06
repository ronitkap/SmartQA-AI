```javascript
import { test, expect } from '@playwright/test';

test.describe('Error Handling', () => {
  
  test('should return context-appropriate error message for invalid endpoint', async ({ request }) => {
    const response = await request.get('/invalid-endpoint');
    expect(response.status()).toBe(404);
    const errorMessage = await response.json();
    expect(errorMessage).toEqual({ message: 'Endpoint not found' });
  });

  test('should return context-appropriate error message for server error', async ({ request }) => {
    const response = await request.get('/server-error-endpoint');
    expect(response.status()).toBe(500);
    const errorMessage = await response.json();
    expect(errorMessage).toEqual({ message: 'Internal server error. Please try again later.' });
  });

  test('should return context-appropriate error message for unauthorized access', async ({ request }) => {
    const response = await request.get('/protected-endpoint');
    expect(response.status()).toBe(401);
    const errorMessage = await response.json();
    expect(errorMessage).toEqual({ message: 'Unauthorized access. Please log in.' });
  });

  test('should return usable error format across all endpoints', async ({ request }) => {
    const response = await request.get('/another-invalid-endpoint');
    expect(response.status()).not.toBe(200);
    const errorMessage = await response.json();
    expect(errorMessage).toHaveProperty('message');
    expect(typeof errorMessage.message).toBe('string');
  });
  
});
```