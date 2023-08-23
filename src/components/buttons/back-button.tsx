"use client";

import { useRouter } from 'next/navigation';

import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Avatar, IconButton } from '@mui/material';

export default function BackButton() {
  const router = useRouter();
  return (
    <IconButton onClick={router.back}>
      {/* TODO: Remove background color */}
      <Avatar sx={{ backgroundColor: 'action.selected' }}>
        <ArrowBackIosNewIcon
          sx={{ width: 16, height: 16, color: 'text.secondary' }}
        />
      </Avatar>
    </IconButton>
  )
}
