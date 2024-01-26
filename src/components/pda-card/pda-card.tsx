import Link from 'next/link';

import { coachMarkKeys } from '@/constants/coach-mark';
import { instructionGuideKeys } from '@/constants/instruction-guide';
import useCoachMarkal from '@/hooks/use-coach-mark';
import useLocalStorageInstructionGuide from '@/hooks/use-instruction-guide';
import { coachMark } from '@/locale/en/coach-mark';

import { Card, CardActionArea, Stack, Typography } from '@mui/material';

import CoachMark from '../coach-mark/coach-mark';
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
  const { showCoachMark, setCoachMark } = useCoachMarkal({
    key: coachMarkKeys.start_using_pda,
    value: id,
  });

  const { onRemoveStorage } = useLocalStorageInstructionGuide({
    storageKey: instructionGuideKeys.claim_your_first_pda,
  });

  const onFinishCoachMark = () => {
    onRemoveStorage();
    setCoachMark(null);
    localStorage.removeItem('widget-educational-session');
  };

  return (
    <CoachMark
      title={coachMark.start_usign_now.title}
      description={coachMark.start_usign_now.description}
      textBtn={coachMark.start_usign_now.btn_text}
      href={href}
      onClickCard={() => {
        onFinishCoachMark();
        if (onClick) {
          onClick();
        }
      }}
      onClose={onFinishCoachMark}
      open={showCoachMark}
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
          onClick={() => {
            onFinishCoachMark();
            if (onClick) {
              onClick();
            }
          }}
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
    </CoachMark>
  );
}
