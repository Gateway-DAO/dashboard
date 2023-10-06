import { useState } from 'react';

import ModalRight from '@/components/modal/modal-right/modal-right';
import ModalTitle from '@/components/modal/modal-title/modal-title';
import { orgSettings } from '@/locale/en/settings';

import { AddOutlined } from '@mui/icons-material';
import { Button } from '@mui/material';

type Props = {
  onSuccess: () => void;
  disabled: boolean;
};

export default function AddMember({ disabled }: Props) {
  const [isOpen, setOpen] = useState(false);
  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Button
        variant="text"
        startIcon={<AddOutlined />}
        disabled={disabled}
        onClick={onOpen}
      >
        {orgSettings.membersArea.add_member}
      </Button>
      <ModalRight open={isOpen} onClose={onClose}>
        <ModalTitle onClose={onClose} />
      </ModalRight>
    </>
  );
}
