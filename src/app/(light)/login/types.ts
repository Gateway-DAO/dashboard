export type Step =
  | 'initial'
  | 'verify-email-login-code'
  | 'verify-email-add-code'
  | 'choose-gatewayid'
  | 'completed';
