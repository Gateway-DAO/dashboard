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
  LinearProgress,
} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import { FileType } from '../../page';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';

type Props = {
  isOpen: boolean;
  toggle: () => void;
  files: FileType[];
  error: {
    title: string;
    description: string;
  };
  onFileUpload: (files: FileType[]) => void;
};

export default function UploadModal({
  isOpen,
  toggle,
  files,
  error,
  onFileUpload,
}: Props) {
  const [uploadingStarted, setUploadingStarted] = useState(false);

  // here create pda will come
  // const createPDA = useMutation({
  //   mutationKey: ['createPDA_V3'],
  //   mutationFn: async (data: CreateOrganizationSchema) =>
  //     (await getClientPrivateApi()).create_org({
  //       username: data.username,
  //       name: data.name,
  //       description: data.description,
  //       website: data.website || null,
  //     }),
  //   async onSuccess(data) {
  //     const org_id = data?.createOrganization?.id;

  //     try {
  //       await createOrgKey.mutateAsync({
  //         orgId: org_id,
  //         session: session.token,
  //       });
  //     } catch (error) {
  //       enqueueSnackbar('Failed to create key', { variant: 'error' });
  //     }
  //     if (image) {
  //       try {
  //         await uploadImage.mutateAsync({
  //           profilePictureUrl: image,
  //           org_id,
  //         });
  //       } catch (error) {
  //         enqueueSnackbar('Failed to update avatar', { variant: 'error' });
  //       }
  //     }
  //   },
  // });

  const uploadFile = useMutation({
    mutationKey: ['upload-file-pda'],
    mutationFn: async (file: Blob) => {
      const formData = new FormData();
      formData.append('pdaId', '604925204822016');
      formData.append('file', file);
      return fetch('https://v3-dev.protocol.mygateway.xyz/file/upload', {
        method: 'POST',
        body: formData,
        headers: {
          'x-api-key': process.env.NEXT_PUBLIC_API_KEY,
          Authorization: 'Bearer your-token',
        },
      });
    },
  });

  async function uploadingFiles() {
    setUploadingStarted(true);
    const updatingFilesState = files.map((file) => {
      file.pending = true;
      return file;
    });
    onFileUpload(updatingFilesState);
    files.map(async (file, index) => {
      const res = await uploadFile.mutateAsync(file.file);
      console.log(res);
    });
  }

  return (
    <ModalRight
      open={isOpen}
      onClose={() => {
        if (uploadingStarted) return;
        onFileUpload([]);
        toggle();
      }}
    >
      <ModalHeader onClose={toggle} />
      <Typography variant="h4" mb={3}>
        {uploadingStarted ? 'Uploads' : 'Upload Summary'}
      </Typography>
      <Stack direction={'column'} sx={{ mt: 2 }}>
        {files.map((fileInfo, index) => (
          <>
            <Stack
              direction={'row'}
              justifyContent={'space-between'}
              key={index}
            >
              <Stack direction={'row'}>
                <Avatar alt="Avatar" variant="rounded">
                  <PersonIcon />
                </Avatar>
                <Stack direction={'column'} sx={{ mx: 1.5 }}>
                  <Typography
                    variant="body1"
                    fontWeight={400}
                    sx={{ color: fileInfo.error ? '#8D3225' : '' }}
                  >
                    {fileInfo.file.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    fontWeight={400}
                    sx={{ color: fileInfo.error ? '#8D3225' : '' }}
                  >
                    {formatBytes(fileInfo.file.size)}
                  </Typography>
                </Stack>
              </Stack>

              {uploadingStarted ? (
                <></>
              ) : (
                <Typography
                  variant="body1"
                  fontWeight={400}
                  sx={{ color: fileInfo.error ? '#8D3225' : '' }}
                >
                  {numberToMoneyString(fileInfo.file.size * 0.000001)}
                </Typography>
              )}
            </Stack>
            {fileInfo.pending ? (
              <Box sx={{ width: '100%', mt: 1 }}>
                <LinearProgress />
              </Box>
            ) : (
              <></>
            )}
          </>
        ))}
      </Stack>
      {uploadingStarted ? (
        <></>
      ) : (
        <>
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
                    {numberToMoneyString(files[0]?.file?.size * 0.01)}
                  </Typography>
                  <Tooltip title={'something'} arrow>
                    <Chip label={'Free'} color="success" />
                  </Tooltip>
                </>
              </Stack>
            </Stack>
            <Button
              onClick={uploadingFiles}
              fullWidth
              variant="contained"
              size="small"
              sx={{ mt: 1 }}
              disabled={error.title.length > 0}
            >
              Upload
            </Button>
          </Box>
        </>
      )}
    </ModalRight>
  );
}
