import Link from 'next/link';

import { Button } from '@mui/material';

export default function ToDashboardLink() {
  return (
    <Button component={Link} href="/login" variant="contained">
      Open Dashboard
    </Button>
  );
}
