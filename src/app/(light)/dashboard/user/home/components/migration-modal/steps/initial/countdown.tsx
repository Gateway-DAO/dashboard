'use client';
import { useEffect, useState } from 'react';

import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import duration from 'dayjs/plugin/duration';
import utc from 'dayjs/plugin/utc';

import { Box, Stack, Typography } from '@mui/material';
dayjs.extend(utc);
dayjs.extend(advancedFormat);
dayjs.extend(duration);

const finalDate = dayjs('2024-06-25');

const finalDateFormatted = finalDate.format('MMMM Do, YYYY');

type Countdown = {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
};

const getCountdown = (): Countdown => {
  const now = dayjs();
  const diff = finalDate.diff(now);
  const duration = dayjs.duration(diff);
  return {
    days: duration.days().toString(),
    hours: duration.hours().toString(),
    minutes: duration.minutes().toString(),
    seconds: duration.seconds().toString(),
  };
};

export default function Countdown() {
  const [countdown, setCountdown] = useState<Countdown>(getCountdown);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box p={2} border="1px solid" borderColor="divider" borderRadius={1}>
      <Typography variant="body1" fontWeight="bold">
        Countdown to you migrate your data
      </Typography>
      <Typography variant="body1" color="text.secondary" mb={1}>
        You will be able to migrate the data until {finalDateFormatted}.
      </Typography>
      <Stack direction="row" flexWrap="nowrap" alignItems="stretch" gap={1}>
        <CountdownItem value={countdown.days} label="days" aria="Days" />
        <CountdownItem value={countdown.hours} label="hours" aria="Hours" />
        <CountdownItem value={countdown.minutes} label="min" aria="Minutes" />
        <CountdownItem value={countdown.seconds} label="sec" aria="Seconds" />
      </Stack>
    </Box>
  );
}

function CountdownItem({
  value,
  label,
  aria,
}: {
  value: string;
  label: string;
  aria: string;
}) {
  return (
    <Stack
      flexDirection="column"
      alignItems="center"
      borderRadius={0.5}
      bgcolor="primary.light"
      aria-label={`${aria}: ${value}`}
      flex={1}
      py={1}
    >
      <Typography component="span" variant="h4" color="primary" mb={-0.5}>
        {value}
      </Typography>
      <Typography
        component="span"
        variant="overline"
        color="text.secondary"
        textTransform="uppercase"
      >
        {label}
      </Typography>
    </Stack>
  );
}
