import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { MigrationTarget, MigrationStatus } from './types';


export type MigrationModalState = {
  status:
  | 'closed'
  | 'start'
  | 'qr'
  | MigrationStatus;
  target?: MigrationTarget;
  error?: string;
};

type MigrationModalPayload =
  | {
    status: 'closed';
  }
  | {
    status: 'start';
  }
  | {
    status: 'qr';
  }
  | {
    status: 'pending';
    target: MigrationTarget;
  }
  | {
    status: 'finished';
    target?: MigrationTarget;
  }
  | {
    status: 'error';
    target?: MigrationTarget;
    error?: string;
  };

const initialState: MigrationModalState = {
  status: 'closed',
};

export const migrationModalReducer = (
  state: MigrationModalState,
  payload: MigrationModalPayload
): MigrationModalState => {
  switch (payload.status) {
    case 'closed':
      return { status: 'closed' };
    case 'start':
      return { status: 'start' };
    case 'qr':
      return { status: 'qr' };
    case 'pending':
      return { status: 'pending', target: payload.target };
    case 'finished':
      return {
        status: 'finished',
        target: payload.target ?? state.target,
      };
    case 'error':
      return { status: 'error', target: payload.target ?? state.target, error: payload.error };
  }
};

type MigrationModalContext = {
  state: MigrationModalState;
  onCloseModal: () => void;
  onOpenModal: () => void;
  onOpenQR: () => void;
  onMigrationStarted: (target: MigrationTarget) => void;
  onMigrationFinished: (target?: MigrationTarget) => void;
  onMigrationError: (error: string) => void;
};

const MigrationModalContext = createContext<MigrationModalContext>({
  state: initialState,
  onCloseModal: () => { },
  onOpenModal: () => { },
  onOpenQR: () => { },
  onMigrationStarted: () => { },
  onMigrationFinished: () => { },
  onMigrationError: (error: string) => { },
});

export function MigrationModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(migrationModalReducer, initialState);

  const dispatchers = useMemo(
    () => ({
      onCloseModal: () => dispatch({ status: 'closed' }),
      onOpenModal: () => dispatch({ status: 'start' }),
      onOpenQR: () => dispatch({ status: 'qr' }),
      onMigrationStarted: (target: MigrationTarget) =>
        dispatch({ status: 'pending', target }),
      onMigrationFinished: (target?: MigrationTarget) =>
        dispatch({ status: 'finished', target }),
      onMigrationError: (error: string) => dispatch({ status: 'error', error }),
    }),
    []
  );

  return (
    <MigrationModalContext.Provider
      value={{
        state,
        ...dispatchers,
      }}
    >
      {children}
    </MigrationModalContext.Provider>
  );
}

export function useMigrationModal() {
  return useContext(MigrationModalContext);
}
