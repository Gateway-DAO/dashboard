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
  currentSection: string;
  setCurrentSection: Dispatch<SetStateAction<string>>;
};

const DEFAULT_STATE: HeaderContext = {
  fixed: false,
  setFixed: () => null,
  variant: 'light',
  setVariant: () => null,
  currentSection: '',
  setCurrentSection: () => null,
};

const HeaderContext = createContext<HeaderContext>(DEFAULT_STATE);

export const HeaderContextProvider: FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [fixed, setFixed] = useState(DEFAULT_STATE.fixed);
  const [variant, setVariant] = useState(DEFAULT_STATE.variant);
  const [currentSection, setCurrentSection] = useState(
    DEFAULT_STATE.currentSection
  );

  const value = {
    fixed,
    setFixed,
    variant,
    setVariant,
    currentSection,
    setCurrentSection,
  };

  return (
    <HeaderContext.Provider value={value}>{children}</HeaderContext.Provider>
  );
};

export const useHeaderContext = () => useContext(HeaderContext);
