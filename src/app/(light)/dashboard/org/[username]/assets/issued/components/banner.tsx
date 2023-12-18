'use client';

import {
  InstructionGuide,
  InstructionToolTip,
} from '@/components/instruction-guide';
import routes from '@/constants/routes';
import { instructionGuide } from '@/locale/en/educational';
import { useToggle } from '@react-hookz/web';
import Joyride from 'react-joyride';

import { useTheme } from '@mui/material';

type Props = {
  pathnameOrg: string;
};

export default function Banner({ pathnameOrg }: Props) {
  const [openCoachMarkGuide, toggleCoachMarkGuide] = useToggle(false);
  const theme = useTheme();

  const handleJoyrideCallback = (data: any) => {
    if (data.status === 'finished') {
      toggleCoachMarkGuide();
    }
  };

  const steps = [
    {
      target: '.issueBtn', // CSS selector for the element to highlight
      content: 'Quick, non-code feature for issuing PDAs in a few steps. ',
      title: 'Start using now',
      disableBeacon: true, // Disable the pulsating beacon
      hideFooter: true,
      btnProps: {
        title: 'open now',
        href: routes.dashboard.org.issue(pathnameOrg),
      },
    },
  ];

  return (
    <>
      <InstructionGuide
        id={'org-assests-issued'}
        title={instructionGuide.issuePda.title}
        desc={instructionGuide.issuePda.description}
        btnLink={instructionGuide.issuePda.btn_link}
        btnText={instructionGuide.issuePda.btn_text}
        videoUrl={instructionGuide.issuePda.video_link}
        onSideDialogClose={toggleCoachMarkGuide}
      />
      <Joyride
        steps={steps}
        run={openCoachMarkGuide}
        callback={handleJoyrideCallback}
        tooltipComponent={InstructionToolTip}
        styles={{ options: { arrowColor: theme.palette.info.dark } }}
      />
    </>
  );
}
