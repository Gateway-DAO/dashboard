import {
  PropsWithChildren,
  createContext,
  useContext,
  useMemo,
  useReducer,
} from 'react';

export type MigrationTarget = { username: string; image?: string };

export type MigrationModalState = {
  status:
    | 'closed'
    | 'start'
    | 'qr'
    | 'started-migration'
    | 'finished-migration'
    | 'error';
  target?: MigrationTarget;
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
      status: 'started-migration';
      target: MigrationTarget;
    }
  | {
      status: 'finished-migration';
      target?: MigrationTarget;
    }
  | {
      status: 'error';
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
    case 'started-migration':
      return { status: 'started-migration', target: payload.target };
    case 'finished-migration':
      return {
        status: 'finished-migration',
        target: payload.target ?? state.target,
      };
    case 'error':
      return { status: 'error' };
  }
};

type MigrationModalContext = {
  state: MigrationModalState;
  onCloseModal: () => void;
  onOpenModal: () => void;
  onOpenQR: () => void;
  onMigrationStarted: (target: MigrationTarget) => void;
  onMigrationFinished: (target?: MigrationTarget) => void;
  onError: () => void;
};

const MigrationModalContext = createContext<MigrationModalContext>({
  state: initialState,
  onCloseModal: () => {},
  onOpenModal: () => {},
  onOpenQR: () => {},
  onMigrationStarted: () => {},
  onMigrationFinished: () => {},
  onError: () => {},
});

export function MigrationModalProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(migrationModalReducer, initialState);

  const dispatchers = useMemo(
    () => ({
      onCloseModal: () => dispatch({ status: 'closed' }),
      onOpenModal: () => dispatch({ status: 'start' }),
      onOpenQR: () => dispatch({ status: 'qr' }),
      onMigrationStarted: (target: MigrationTarget) =>
        dispatch({ status: 'started-migration', target }),
      onMigrationFinished: (target?: MigrationTarget) =>
        dispatch({ status: 'finished-migration', target }),
      onError: () => dispatch({ status: 'error' }),
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
