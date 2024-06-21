import Image from 'next/image';

import UserData from '@/app/(light)/dashboard/components/user-data/user-data';
import { DataOutlinedIcon } from '@/components/icons';
import { pda } from '@/locale/en/pda';
import { Proof } from '@/services/protocol-v3/types';
import { FileType, getFileTypeByMime, getIconFile } from '@/utils/pda';

import { CheckOutlined } from '@mui/icons-material';
import { Avatar, Box, Divider, Stack, Typography } from '@mui/material';

type Props = {
  proof: Proof;
};

export default function ShareCopyFormSuccessfully({ proof }: Props) {
  return (
    <>
      <Stack>
        <Box sx={{ position: 'absolute', top: { xs: 24, md: 48 } }}>
          <Avatar
            sx={{ backgroundColor: 'success.main', color: 'action.active' }}
          >
            <CheckOutlined />
          </Avatar>
        </Box>
        <Typography
          id="proof-created-title"
          component="h3"
          fontSize={34}
          sx={{ mb: 6 }}
        >
          {pda.share.successfully_title}
        </Typography>
        <Stack gap={2}>
          <Box
            sx={{
              borderRadius: 1,
              border: '1px solid',
              borderColor: 'divider',
              p: 2,
            }}
          >
            <Typography component="p" variant="caption" sx={{ mb: 1 }}>
              Shared with
            </Typography>
            <UserData
              did={proof.verifier!.did}
              username={proof.verifier!.username}
            />
          </Box>
          <Box
            sx={{
              borderRadius: 1,
              p: 2,
              background: 'rgba(0, 0, 0, 0.06)',
            }}
          >
            <Typography component="p" variant="caption" sx={{ mb: 1 }}>
              Data
            </Typography>
            <Stack gap={1} divider={<Divider />}>
              {proof.data?.map((data) => {
                const name = data.structured
                  ? data.dataAsset?.title
                  : data.fileName;
                const fileType = getFileTypeByMime(data);
                const icon = getIconFile(fileType);

                return (
                  <Stack direction={'row'} gap={0.25} key={data.id}>
                    {fileType === FileType.pda ? (
                      <DataOutlinedIcon color="primary" />
                    ) : (
                      <Image
                        src={icon}
                        alt={`${fileType} icon`}
                        width={24}
                        height={24}
                      />
                    )}
                    <Typography variant="body1" sx={{ mx: 2 }}>
                      {name}
                    </Typography>
                  </Stack>
                );
              })}
            </Stack>
          </Box>
          {/* <Link
            color="text.primary"
            underline="hover"
            href="#"
            variant="caption"
          >
            View transaction ID <OpenInNew sx={{ fontSize: 12 }} />
          </Link> */}
        </Stack>
      </Stack>
    </>
  );
}
