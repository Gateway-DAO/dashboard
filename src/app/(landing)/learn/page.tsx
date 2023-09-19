'use client';

import { HeaderContextProvider } from '@/app/(landing)/contexts/header-context';
import LenisManager from '@/app/(landing)/utils/scroll';

import Header from '../components/header';
import Api from '../components/icons/api';
import Data from '../components/icons/data';
import Id from '../components/icons/id';
import Star from '../components/icons/star';
import ForIssues from '../components/svgs/for-issues';
import ForOwners from '../components/svgs/for-owners';
import ForVerifies from '../components/svgs/for-verifies';
import Hero from './components/hero';
import TemplateLearnSection from './components/template-learn-section';

export default function BuildPage() {
  LenisManager;

  return (
    <HeaderContextProvider>
      <Header />
      <Hero />
      <TemplateLearnSection
        variant="primary"
        primaryTitle={
          <>
            Become <br />
            an Issuers
          </>
        }
        secondaryTitle="Our Network"
        description={
          <>
            Be part of this disruptive network by transforming your <br />
            business interactions and transactions into unique data <br />
            assets to be shared and Verified.
          </>
        }
        buttonText="All you need to start"
        Vector={ForIssues}
        features={[
          {
            icon: Id,
            title: 'Get your Gateway ID',
            description:
              'First, create your organization account with Gateway.',
          },
          {
            icon: Data,
            title: 'Define data to be shared',
            description:
              'Create your own data model with the data that is relevant to your users and your business.',
          },
          {
            icon: Api,
            title: 'Start Issuing your PDAs',
            description:
              'Using our API you can integrate with your platform and start issue PDAs seamlessly.',
          },
        ]}
        highlight={{
          icon: Star,
          text: 'See how organizations are using it',
          info: {
            title: 'Loyalty Programs',
            description:
              'Using our Loyalty program data model you can unleash New experiences in your community.',
          },
        }}
      />

      <TemplateLearnSection
        variant="secondary"
        primaryTitle={<>The owners</>}
        description={
          <>
            Join a new era, using your private data assets to unlock <br />
            fresh experiences and services.
          </>
        }
        buttonText="Own your data"
        Vector={ForOwners}
        features={[
          {
            icon: Id,
            title: 'Take ownership',
            description: 'Have full control of your Data Assets.',
          },
          {
            icon: Data,
            title: 'Share your data',
            description:
              'Share unique copies of your data  to specific recipients.',
          },
          {
            icon: Api,
            title: 'Grant permission',
            description:
              'With your consent, your PDAs can unlock experiences and services.',
          },
        ]}
        highlight={{
          icon: Star,
          text: 'Unlock the potential of your data',
          info: {
            title: 'Managing PDAs',
            description: 'Learn how to manage, authorize, and share your PDAs.',
          },
        }}
      />

      <TemplateLearnSection
        variant="primary"
        primaryTitle={
          <>
            Verifiers: <br />
            Know the what, <br />
            where, and when
          </>
        }
        description={
          <>
            Verification revolutionizes data use, enabling inclusive <br />
            monetization across all segments.
          </>
        }
        buttonText="Become a verifier"
        Vector={ForVerifies}
        features={[
          {
            icon: Id,
            title: 'Set the goal',
            description:
              'First, create your organization account with Gateway.',
          },
          {
            icon: Data,
            title: 'Define the criteria',
            description:
              'Create your own data model with the data that is relevant to your users and your business.',
          },
          {
            icon: Api,
            title: 'Start the verification',
            description:
              'Using our API you can integrate with your platform and start issue PDAs seamlessly.',
          },
        ]}
        highlight={{
          icon: Star,
          text: 'See how organizations are using it.',
          info: {
            title: 'Verification Widget',
            description:
              'Seamless integration of our solution, ensuring user transparency on your platform.',
          },
        }}
        firstColumnLarger
      />
    </HeaderContextProvider>
  );
}
