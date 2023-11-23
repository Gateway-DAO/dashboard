import IssuanceIcon from '@/components/icons/issuance';
import ModalTitle from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { common } from '@/locale/en/common';
import { numberToMoneyString } from '@/utils/money';

import { EditOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Stack, Typography } from '@mui/material';

type Props = {
  amount: number;
  price: number;
  total: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function Preview({
  amount,
  price,
  total,
  isOpen,
  onClose,
}: Props) {
  return (
    <ModalRight open={isOpen} onClose={onClose}>
      <ModalTitle onClose={onClose} />
      <Typography variant="h5">Issuance Summary</Typography>
      <Box mt={4} sx={{ p: 3, backgroundColor: 'primary.50', borderRadius: 1 }}>
        {[
          { label: 'PDA quantity', value: amount },
          {
            label: 'Cost per PDA',
            value: numberToMoneyString(price),
          },
        ].map(({ label, value }) => (
          <Stack
            direction="row"
            justifyContent="space-between"
            key={label}
            gap={1}
          >
            <Typography>{label}</Typography>
            <Typography>{value}</Typography>
          </Stack>
        ))}
        <Stack direction="row" justifyContent="space-between" gap={1} mt={2}>
          <Typography>Total</Typography>
          <Typography variant="h5">{total}</Typography>
        </Stack>
        <Stack direction="row" justifyContent="flex-end" mt={4} gap={1}>
          <Button variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            endIcon={<IssuanceIcon />}
          >
            Issue now
          </Button>
        </Stack>
      </Box>

      <Box
        mt={2}
        sx={{ borderRadius: 1, border: 1, borderColor: 'divider', p: 3 }}
      >
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          gap={1}
        >
          <Typography variant="h5">Owner</Typography>
          <Button onClick={onClose} endIcon={<EditOutlined />}>
            {common.actions.edit}
          </Button>
        </Stack>
        <Typography mt={2}>
          This PDA is designed to provide a secure and reliable way to verify an
          individual's achievement in a specific skill or subject area. It can
          be used by learners to demonstrate their knowledge and skills to
          potential employers or educational institutions, or by organizations
          to track the progress and success of their training programs.
        </Typography>
        <Box mt={2}>OWNERSHIP</Box>
        <Divider sx={{ mx: -3, my: 4 }} />
        <Typography variant="subtitle1">Claim</Typography>
      </Box>
    </ModalRight>
  );
}
