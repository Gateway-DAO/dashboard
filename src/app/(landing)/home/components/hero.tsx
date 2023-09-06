'use client';
import { useEffect, useState, useRef } from 'react';

import gsap from 'gsap';

import { Box, Typography } from '@mui/material';

import Wrapper from '../../components/wrapper';

export default function Hero() {
  const [currentWord, setCurrentWord] = useState<string>('create');
  const refCurrentWordElement = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const words = ['create', 'change', 'sell'];
    let currentIndex = 0;

    const changeWord = () => {
      currentIndex = currentIndex === words.length - 1 ? 0 : currentIndex + 1;

      const tl = gsap.timeline();
      tl.to(refCurrentWordElement.current, { autoAlpha: 0, duration: 0.3 });
      tl.call(() => {
        setCurrentWord(words[currentIndex]);
      });
      tl.to(refCurrentWordElement.current, { autoAlpha: 1, duration: 0.3 });
    };

    const interval = setInterval(changeWord, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#771AC9',
        height: '100vh',
        paddingTop: '248px',
        width: '100%',
      }}
    >
      <Wrapper>
        <Typography
          sx={{
            mb: '30px',
            display: 'block',
            span: {
              fontSize: '82px',
              fontWeight: 400,
              color: '#fff',
              letterSpacing: '0.412px',
              lineHeight: '82px',
            },
          }}
          component="span"
        >
          <Typography>
            <span>The safer and faster</span>
          </Typography>

          <Typography>
            <span>
              way for you to{' '}
              <span ref={refCurrentWordElement} style={{ color: '#70ECFE' }}>
                {currentWord}
              </span>
            </span>
          </Typography>

          <Typography>
            <span>private data</span>
          </Typography>
        </Typography>

        <Typography sx={{ fontSize: '20px', color: '#fff' }}>
          Gateway is the foundation to securely create, own, manage, <br />
          and verify private data assets (PDAs) across the digital world.
        </Typography>
      </Wrapper>
    </Box>
  );
}
