import { ReactNode, useState } from 'react';

import { Button, Drawer } from '@mui/material';

type Props = {
  children?: ReactNode;
};

export default function GtwDrawer({ children }: Props) {
  const [boxOpen, setBoxOpen] = useState(false);
  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setBoxOpen(open);
    };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Drawer</Button>
      <Drawer anchor="bottom" open={boxOpen} onClose={toggleDrawer(false)}>
        {children}
      </Drawer>
    </>
  );
}
