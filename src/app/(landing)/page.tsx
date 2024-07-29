import {
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';

import Hero from './components/hero/hero';
import Nav from './components/nav/nav';

export default function IndexPage() {
  return (
    <>
      <Nav />
      <Stack>
        <Hero />
        <Container>
          <Grid container spacing={4}>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Encrypt, store, and power user-controlled data sharing with
                    Gateway
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    Tooling for any use case
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Container>
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
