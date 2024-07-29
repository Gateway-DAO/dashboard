/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ButtonPropsColorOverrides,
  ButtonClasses,
  Palette,
  PalleteOptions,
  IconButtonPropsColorOverrides,
  DividerPropsVariantOverrides,
} from '@mui/material';
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
  interface DividerPropsVariantOverrides {
    light: true;
  }
  interface IconButtonPropsColorOverrides {
    white: true;
  }
  interface ButtonClasses {
    containedWhite: string;
  }
}
