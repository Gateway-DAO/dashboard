"use client"
import { PropsWithChildren } from "react";

import { common } from "@/locale/en/common";
import { useToggle } from "@react-hookz/web";

import { ArrowDropDown, ArrowDropUp } from "@mui/icons-material";
import { Button, Collapse, Stack } from "@mui/material";

type Props = {
  initialVisible?: boolean;
  hiddenLabel?: string;
  visibleLabel?: string;
}

export default function ToggleCollapse({ initialVisible = false, hiddenLabel = common.actions.show, visibleLabel = common.actions.hide, children }: PropsWithChildren<Props>) {
  const [isVisible, toggleVisible] = useToggle(initialVisible);
  return <Stack gap={2}>
    <Button
      variant="text"
      onClick={toggleVisible}
      sx={{ alignSelf: "flex-start" }}
      endIcon={!isVisible ? <ArrowDropDown /> : <ArrowDropUp />}
    >{!isVisible ? hiddenLabel : visibleLabel}</Button>
    <Collapse in={isVisible}>
      {children}
    </Collapse>
  </Stack>
}
