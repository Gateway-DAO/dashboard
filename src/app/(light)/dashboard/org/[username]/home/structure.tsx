'use client';

import { home } from '@/locale/en/home';

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
  const banner = home.testnet_org_banner;
  const cards = home.testnet_org_cards;

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
