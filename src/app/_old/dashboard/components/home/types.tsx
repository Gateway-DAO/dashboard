import { SxProps } from '@mui/material';

export type HomeCardProps = {
  icon: (props: any) => JSX.Element;
  iconStyle?: SxProps;
  heading: string;
  title: string;
  subtitle: string;
  link: string;
  btn_text: string;
  target: string;
};
export type HomeBannerProps = {
  icon: (props: any) => JSX.Element;
  iconStyle?: SxProps;
  title: string;
  subtitle: string;
  btn_link: string;
  btn_text: string;
  target?: string;
};
