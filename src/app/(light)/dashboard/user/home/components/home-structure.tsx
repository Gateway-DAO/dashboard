'use client';

import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { home } from '@/locale/en/home';
import { currentEnv } from '@/utils/env';

import { Box, Button, Card } from '@mui/material';
import { Typography } from '@mui/material';

import HomeCard from './home-card';
import HomeInstructionCard from './home-instruction-card';
import IssueNowCard from './issue-now-card';

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
            link={details.link}
            play_video={home.play_video}
            key={index}
          />
        ))}
      </Box>
      <span>a - {process.env.NEXT_PUBLIC_POC_WIDGET} - b</span>
      {process.env.NEXT_PUBLIC_POC_WIDGET === 'true' && (
        <Card sx={{ p: 2, mt: 3, alignSelf: 'center', width: 300 }}>
          <Typography variant="h6" mb={1}>
            POC Widget
          </Typography>
          <Button
            variant="contained"
            href="https://widget-poc-one.vercel.app/issue?access=12345&gtwid=joao&owner=kbooz&datamodel=12345-12345-12345-12345&claim={value:1,name:%20%27junior%27}&callback=https://mygateway.xyz/"
          >
            Issue
          </Button>
        </Card>
      )}
    </>
  );
}
