import { NextRequest, NextResponse } from 'next/server';

export type GetIssuedSessionBody = {
  sessionId: string;
};

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as GetIssuedSessionBody;
    if (!body.sessionId) {
      return NextResponse.json(
        {
          error: 'Missing sessionId',
        },
        {
          status: 400,
        }
      );
    }
    const params = {
      widgetKey: process.env.WIDGET_KEY,
      sessionId: body.sessionId,
    };

    try {
      const getSession = await fetch(
        `${process.env.WIDGET_DOMAIN}/api/issue/get-session-details`,
        {
          method: 'POST',
          body: JSON.stringify(params),
        }
      );
      const res = await getSession.json();
      return NextResponse.json(res);
    } catch (error: any) {
      console.error(error.code);
      return NextResponse.json('Error on get issued session', { status: 400 });
    }
  } catch (error) {
    return NextResponse.json('Error on get issued session', { status: 400 });
  }
}
