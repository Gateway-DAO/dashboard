import documentationRoutes from '@/constants/documentationRoutes';
import { playground } from '@/locale/en/playground';

import OpenInNew from '@mui/icons-material/OpenInNew';
import { Button, Link, Stack, Typography } from '@mui/material';

const BoxButton = ({ text, href }: { text: string; href: string }) => {
  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      component={Link}
      target="_blank"
      href={href}
      sx={{
        borderRadius: '16px',
        border: '1px solid',
        borderColor: 'divider',
        background: 'white',
        py: 1,
        flex: 1,
        px: 3,
        gap: 2,
        cursor: 'pointer',
        color: 'text.primary',
        textDecoration: 'none',
      }}
    >
      <Typography variant="subtitle1">{text}</Typography>
      <OpenInNew />
    </Stack>
  );
};

export default function DocumentationLinks() {
  return (
    <Stack gap={1} direction="row" justifyContent="space-between" mb={4}>
      <BoxButton text={playground.button1} href={documentationRoutes.home} />
      <BoxButton
        text={playground.button2}
        href={documentationRoutes.createPDA}
      />
      <BoxButton text={playground.button3} href={documentationRoutes.me} />
    </Stack>
  );
}
