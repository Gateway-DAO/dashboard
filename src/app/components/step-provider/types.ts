export type LoginStep =
  | 'initial'
  | 'verify-email-add-code'
  | 'choose-gatewayid'
  | 'completed';
