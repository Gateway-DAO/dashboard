import { NextRequest, NextResponse } from 'next/server';

import routes from '@/constants/routes';

export type GenerateIssueBody = {
  origin: string;
  claim: {
    avatar?: string | null;
    name?: string | null;
    username: string | null;
    email?: string | null;
    evmWallet?: string | null;
    solanaWallet?: string | null;
  };
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GenerateIssueBody;
    if (!body.claim || !body.origin) {
      return NextResponse.json(
        {
          error: 'Missing claim or origin parameter',
        },
        {
          status: 400,
        }
      );
    }
    const params = {
      widgetKey: process.env.WIDGET_KEY,
      dataModelId: process.env.DATA_MODEL_EDUCATIONAL,
      callbackUrl: body.origin + routes.dashboard.user.myAssets,
      claim: body.claim,
    };

    try {
      const createSession = await fetch(
        `${process.env.WIDGET_DOMAIN}/api/issue/generate-session`,
        {
          method: 'POST',
          body: JSON.stringify(params),
        }
      );
      const res = await createSession.json();
      return NextResponse.json(res);
    } catch (error: any) {
      console.error(error.code);
      return NextResponse.json('Error on generate issue', { status: 400 });
    }
  } catch (error) {
    return NextResponse.json('Error on generate issue', { status: 400 });
  }
}
