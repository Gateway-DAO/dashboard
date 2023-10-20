import { SxProps } from '@mui/material';
import { Breakpoint } from '@mui/system';

import { GatewayTheme } from './theme';

export type BreakpointsValue<T> = Partial<Record<Breakpoint, T>>;
export type GatewaySxProps = SxProps<GatewayTheme>;
