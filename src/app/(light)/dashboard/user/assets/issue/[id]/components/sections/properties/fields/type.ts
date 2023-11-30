// JSON Schema draft 7 property types and validations
export type PropertyField = {
  id: string;
  defaultValue?: any;
  subType?: string;
  metadata?: any;
  description?: string;
  required?: boolean;

  // Number validations
  minimum?: number;
  maximum?: number;
  multipleOf?: number;

  // String validations
  minLength?: number;
  maxLength?: number;
  pattern?: string;

  // Array validations
  minItems?: number;
  maxItems?: number;
  uniqueItems?: boolean;
  items?: PropertyField;
};
