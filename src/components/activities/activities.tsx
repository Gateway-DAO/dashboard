'use client';
import { useState } from 'react';

import { common } from '@/locale/en/common';
import { pda } from '@/locale/en/pda';
import { Activity } from '@/services/protocol/types';
import { timestampToString } from '@/utils/date';
import { getExplorer } from '@/utils/web3';

import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Stack,
  Typography,
  Divider,
} from '@mui/material';

type Props = {
  activities: Activity[];
  activitiesTextsType: Record<string, string>;
};

const activityText = (
  type: string,
  activitiesTextsType?: Record<string, string>
) => {
  return activitiesTextsType ? activitiesTextsType[type] : 'Unknown activity';
};

export default function Activities({
  activities,
  activitiesTextsType = {
    Issued: pda.activities.issued,
    Revoked: pda.activities.revoked,
    Suspended: pda.activities.suspended,
    Reactivated: pda.activities.reactivated,
    Updated: pda.activities.updated,
  },
}: Props) {
  const [expanded, setExpanded] = useState<boolean>(false);

  const handleChange =
    () => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpanded(isExpanded);
    };

  return (
    <>
      {activities?.length > 0 && (
        <Stack>
          <Accordion
            id="pda-button-activity"
            expanded={expanded}
            onChange={handleChange()}
            sx={{
              ':before': { display: 'none' },
              m: '0!important',
              background: 'transparent!important',
              boxShadow: 'none!important',
            }}
          >
            <AccordionSummary
              sx={{
                p: 0,
                m: 0,
                mb: 1,
                position: 'relative',
                minHeight: '30px!important',
                '& > *': {
                  p: 0,
                  m: '0!important',
                  minHeight: '30px!important',
                },
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ width: '100%' }}
              >
                <Stack direction="row" alignItems="center" flexGrow={1}>
                  <Typography
                    fontSize={12}
                    sx={{
                      flexGrow: 0,
                      mr: 1,
                      fontWeight: 700,
                      color: 'primary.main',
                    }}
                  >
                    {expanded
                      ? common.actions.hide_activity
                      : common.actions.show_activity}
                  </Typography>
                  <ArrowDropDownIcon
                    sx={{
                      transform: expanded ? 'rotate(180deg)' : 'none',
                      color: 'primary.main',
                      transition: 'all .3s ease',
                    }}
                  />
                </Stack>
              </Stack>
            </AccordionSummary>
            <AccordionDetails sx={{ p: 0, m: 0 }}>
              <Stack sx={{ mb: 2 }} gap={1} divider={<Divider />}>
                {activities
                  ?.sort(
                    (a: any, b: any) =>
                      new Date(b.timestamp).getTime() -
                      new Date(a.timestamp).getTime()
                  )
                  .map((activity: any, index: number) => (
                    <Stack
                      key={index}
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      gap={2}
                    >
                      <Stack>
                        <Typography fontSize={14}>
                          {activityText(activity?.type, activitiesTextsType)}
                        </Typography>
                        <Typography
                          fontSize={12}
                          sx={{ color: 'text.secondary' }}
                        >
                          {timestampToString(
                            activity?.timestamp,
                            undefined,
                            pda.indeterminate
                          )}
                        </Typography>
                      </Stack>
                      <a
                        href={`${getExplorer(
                          process.env.NEXT_PUBLIC_PROTOCOL_ENV === 'production'
                            ? 137
                            : 80001
                        )}/tx/${activity?.txHash}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <OpenInNewIcon
                          sx={{
                            color: 'text.secondary',
                          }}
                          fontSize="small"
                        />
                      </a>
                    </Stack>
                  ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        </Stack>
      )}
    </>
  );
}
