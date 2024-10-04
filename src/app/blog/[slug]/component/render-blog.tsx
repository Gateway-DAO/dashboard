'use client';

import Script from 'next/script';

import { Box } from '@mui/material';
import './cards.min.css';

type Props = {
  renderHtml: string;
};

export function RenderBlog({ renderHtml }: Props) {
  return (
    <>
      <Box dangerouslySetInnerHTML={{ __html: renderHtml }}></Box>
      <Script src="/js/video.js" />
      <Script
        id="image-script"
        dangerouslySetInnerHTML={{
          __html: `
            const images = document.querySelectorAll('.kg-image');
            images.forEach((image) => {
                image.tabIndex = 0;
                // add button role to image
                image.setAttribute('role', 'button');
                // add aria-label to image
                image.setAttribute('aria-label', 'Expand image in new tab');

                const openImage = () => {
                  window.open(image.src, '_blank');
                };

                // opens image url in new tab
                image.addEventListener('click', openImage);

                // open image url in new tab on enter key
                image.addEventListener('keydown', (e) => {
                  if (e.key === 'Enter') {
                    openImage()
                  }
                });
            });
          `,
        }}
      />
    </>
  );
}
