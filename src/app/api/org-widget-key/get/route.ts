import { NextRequest, NextResponse } from 'next/server';

import { DynamoDBClient, QueryCommand } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

const client = new DynamoDBClient({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});
const docClient = DynamoDBDocumentClient.from(client);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    if (!body.orgId) {
      return NextResponse.json(
        {
          error: 'Missing parameters',
        },
        {
          status: 400,
        }
      );
    }

    const command = new QueryCommand({
      TableName: process.env.NEXT_PUBLIC_API_ORG_KEY_TABLE,
      IndexName: 'orgId-index',
      KeyConditionExpression: 'orgId = :orgId',
      ExpressionAttributeValues: {
        ':orgId': { S: body.orgId },
      },
    });

    const result = await docClient.send(command);

    if (!result || !result.Items || result.Items.length < 1) {
      return NextResponse.json(
        { error: 'No items' },
        {
          status: 404,
        }
      );
    }

    return NextResponse.json(
      {
        item: {
          accessId: result.Items[0].accessId['S'],
          orgId: result.Items[0].orgId['S'],
        },
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
