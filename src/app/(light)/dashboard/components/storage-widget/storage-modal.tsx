import Link from 'next/link';

import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import externalLinks from '@/constants/externalLinks';

import LaunchIcon from '@mui/icons-material/Launch';
import { Button, Typography } from '@mui/material';
type Props = {
  isOpen: boolean;
  toggle: () => void;
};

export default function StorageModal({ isOpen, toggle }: Props) {
  return (
    <ModalRight open={isOpen} onClose={toggle}>
      <ModalHeader onClose={toggle} />
      <Typography variant="h4" mb={3}>
        Upgrade storage (soon)
      </Typography>
      <Typography variant="body1" mb={3}>
        We're currently in the process of implementing this feature. As part of
        our ongoing efforts, we're conducting a brief research on storage
        upgrades. It consists of just two questions. Would you like to assist
        us?
      </Typography>
      <Button
        component={Link}
        href={externalLinks.increase_storage}
        target="_blank"
        variant="contained"
        color="primary"
        onClick={toggle}
        startIcon={<LaunchIcon />}
      >
        Answer questions
      </Button>
    </ModalRight>
  );
}
