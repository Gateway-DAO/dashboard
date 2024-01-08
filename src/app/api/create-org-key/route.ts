import { NextRequest, NextResponse } from 'next/server';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import { uuid } from 'uuidv4';

const client = new DynamoDBClient({
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.session || !body.orgId) {
      return Response.json(
        {
          error: 'Missing parameters',
        },
        {
          status: 400,
        }
      );
    }

    const newId = uuid();
    const createCommand = new PutCommand({
      TableName: process.env.NEXT_PUBLIC_API_ORG_KEY_TABLE,
      Item: {
        accessId: newId,
        access: body.session,
        orgId: body.orgId,
      },
    });

    await docClient.send(createCommand);
    return NextResponse.json(
      {
        id: newId,
      },
      {
        status: 200,
      }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: error },
      {
        status: 500,
      }
    );
  }
}
