import { useReducer } from 'react';

import { IdentifierValueSchema } from '@/schemas/identifier-value';

type State = {
  status: 'closed' | 'open' | 'qr-code' | 'success' | 'error';
  data?: IdentifierValueSchema;
  error?: string;
};

export const initialState: State = {
  status: 'closed',
};

export type Action =
  | { type: 'open' }
  | { type: 'close' }
  | { type: 'open' }
  | { type: 'qr-code'; data: IdentifierValueSchema }
  | { type: 'success' }
  | { type: 'error'; error: string };

export function shareCopyState(state: State, action: Action): State {
  switch (action.type) {
    case 'open':
      return { status: 'open' };
    case 'close':
      return { status: 'closed' };
    case 'qr-code':
      return { status: 'qr-code', data: action.data };
    case 'success':
      return { status: 'success', data: state.data };
    case 'error':
      return { status: 'error', error: action.error, data: state.data };
    default:
      return state;
  }
}

export function useShareCopyState() {
  const [state, dispatch] = useReducer(shareCopyState, initialState);
  const onOpen = () => dispatch({ type: 'open' });
  const onClose = () => dispatch({ type: 'close' });
  const onQrCode = (data: IdentifierValueSchema) =>
    dispatch({ type: 'qr-code', data });
  const onSuccess = () => dispatch({ type: 'success' });
  const onError = (error: string) => dispatch({ type: 'error', error });

  return {
    state,
    onOpen,
    onClose,
    onQrCode,
    onSuccess,
    onError,
  };
}
