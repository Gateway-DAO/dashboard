'use client';

import { createContext, useContext } from 'react';

import { NavColor } from './types';

type Context = {
  isScrolled: boolean;
  color: NavColor;
};

export const NavContext = createContext<Context>({
  isScrolled: false,
  color: 'white',
});

export const useNavContext = () => useContext(NavContext);
