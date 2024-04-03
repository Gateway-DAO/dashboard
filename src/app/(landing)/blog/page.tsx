'use client';
import { Divider, Typography } from '@mui/material';
import { HeaderContextProvider } from '../contexts/header-context';
import Header from '../components/header';
import LandingFooter from '../components/landing-footer/landing-footer';
import Cta from '../home/components/cta';
import Investors from '../home/components/investors';
import FeaturedBlogPosts from './components/featured';
import { brandColors } from '@/theme/config/brand';

export default function Blog() {
  return (
    <HeaderContextProvider>
      <Header />
      <FeaturedBlogPosts />
      <Cta />
      <Investors />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
