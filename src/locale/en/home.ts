import { HomeCardProps } from '@/app/(light)/dashboard/components/home/types';
import { DataModelsBoxIcon, DataProofBoxIcon } from '@/components/icons';
import DataAssetIcon from '@/components/icons/data-asset-box';
import GatewayDarkSquaredIcon from '@/components/icons/gateway-dark-squared';
import PlaygroundIcon from '@/components/icons/playground';
import SDKIcon from '@/components/icons/sdk';
import documentationRoutes from '@/constants/documentationRoutes';
import routes from '@/constants/routes';

export const home = {
  greeting: 'Hello',
  main_banner: {
    title: 'Learn about Gateway',
    subtitle:
      'Our guide to learn about the Gateway architecture, mission, and set up process.',
    btn_text: 'Check it out',
    link: documentationRoutes.home,
  },
  issue_banner: {
    title: 'Start issuing a Private Data Asset',
    subtitle:
      'Select a data model, fill the details and just send to the user all under 30 seconds',
    btn_text: 'Issue now',
    target: '_blank',
  },
  sub_banner: [
    {
      icon: GatewayDarkSquaredIcon,
      heading: 'Education',
      title: 'Why Gateway Matters',
      subtitle:
        'Learn how Gateway is building the sovereign web and how you can join the movement. ',
      btn_text: 'Learn more',
      link: routes.dashboard.createOrg,
      target: '_self',
    },
    {
      icon: PlaygroundIcon,
      heading: 'Contribute',
      title: 'Send a Data Asset',
      subtitle:
        'Selected a Peer-to-Peer data model, fill out the information, and send a PDA to a peer!',
      btn_text: 'Create Now',
      link: documentationRoutes.home,
      target: '_self',
    },
    {
      icon: DataAssetIcon,
      heading: 'Manage',
      title: 'Check Your Data Proofs',
      subtitle:
        'Review what data assets you have shared, to who, and if you want to remove access.',
      btn_text: 'View All',
      link: routes.dashboard.user.proofs,
      target: '_self',
    },
  ] satisfies HomeCardProps[],
  sandbox_sub_banner: [
    {
      icon: DataModelsBoxIcon,
      iconStyle: { width: 55 },
      heading: 'Create',
      title: 'Define a Data Model',
      subtitle:
        'Define a standard of information by creating your own schema for a dataset.',
      btn_text: 'Build Now',
      link: documentationRoutes.dataModel,
      target: '_blank',
    },
    {
      icon: PlaygroundIcon,
      heading: 'Protocol API',
      title: 'Use our Protocol',
      subtitle:
        'Learn and implement our API directly into your product for custom and automated  actions.',
      btn_text: 'Documentation',
      link: documentationRoutes.home,
      target: '_blank',
    },
    {
      icon: SDKIcon,
      heading: 'SDK',
      title: 'Gateway Widget',
      subtitle:
        'Integrate in less than 30 minutes! Seamless data requests and user claiming process.',
      btn_text: 'Plug and Play',
      link: documentationRoutes.home,
      target: '_blank',
    },
  ] satisfies HomeCardProps[],
  instrunction_banner: [
    {
      title: 'How to use your PDA',
      description: 'Explore the potential of your Data Assets',
      link: 'https://youtube.com/embed/GwIFrE0MQLc',
    },
    {
      title: 'How to issue a PDA',
      description: 'How to issue a PDA using a Data Model',
      link: 'https://youtube.com/embed/_2_HmB76d40',
    },
    {
      title: 'How to create a Request',
      description: 'How to create a request from a template',
      link: 'https://youtube.com/embed/7ihrltA9McM',
    },
  ],
  play_video: 'Play video',
};
