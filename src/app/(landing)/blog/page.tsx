'use client';
import { Divider, Typography } from '@mui/material';
import { HeaderContextProvider } from '../contexts/header-context';
import Header from '../components/header';
import LandingFooter from '../components/landing-footer/landing-footer';
import Cta from '../home/components/cta';
import Investors from '../home/components/investors';
import LatestBlogPosts from './components/latest-blog-posts';
import { brandColors } from '@/theme/config/brand';

export default function Blog() {
  return (
    <HeaderContextProvider initialVariant="dark">
      <Header />

      <LatestBlogPosts />
      <Cta />
      <Investors />
      <LandingFooter variant="dark" />
    </HeaderContextProvider>
  );
}
