import {
  Dispatch,
  FC,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type HeaderContext = {
  fixed: boolean;
  setFixed: Dispatch<SetStateAction<boolean>>;
  variant: 'light' | 'dark';
  setVariant: Dispatch<SetStateAction<'light' | 'dark'>>;
};

const DEFAULT_STATE: HeaderContext = {
  fixed: false,
  setFixed: () => null,
  variant: 'light',
  setVariant: () => null,
};

const HeaderContext = createContext<HeaderContext>(DEFAULT_STATE);

export const HeaderContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fixed, setFixed] = useState(DEFAULT_STATE.fixed);
  const [variant, setVariant] = useState(DEFAULT_STATE.variant);

  const value = {
    fixed,
    setFixed,
    variant,
    setVariant,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
