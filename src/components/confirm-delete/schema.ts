import { object, string, SchemaOf, boolean } from 'yup';

export type ConfirmDeleteSchema = {
  text: string;
  checked: boolean;
};

export const schemaConfirmDelete: SchemaOf<ConfirmDeleteSchema> = object({
  text: string().required('Required field'),
  checked: boolean().isTrue('Need to mark the consent on the action'),
});
