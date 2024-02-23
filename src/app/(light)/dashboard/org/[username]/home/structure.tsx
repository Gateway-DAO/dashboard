'use client';

import routes from '@/constants/routes';
import { home } from '@/locale/en/home';
import { currentEnv } from '@/utils/env';

import HomeBanner from '../../../components/home/home-banner';
import HomeCard from '../../../components/home/home-card';
import HomeInstructionCard from '../../../components/home/home-instruction-card';
import HomeTemplate from '../../../components/home/home-template';

export default function HomeStructure({
  username,
  organization,
}: {
  username: string;
  organization: string;
}) {
  const banner =
    currentEnv === 'testnet'
      ? home.sandbox_user_banner
      : home.testnet_user_banner;

  const cards =
    currentEnv === 'testnet'
      ? home.sandbox_user_cards
      : home.testnet_user_cards;
  return (
    <HomeTemplate
      username={username}
      banner={
        <HomeBanner
          {...banner}
          btn_link={banner.btn_link.replace('[username]', organization)}
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
