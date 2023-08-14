import { SxProps } from '@mui/material';
import { Breakpoint } from '@mui/system';

import { GatewayTheme } from './theme';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface ExtraPalette {}

export interface ExtraPaletteOptions {
  elevated?: string;
}

export interface ExtraTypeBackground {
  light?: string;
  elevated?: string;
}

export interface ExtraTheme {}

export type BreakpointsValue<T> = Partial<Record<Breakpoint, T>>;
export type GatewaySxProps = SxProps<GatewayTheme>;
