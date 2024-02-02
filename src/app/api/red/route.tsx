import { NextRequest, NextResponse } from 'next/server';

import { allowedRedirectDomains } from './allowed-redirect-domains';

export type RedirectBody = {
  url: string;
};

export async function GET(req: NextRequest) {
  try {
    /* This code block is checking if the `url` parameter is missing in the request. If the `url`
    parameter is missing, it returns a JSON response with an error message stating that the URL is
    missing, along with a status code of 400 (Bad Request). */
    const url = req.nextUrl.searchParams.get('url');
    if (!url) {
      return NextResponse.json(
        {
          error: 'Missing url',
        },
        {
          status: 400,
        }
      );
    }

    /* The code is checking if the domain extracted from the provided URL is allowed for redirection. */
    const urlDomain =
      /^(?:https?:\/\/)?(?:[^@\n]+@)?(?:www\.)?([^:\/\n]+)/.exec(url) ?? [];
    const isAllowed = !!allowedRedirectDomains.find(
      (domain) => domain === urlDomain[1]
    );
    if (!isAllowed) {
      return NextResponse.json(
        {
          error: 'Url not allowed',
        },
        {
          status: 405,
        }
      );
    }

    return NextResponse.redirect(
      url.indexOf('https://') === -1 ? `https://${url}` : url
    );
  } catch (error) {
    return NextResponse.json('Error on redirect', { status: 500 });
  }
}
