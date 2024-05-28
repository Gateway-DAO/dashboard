'use client';

import { Metadata } from 'next';

import { home } from '@/locale/en/home';
import { isSandbox } from '@/utils/env';

import HomeBanner from '../../components/home/home-banner';
import HomeCard from '../../components/home/home-card';
import HomeInstructionCard from '../../components/home/home-instruction-card';
import HomeTemplate from '../../components/home/home-template';
import MigrationCard from './components/migration-modal/migration-card';

export const metadata: Metadata = {
  title: `The Private Data Asset Network  - Gateway Network`,
};

export default function HomeStructure({ username }: { username: string }) {
  const banner = isSandbox
    ? home.sandbox_user_banner
    : home.testnet_user_banner;

  const cards = isSandbox ? home.sandbox_user_cards : home.testnet_user_cards;
  return (
    <HomeTemplate
      username={username}
      banner={<HomeBanner {...banner} />}
      cards={
        <>
          {cards.map((details, index: number) => (
            <HomeCard {...details} key={index} />
          ))}
          {!isSandbox && <MigrationCard />}
        </>
      }
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
