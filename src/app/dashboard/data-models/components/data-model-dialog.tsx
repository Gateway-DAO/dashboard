import CopyBox from '@/components/copy-box/copy-box';
import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { DataModel } from '@/services/api/models';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import { Stack, Typography } from '@mui/material';

type Props = {
  open: boolean;
  dataModel?: DataModel;
  onClose: () => void;
};

export function DataModelDialog({ open, onClose, dataModel }: Props) {
  return (
    <ModalRight open={open} onClose={onClose}>
      <ModalHeader onClose={onClose} />
      <Stack gap={3}>
        <Typography variant="h4" gutterBottom>
          {dataModel?.title}
        </Typography>
        {dataModel?.description && (
          <Typography variant="body1">{dataModel.description}</Typography>
        )}
        {dataModel && (
          <CopyBox title="Data model ID" value={dataModel.id.toString()} />
        )}
        <Stack
          sx={{
            'code, code span': {
              fontFamily: 'monospace',
            },
          }}
        >
          <Typography variant="subtitle1">Schema</Typography>
          {dataModel?.schema && (
            <SyntaxHighlighter
              language="json"
              style={vs2015}
              customStyle={{
                borderRadius: 12,
              }}
              showLineNumbers
              lineNumberStyle={{ opacity: 0.5 }}
            >
              {JSON.stringify(dataModel.schema, null, 4)}
            </SyntaxHighlighter>
          )}
        </Stack>
      </Stack>
    </ModalRight>
  );
}
