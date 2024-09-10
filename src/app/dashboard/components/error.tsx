'use client';
import { signOut } from 'next-auth/react';
import { Component, PropsWithChildren } from 'react';

import GatewayBrokenIcon from '@/components/icons/gateway-broken';

import { Button, Container, Stack, Typography } from '@mui/material';

class DashboardErrorBoundary extends Component<PropsWithChildren> {
  state: { hasError: boolean } = { hasError: false };
  constructor(props: any) {
    super(props);

    // Define a state variable to track whether is an error or not
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI

    return { hasError: true };
  }
  componentDidCatch(error: any, errorInfo: any) {
    // You can use your own error logging service here
    // console.log({ error, errorInfo });
  }
  render() {
    // Check if the error is thrown
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: 'calc(100dvh)',
          }}
        >
          <GatewayBrokenIcon sx={{ height: 150, width: 300 }} />
          <Typography component="h2" variant="h2" sx={{ mb: 1 }}>
            Oops, there was an error!
          </Typography>
          <Typography
            component="p"
            variant="body1"
            color="text.secondary"
            sx={{ mb: 2 }}
          >
            Please try refreshing the page or contact support.
          </Typography>
          <Stack spacing={2} direction="row">
            <Button
              variant="contained"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
            <Button variant="outlined" onClick={() => signOut()}>
              Sign out
            </Button>
          </Stack>
        </Container>
      );
    }

    // Return children components in case of no error

    return this.props.children;
  }
}

export default DashboardErrorBoundary;
