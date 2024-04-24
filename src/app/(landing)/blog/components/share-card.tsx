'use client';

import { AiOutlineLink } from 'react-icons/ai';
import { BiLogoLinkedinSquare } from 'react-icons/bi';

import RedditIcon from '@mui/icons-material/Reddit';
import XIcon from '@mui/icons-material/X';
import { IconButton, Stack, Icon } from '@mui/material';

type SocialProps = {
  title?: string;
  url?: string;
  description?: string;
  mini?: boolean;
};

export function objectToParams(object: {
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

export function ShareButtonFn({
  title = 'myGateway_xyz',
  url = window?.location?.href,
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
    <Stack direction={'row'} columnGap={1}>
      <IconButton
        component="a"
        onClick={onShare}
        sx={{ backgroundColor: '#F9F0FF' }}
        target="_blank"
      >
        <Icon color="primary">
          <AiOutlineLink />
        </Icon>
      </IconButton>
      <IconButton
        component="a"
        href={tweetLink(data)}
        target="_blank"
        sx={{ backgroundColor: '#F9F0FF' }}
      >
        <Icon color="primary">
          <XIcon />
        </Icon>
      </IconButton>
      <IconButton
        component="a"
        href={redditLink(data)}
        target="_blank"
        sx={{ backgroundColor: '#F9F0FF' }}
      >
        <Icon color="primary">
          <RedditIcon />
        </Icon>
      </IconButton>
      <IconButton
        component="a"
        href={linkedinLink(data)}
        sx={{ backgroundColor: '#F9F0FF' }}
        target="_blank"
      >
        <Icon color="primary">
          <BiLogoLinkedinSquare />
        </Icon>
      </IconButton>
    </Stack>
  );
}
