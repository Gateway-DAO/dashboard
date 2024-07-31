import { Typography, Container, Stack, Divider, Box } from '@mui/material';

import Footer from './components/footer/footer';
import Nav from './components/nav/nav';
import About from './sections/about/about';
import BlogSection from './sections/blog/blog';
import BuildWithUs from './sections/build-with-us/build-with-us';
import Hero from './sections/hero/hero';
import OurMission from './sections/our-mission/our-mission';
import ProtocolStats from './sections/protocol-stats/protocol-stats';
import UnlockGateway from './sections/unlock-gateway/unlock-gateway';
import UseCases from './sections/use-cases/use-cases';

export default function IndexPage() {
  return (
    <>
      <Nav />
      <Stack component="main">
        <Hero />
        <About />
        <Divider />
        <UseCases />
        <Box
          sx={{
            backgroundColor: '#212121',
          }}
        >
          <OurMission />
          <Divider variant="light" />
          <UnlockGateway />
          <Divider variant="light" />
          <ProtocolStats />
        </Box>
        <BlogSection />
        <BuildWithUs />
      </Stack>
      <Footer />
    </>
  );
}
