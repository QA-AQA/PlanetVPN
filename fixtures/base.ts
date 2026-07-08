import { test as base } from '@playwright/test';
import dotenv from 'dotenv';

dotenv.config();

interface TestFixtures {
  testUser: {
    email: string;
    invalidEmail: string;
  };
}

export const test = base.extend<TestFixtures>({
  // eslint-disable-next-line no-empty-pattern
  testUser: async ({}, use) => {
    await use({
      email: process.env.TEST_EMAIL || 'qa-engineer@example.com',
      invalidEmail: 'not-an-email',
    });
  },
});
export { expect } from '@playwright/test';
