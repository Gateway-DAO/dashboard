'use client';

import { Metadata } from 'next';

import routes from '@/constants/routes';
import { home } from '@/locale/en/home';
import { currentEnv } from '@/utils/env';

import HomeCard from '../../../components/home/home-card';
import HomeInstructionCard from '../../../components/home/home-instruction-card';
import HomeTemplate from '../../../components/home/home-template';
import IssueNowCard from '../../../components/home/issue-now-card';

export default function HomeStructure({
  username,
  organization,
}: {
  username: string;
  organization: string;
}) {
  const cards =
    currentEnv === 'testnet' ? home.sandbox_sub_banner : home.sub_banner;
  return (
    <HomeTemplate
      username={username}
      banner={
        <IssueNowCard
          title={home.issue_banner.title}
          desc={home.issue_banner.subtitle}
          btnLink={routes.dashboard.org.issue(organization)}
          btnText={home.issue_banner.btn_text}
        />
      }
      cards={cards.map((details, index: number) => (
        <HomeCard {...details} key={index} />
      ))}
      instructions={home.instrunction_banner.map((details, index: number) => (
        <HomeInstructionCard
          title={details.title}
          description={details.description}
          link={details.link}
          play_video={home.play_video}
          key={index}
        />
      ))}
    />
  );
}
