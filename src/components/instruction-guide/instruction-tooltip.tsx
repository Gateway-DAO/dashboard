import { Step, TooltipRenderProps } from 'react-joyride';

import CloseIcon from '@mui/icons-material/Close';
import { Box, Button, IconButton, Typography } from '@mui/material';
import { ButtonProps } from '@mui/material';
import { Stack } from '@mui/system';

export interface InstructionToolTipProps
  extends Omit<TooltipRenderProps, 'step'> {
  step: Step & { btnProps?: ButtonProps };
}

export function InstructionToolTip({
  step,
  closeProps,
}: InstructionToolTipProps) {
  return (
    <Box
      sx={{
        backgroundColor: '#499AA5',
        borderRadius: 1,
        padding: 2,
      }}
    >
      <Stack
        direction={'row'}
        justifyContent={'space-between'}
        alignItems={'center'}
        marginBottom={0.8}
      >
        <Typography variant="subtitle1" color={'white'}>
          {step.title && step.title}
        </Typography>
        <IconButton onClick={closeProps.onClick}>
          <CloseIcon htmlColor="#FFFFFF" />
        </IconButton>
      </Stack>
      <Typography
        width={'16.5em'}
        variant="body1"
        color={'#FFFFFF'}
        gutterBottom
        marginBottom={2}
      >
        {step.content && step.content}
      </Typography>
      {step?.btnProps && (
        <Button
          variant="outlined"
          size="small"
          href={step.btnProps.href}
          sx={{
            '&:hover': {
              backgroundColor: 'lightgray',
              border: 0,
            },
            color: '#499AA5',
            backgroundColor: 'white',
            border: 0,
          }}
        >
          {step.btnProps.title}
        </Button>
      )}
    </Box>
  );
}
