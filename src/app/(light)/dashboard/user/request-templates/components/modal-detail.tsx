import CopyBox from '@/components/copy-box/copy-box';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';

import { Typography } from '@mui/material';

import TabsStructure from './tabs-structure';

export default function ModalDetail({ id }: { id: string }) {
  return (
    <ModalRight open onClose={() => console.log('close')}>
      <ModalHeader onClose={() => console.log('day')} />
      <Typography variant="h4" mb={3}>
        Template name
      </Typography>
      <Typography variant="body1" mb={3}>
        Lorem ipsum dolor sit amet
      </Typography>
      <CopyBox title="Data request template ID" value={id} />
      <TabsStructure />
    </ModalRight>
  );
}
