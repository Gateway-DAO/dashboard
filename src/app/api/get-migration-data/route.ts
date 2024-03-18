import { NextResponse } from 'next/server';

import { getGtwServerSession } from '@/services/next-auth/get-gtw-server-session';
import { SessionToken } from '@/types/user';
import jwt from 'jsonwebtoken';

export async function GET() {
  try {
    // Get the token from the auth session
    // Remove unecessary data from the token
    // Sign the JTW with the same secret as the auth session

    const session = await getGtwServerSession();

    if (!session) {
      throw new Error('Session not found');
    }

    const parsedToken = jwt.decode(session.token, {
      json: true,
    }) as SessionToken | null;

    if (!parsedToken) {
      throw new Error('Error on decoding token');
    }

    const meaningnfulData: Partial<SessionToken> = {
      protocol_id: parsedToken.protocol_id,
    };

    const token = jwt.sign(meaningnfulData, process.env.JWT_TOKEN);

    return NextResponse.json({ token });
  } catch (error) {
    console.error('Error on get migration data', error);
    return NextResponse.json('Error on get migration data', { status: 400 });
  }
}
