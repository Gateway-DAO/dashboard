import dotenv from 'dotenv';
import fs from 'node:fs';
import path from 'node:path';
import { exit } from 'node:process';
import openapiTS, { astToString } from 'openapi-typescript';
import converter from 'swagger2openapi';

dotenv.config();

const outputFolder = path.resolve(__dirname, '../src/services/api');

async function generate() {
  if (!process.env.OPENAPI_URL) {
    console.error('OPENAPI_URL environment variable is required');
    exit(1);
  }

  const converted = await converter.convertUrl(process.env.OPENAPI_URL, {});
  const convertedString = JSON.stringify(converted.openapi, null, 4);

  fs.writeFileSync(path.resolve(outputFolder, 'openapi.json'), convertedString);

  const ast = await openapiTS(convertedString, {
    enum: true,
  });
  const types = astToString(ast);

  fs.writeFileSync(path.resolve(outputFolder, 'types.ts'), types);
  exit(0);
}

generate();
