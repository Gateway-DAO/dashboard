/* eslint-disable @typescript-eslint/no-unused-vars */
import { ButtonPropsColorOverrides, ButtonClasses } from '@mui/material';
import { Palette, PalleteOptions } from '@mui/material/styles';

declare module '@mui/material' {
  interface Palette {
    white: Palette['primary'];
  }

  interface PaletteOptions {
    white?: PaletteOptions['primary'];
  }
  interface ButtonPropsColorOverrides {
    white: true;
  }
  interface ButtonClasses {
    containedWhite: string;
  }
}
