import { createContext, useContext } from 'react';

export type EducationalContextType = {
  key?: string;
  value?: string;
} | null;

export const EducationalContext = createContext<EducationalContextType>(null);

export const useEducationalContext = () => useContext(EducationalContext);
