import { chromium } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'node:path';
dotenv.config();

export default async function globalConfig() {
  const storagePath = path.resolve(__dirname, 'storageState.json');
  const sessionToken = process.env.TEST_SESSION_TOKEN;

  const browser = await chromium.launch();
  const context = await browser.newContext();
  await context.addCookies([
    {
      name: 'next-auth.session-token',
      value: sessionToken,
      domain: 'localhost',
      path: '/',
      httpOnly: true,
      sameSite: 'Lax',
      expires: Math.round((Date.now() + 86400000 * 1) / 1000),
    },
  ]);
  await context.storageState({ path: storagePath });
  await browser.close();
}
