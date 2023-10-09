import { useState } from 'react';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { orgSettings } from '@/locale/en/settings';

import { AddOutlined } from '@mui/icons-material';
import { Button, Stack } from '@mui/material';

import AddMemberForm from './add-member-form';

type Props = {
  onSuccess: () => void;
  disabled: boolean;
};

export default function AddMember({ onSuccess, disabled }: Props) {
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
        <ModalHeader onClose={onClose} />
        <AddMemberForm
          onSuccess={() => {
            onClose();
            onSuccess();
          }}
        />
      </ModalRight>
    </>
  );
}
