'use client';

import {
  Reddit,
  Twitter,
  Facebook,
  Link as LinkIcon,
} from '@mui/icons-material';
import { IconButton, Stack } from '@mui/material';

type SocialProps = {
  title?: string;
  url?: string;
  description?: string;
};

export function objectToParams(object: {
  [key: string]: string | number | undefined | null;
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
    url: props.url,
  })}`;

const redditLink = (props: SocialProps) =>
  `https://reddit.com/submit${objectToParams(props)}`;

const facebookLink = (props: SocialProps) =>
  `https://www.facebook.com/sharer/sharer.php${objectToParams({
    u: props.url,
  })}`;

export function ShareButtonFn({
  title = 'myGateway_xyz',
  url = window.location.href,
  description = 'check out this latest blog from gateway',
}: SocialProps) {
  const data = { title, url, description };
  const onShare = () => {
    try {
      if (navigator?.share && navigator.canShare(data)) {
        navigator.share(data);
      } else {
        navigator.clipboard.writeText(data.url);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Stack direction={'row'}>
      <IconButton component="a" href={tweetLink(data)} target="_blank">
        <Twitter color="primary" />
      </IconButton>
      <IconButton component="a" href={facebookLink(data)} target="_blank">
        <Facebook color="primary" />
      </IconButton>
      <IconButton component="a" href={redditLink(data)} target="_blank">
        <Reddit color="primary" />
      </IconButton>
      <IconButton onClick={onShare}>
        <LinkIcon color="primary" />
      </IconButton>
    </Stack>
  );
}
