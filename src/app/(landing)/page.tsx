import { Stack, Divider, Box } from '@mui/material';

import MainNavbar from '../components/main-navbar';
import About from './sections/about/about';
import BlogSection from './sections/blog/blog';
import BuildWithUs from './sections/build-with-us/build-with-us';
import Hero from './sections/hero/hero';
import OurMission from './sections/our-mission/our-mission';
import UnlockGateway from './sections/unlock-gateway/unlock-gateway';
import Featured from './sections/about/featured';

export default function IndexPage() {
  return (
    <>
      <MainNavbar />
      <Stack component="main">
        <Hero />
        <Featured />
        <About />
        <Box
          sx={{
            backgroundColor: '#212121',
          }}
        >
          <OurMission />
          <Divider variant="light" />
          <UnlockGateway />
          <Divider variant="light" />
        </Box>
        <BlogSection />
        <BuildWithUs />
      </Stack>
    </>
  );
}
