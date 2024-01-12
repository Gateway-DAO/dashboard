import Link from 'next/link';

import { educationalsKeys } from '@/constants/educational';
import useEducational from '@/hooks/use-educational';
import useHelpCard from '@/hooks/use-help-card';
import { instructionGuide } from '@/locale/en/educational';

import { Card, CardActionArea, Stack, Typography } from '@mui/material';

import Educational from '../educational/educational';
import GTWAvatar from '../gtw-avatar/gtw-avatar';
import { TextStatusChip } from '../text-status-chip/text-status-chip';
import { PdaCardProps } from './type';

export default function PdaCard({
  id,
  name,
  userId,
  userImage,
  userName,
  dashed,
  href,
  onClick,
  status,
}: PdaCardProps) {
  const { showEducational, setEducational } = useEducational({
    key: 'start-using-pda',
    value: id,
  });

  const { onRemoveStorage } = useHelpCard({
    storageKey: educationalsKeys.help_cta_claim_your_first_pda,
  });

  return (
    <Educational
      title={instructionGuide.start_usign_now.title}
      description={instructionGuide.start_usign_now.description}
      textBtn={instructionGuide.start_usign_now.btn_text}
      href={href}
      onClickCard={() => {
        onRemoveStorage();
        if (onClick) {
          onClick();
        }
      }}
      onClose={() => {
        onRemoveStorage();
        setEducational(null);
      }}
      open={showEducational}
    >
      <Stack
        component={Card}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        variant="outlined"
        gap={1}
        sx={{
          ...(dashed && { borderStyle: 'dashed' }),
          width: '100%',
          overflow: 'visible',
        }}
      >
        <CardActionArea
          className="pda-card"
          {...(href && {
            component: Link,
            href: href,
          })}
          onClick={onClick}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            px: 2,
            pt: 2,
            pb: 3,
            height: '100%',
            gap: 2,
            backgroundColor: 'common.white',
          }}
          title={name}
        >
          <Stack alignItems="flex-start">
            <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3 }}>
              <GTWAvatar
                src={userImage}
                size={32}
                name={userId}
                alt={userName}
              />
              <Typography variant="body2" sx={{ flexGrow: 1 }} noWrap>
                {userName}
              </Typography>
            </Stack>
            <Typography fontWeight={700} className="pda-card-name">
              {name}
            </Typography>
          </Stack>
          <TextStatusChip variant="outlined" status={status} size="small" />
        </CardActionArea>
      </Stack>
    </Educational>
  );
}
