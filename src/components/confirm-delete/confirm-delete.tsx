import { FormEventHandler, useCallback, useState } from 'react';

import { common } from '@/locale/en/common';
import { settings } from '@/locale/en/settings';
import { useToggle } from '@react-hookz/web';

import {
  Button,
  Checkbox,
  FormControlLabel,
  Stack,
  TextField,
  Typography,
} from '@mui/material';

type Props = {
  textKey: string;
  checkText: string;
  buttonText: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export function ConfirmDelete({
  textKey,
  checkText,
  buttonText,
  onConfirm,
  onCancel,
}: Props) {
  const [inputText, setInputText] = useState('');
  const [checkedDelete, toggleChecked] = useToggle(false);
  const onSubmit: FormEventHandler<HTMLFormElement> = useCallback(
    (event) => {
      event.preventDefault();
      onConfirm();
    },
    [onConfirm]
  );
  return (
    <Stack pt={6} component="form" onSubmit={onSubmit}>
      <Typography fontWeight={600} sx={{ mb: 3 }}>
        {`${settings.connected_accounts.modal_confirm_delete.text_confirm1} “${textKey}” ${settings.connected_accounts.modal_confirm_delete.text_confirm2}`}
      </Typography>
      <TextField
        type="text"
        value={inputText}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          setInputText(event.target.value);
        }}
        id="confirm-deactivate-gateway-id"
        sx={{ mb: 3 }}
      />
      <FormControlLabel
        control={<Checkbox />}
        label={checkText}
        checked={checkedDelete}
        onChange={toggleChecked}
      />
      <Stack py={6} direction="row" gap={1} justifyContent="space-between">
        <Button variant="outlined" fullWidth size="large" onClick={onCancel}>
          {common.actions.cancel}
        </Button>
        <Button
          disabled={inputText !== textKey || !checkedDelete}
          variant="contained"
          color="error"
          fullWidth
          size="large"
          type="submit"
          sx={{ textTransform: 'capitalize' }}
        >
          {buttonText}
        </Button>
      </Stack>
    </Stack>
  );
}
