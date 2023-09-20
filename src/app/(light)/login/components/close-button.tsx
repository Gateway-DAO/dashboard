import Link from "next/link";
import { useMemo } from "react";

import routes from "@/constants/routes";

import CloseIcon from '@mui/icons-material/Close';
import { IconButton, IconButtonProps } from "@mui/material";

import { useStepState } from "../providers/step-provider";


type Props = IconButtonProps

const sx = {
  width: 40,
  height: 40,
  cursor: 'pointer',
  background: "rgba(0, 0, 0, 0.08)",
}

export default function CloseButton(props: Props) {

  const { step, setState } = useStepState()

  let customProps: any = {
    component: Link,
    href: routes.home,
  };

  if (step === "verify-email-login-code") {
    customProps = {
      onClick: () => setState({ step: "initial" }),
    }
  }

  return (
    <IconButton
      {...customProps}
      sx={{
        ...sx,
        ...props.sx,
      }}
    >
      <CloseIcon />
    </IconButton>
  )
}
