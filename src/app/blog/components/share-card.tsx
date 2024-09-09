'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { BiLogoLinkedinSquare } from 'react-icons/bi';
import { FaReddit } from 'react-icons/fa';

import LinkIcon from '@mui/icons-material/Link';
import XIcon from '@mui/icons-material/X';
import { IconButton, Stack } from '@mui/material';

type SocialProps = {
  title?: string;
  url?: string;
  description?: string;
  mini?: boolean;
};

function objectToParams(object: {
  [key: string]: string | boolean | number | undefined | null;
}) {
  const params = Object.entries(object)
    .filter(([, value]) => value !== undefined && value !== null)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(String(value))}`
    );

  return params.length > 0 ? `?${params.join('&')}` : '';
}

const tweetLink = (props: SocialProps) =>
  `https://twitter.com/intent/tweet${objectToParams({
    text: props.description,
    url: props.url,
  })}`;

const redditLink = (props: SocialProps) =>
  `https://reddit.com/submit${objectToParams(props)}`;

const linkedinLink = (props: SocialProps) =>
  `http://www.linkedin.com/shareArticle${objectToParams({
    mini: true,
    url: props?.url,
    title: props?.title,
    summary: props?.description,
    source: 'mygateway.xyz',
  })}`;

export default function ShareButtonFn({
  title = 'myGateway_xyz',
  description = 'check out this latest blog from Gateway',
}: SocialProps) {
  const [url, setUrl] = useState('');

  useEffect(() => {
    setUrl(window?.location?.href ?? '');
  }, []);

  const data = { title, url, description };

  const onShare = () => {
    try {
      if (navigator?.share && navigator.canShare(data)) {
        navigator.share(data);
      } else {
        navigator.clipboard.writeText(data.url ?? window?.location?.href);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack direction={'row'} columnGap={1}>
      <IconButton onClick={onShare} sx={{ backgroundColor: 'primary.100' }}>
        <LinkIcon color="primary" />
      </IconButton>
      <IconButton
        component={Link}
        href={tweetLink(data)}
        target="_blank"
        sx={{ backgroundColor: 'primary.100' }}
      >
        <XIcon color="primary" />
      </IconButton>
      <IconButton
        component={Link}
        href={redditLink(data)}
        target="_blank"
        sx={{ backgroundColor: 'primary.100', color: 'primary.main' }}
      >
        <FaReddit fill="currentColor" />
      </IconButton>
      <IconButton
        component={Link}
        href={linkedinLink(data)}
        target="_blank"
        sx={{ backgroundColor: 'primary.100', color: 'primary.main' }}
      >
        <BiLogoLinkedinSquare fill="currentColor" />
      </IconButton>
    </Stack>
  );
}
