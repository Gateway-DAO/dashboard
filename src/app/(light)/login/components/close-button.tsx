import Link from "next/link";

import routes from "@/constants/routes";

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, IconButtonProps } from "@mui/material";

import { Step } from "./types";

type Props = {
  step: Step
} & IconButtonProps

export default function CloseButton({ step, ...props }: Props) {
  return (
    <IconButton
      component={Link}
      href={routes.home}
      sx={{
        width: 40,
        height: 40,
        cursor: 'pointer',
        background: "rgba(0, 0, 0, 0.08)",
        ...props.sx,
      }}
    >
      <CloseIcon />
    </IconButton>
  )
}
