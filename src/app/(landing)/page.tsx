import { Typography, Container, Stack } from '@mui/material';

import Nav from './components/nav/nav';
import About from './sections/about/about';
import Hero from './sections/hero/hero';

export default function IndexPage() {
  return (
    <>
      <Nav />
      <Stack component="main">
        <Hero />
        <About />
      </Stack>
      <footer>
        <Container maxWidth="lg">
          <Typography variant="h6" align="center" gutterBottom>
            Build the User Sovereign Web with us
          </Typography>
          <Typography
            variant="subtitle1"
            align="center"
            color="textSecondary"
            component="p"
          >
            The Decentralized Private Computer is growing a new data economy.
          </Typography>
        </Container>
      </footer>
    </>
  );
}
