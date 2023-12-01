import { SchemaProperty } from '@/utils/get-claim-type';

export type PropertyField = {
  id: string;
  defaultValue?: any;
  hideHelperText?: boolean;
} & SchemaProperty;
