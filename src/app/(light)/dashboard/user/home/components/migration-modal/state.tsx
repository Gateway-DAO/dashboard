import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

import { MigrationTarget, MigrationStatus, MigrationEvent } from './types';

export type MigrationModalState = {
  status: 'closed' | 'start' | 'qr' | MigrationStatus;
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
        target: state.target
          ? {
              ...state.target,
              ...payload.target,
            }
          : payload.target,
      };
    case 'error':
      return {
        status: 'error',
        target: state.target
          ? {
              ...state.target,
              ...payload.target,
            }
          : payload.target,
        error: payload.error,
      };
  }
};

type MigrationModalContext = {
  state: MigrationModalState;
  onCloseModal: () => void;
  onOpenModal: () => void;
  onOpenQR: () => void;
  onMigrationEvent: (event: MigrationEvent) => void;
};

const MigrationModalContext = createContext<MigrationModalContext>({
  state: initialState,
  onCloseModal: () => {},
  onOpenModal: () => {},
  onOpenQR: () => {},
  onMigrationEvent: (event: MigrationEvent) => {},
});

export function MigrationModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(migrationModalReducer, initialState);

  const dispatchers = useMemo(
    () => ({
      onCloseModal: () => dispatch({ status: 'closed' }),
      onOpenModal: () => dispatch({ status: 'start' }),
      onOpenQR: () => dispatch({ status: 'qr' }),
      onMigrationEvent: (event: MigrationEvent) => dispatch(event),
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
