'use client';

import Script from 'next/script';

import { Box } from '@mui/material';
import '../cards.min.css';

type Props = {
  renderHtml: string;
};

export function RenderBlog({ renderHtml }: Props) {
  return (
    <>
      <Box dangerouslySetInnerHTML={{ __html: renderHtml }}></Box>
      <Script src="/js/video.js" />
    </>
  );
}
