import { NextRequest, NextResponse } from 'next/server';

export type RedirectBody = {
  url: string;
};

export async function GET(req: NextRequest) {
  try {
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
    try {
      return NextResponse.redirect(url);
    } catch (error: any) {
      console.error(error.code);
      return NextResponse.json('Error on redirect', { status: 500 });
    }
  } catch (error) {
    return NextResponse.json('Error on redirect', { status: 500 });
  }
}
