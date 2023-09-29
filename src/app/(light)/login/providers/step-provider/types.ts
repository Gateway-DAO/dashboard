export type LoginStep =
  | 'initial'
  | 'verify-email-login-code'
  | 'add-email'
  | 'verify-email-add-code'
  | 'choose-gatewayid'
  | 'completed';
