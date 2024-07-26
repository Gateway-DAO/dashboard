import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Button,
  Card,
  CardContent,
  Stack,
} from '@mui/material';

import Nav from './components/nav';

export default function IndexPage() {
  return (
    <>
      <Nav />
      <main>
        <div>
          <Container maxWidth="sm" sx={{ height: '400vh' }}>
            <Typography
              component="h1"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
            >
              The Decentralized Private Computer
            </Typography>
            <Typography
              variant="h5"
              align="center"
              color="textSecondary"
              paragraph
            >
              Convergence will make it possible to encrypt, store, and compute
              data in your hands.
            </Typography>
            <div>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button variant="contained" color="primary">
                    Learn More
                  </Button>
                </Grid>
              </Grid>
            </div>
          </Container>
        </div>
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
      </main>
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
