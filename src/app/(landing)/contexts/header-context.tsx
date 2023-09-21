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
  variant: 'light' | 'dark';
  setVariant: Dispatch<SetStateAction<'light' | 'dark'>>;
};

const DEFAULT_STATE: HeaderContext = {
  variant: 'light',
  setVariant: () => null,
};

const HeaderContext = createContext<HeaderContext>(DEFAULT_STATE);

export const HeaderContextProvider: FC<{
  children: ReactNode;
  initialVariant?: 'light' | 'dark';
}> = ({ children, initialVariant }) => {
  const [variant, setVariant] = useState(
    initialVariant || DEFAULT_STATE.variant
  );

  return (
    <HeaderContext.Provider value={{ variant, setVariant }}>
      {children}
    </HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
