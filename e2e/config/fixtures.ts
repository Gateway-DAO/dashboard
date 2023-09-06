import { test as base, chromium, type BrowserContext } from '@playwright/test';
import { initialSetup } from '@synthetixio/synpress/commands/metamask';
import { setExpectInstance } from '@synthetixio/synpress/commands/playwright';
import { prepareMetamask } from '@synthetixio/synpress/helpers';

export const test = base.extend<{
  context: BrowserContext;
}>({
  context: async function ({}, use) {
    // required for synpress as it shares same expect instance as playwright
    await setExpectInstance(expect);

    // download metamask
    const metamaskPath = await prepareMetamask('10.25.0');

    // prepare browser args
    const browserArgs = [
      `--disable-extensions-except=${metamaskPath}`,
      `--load-extension=${metamaskPath}`,
      '--remote-debugging-port=9222',
    ];

    // launch browser
    const context = await chromium.launchPersistentContext('', {
      headless: false,
      args: browserArgs,
    });

    // wait for metamask
    await context.pages()[0].waitForTimeout(3000);

    // setup metamask
    await initialSetup(chromium, {
      secretWordsOrPrivateKey:
        'test test test test test test test test test test test junk',
      network: 'optimism',
      password: 'Tester@1234',
      enableAdvancedSettings: true,
    });

    await use(context);
  },
});

export const expect = test.expect;
