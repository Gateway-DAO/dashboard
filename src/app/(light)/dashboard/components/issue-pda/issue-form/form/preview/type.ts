import { IssuePdaSchema } from '../schema';

export type PreviewModalProps = {
  amount: number;
  price: number;
  total: string;
  data: IssuePdaSchema;
  schema: any;
  isOpen: boolean;
  onClose: () => void;
};
