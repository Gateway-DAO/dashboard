import { PropsWithChildren, ReactNode } from "react";

import { Card, Divider, List, Stack, Typography } from "@mui/material";

type Props = {
  title: string;
  button?: ReactNode;
}

export default function AccountSection({ title, button, children }: PropsWithChildren<Props>) {
  return <>
    <Stack gap={3} sx={{ my: 4 }}>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="subtitle1">{title}</Typography>
        {button}
      </Stack>
      {children && <Stack component={List} divider={<Divider />} direction="column" sx={{
        backgroundColor: "background.paper",
        borderColor: "divider",
        borderRadius: 2,
        borderWidth: 1,
        borderStyle: "solid",
      }}>
        {children}
      </Stack>}
    </Stack>
  </>;
}
