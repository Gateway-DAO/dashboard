import { SchemaProperty } from '@/utils/get-claim-type';

export type PropertyProps = {
  id: string;
  property: SchemaProperty;
  required?: boolean;
};
