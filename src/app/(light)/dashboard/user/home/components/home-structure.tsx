'use client';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { home } from '@/locale/en/home';

import { Box } from '@mui/material';
import { Typography } from '@mui/material';

import HomeCard from './home-card';
import IssueNowCard from './issue-now-card';
import HomeInstructionCard from './home-instruction-card';

type Props = {
  username: string;
};

export default function HomeStructure({ username }: Props) {
  const { isOrg, organization } = useOrganization();
  return (
    <>
      <Typography variant="h3" marginBottom={4} gutterBottom>
        {home.greeting} {username}
      </Typography>
      <IssueNowCard
        title={home.issue_banner.title}
        desc={home.issue_banner.subtitle}
        btnLink={
          isOrg
            ? routes.dashboard.org.issue(organization.gatewayId)
            : routes.dashboard.user.issue
        }
        btnText={home.issue_banner.btn_text}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {home.sub_banner.map((details, index: number) => (
          <HomeCard
            heading={details.heading}
            title={details.title}
            subtitle={details.subtitle}
            link={details.link}
            btn_text={details.btn_text}
            target={details.target}
            index={index}
            key={index}
          />
        ))}
      </Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: { xs: 'column', md: 'row' },
        }}
      >
        {home.instrunction_banner.map((details, index: number) => (
          <HomeInstructionCard
            title={details.title}
            description={details.description}
            index={index}
            link={details.link}
            play_video={home.play_video}
            key={index}
          />
        ))}
      </Box>
    </>
  );
}
