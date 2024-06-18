import ModalHeader from '@/components/modal/modal-header/modal-header';
import ModalRight from '@/components/modal/modal-right/modal-right';
import { formatBytes } from '@/utils/bytes';
import { numberToMoneyString } from '@/utils/money';
import {
  Button,
  Stack,
  Typography,
  Avatar,
  Box,
  alpha,
  Alert,
  AlertTitle,
  Tooltip,
  Chip,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import { SharingCost } from '@/components/sharing-cost/sharing-cost';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  files: Blob[];
  error: {
    title: string;
    description: string;
  };
  onFileUpload: (files: Blob[]) => void;
};

export default function UploadModal({
  isOpen,
  toggle,
  files,
  error,
  onFileUpload,
}: Props) {
  console.log(isOpen);
  return (
    <ModalRight
      open={isOpen}
      onClose={() => {
        onFileUpload([]);
        toggle();
      }}
    >
      <ModalHeader onClose={toggle} />
      <Typography variant="h4" mb={3}>
        Upload Summary
      </Typography>
      <Stack direction={'column'} sx={{ mt: 2 }}>
        {files.map((file, index) => (
          <Stack direction={'row'} justifyContent={'space-between'} key={index}>
            <Stack direction={'row'}>
              <Avatar alt="Avatar" variant="rounded">
                <PersonIcon />
              </Avatar>
              <Stack direction={'column'} sx={{ mx: 1.5 }}>
                <Typography variant="body1" fontWeight={400}>
                  {file.name}
                </Typography>
                <Typography variant="body2" fontWeight={400}>
                  {formatBytes(file.size)}
                </Typography>
              </Stack>
            </Stack>

            <Typography variant="body1" fontWeight={400}>
              {numberToMoneyString(file.size * 0.01)}
            </Typography>
          </Stack>
        ))}
      </Stack>
      {error.title.length > 0 && (
        <Alert variant="standard" severity="error" sx={{ mt: 10 }}>
          <AlertTitle>{error.title}</AlertTitle>
          {error.description}
        </Alert>
      )}
      <Box
        sx={(theme) => ({
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.focusOpacity
          ),
          borderRadius: theme.shape.borderRadius / 16, //Strange issue with MUI
          p: 2,
          textAlign: 'left',
          mt: error.title.length > 0 ? 2 : 10,
        })}
      >
        <Stack direction="row" gap={2}>
          <Stack direction={'row'} justifyContent={'space-between'}>
            <Typography variant="body1" fontWeight={400}>
              Total
            </Typography>
            <>
              <Typography
                fontSize={24}
                sx={{
                  textDecoration: 'line-through',
                }}
              >
                {numberToMoneyString(files[0]?.size * 0.01)}
              </Typography>
              <Tooltip title={'something'} arrow>
                <Chip label={'Free'} color="success" />
              </Tooltip>
            </>
          </Stack>
        </Stack>
        <Button
          onClick={toggle}
          fullWidth
          variant="contained"
          size="small"
          sx={{ mt: 1 }}
          disabled={error.title.length > 0}
        >
          Upload
        </Button>
      </Box>
    </ModalRight>
  );
}
