'use client';

import {
  InstructionGuide,
  InstructionToolTip,
} from '@/components/instruction-guide';
import routes from '@/constants/routes';
import { instructionGuide } from '@/locale/en/pda';
import { useToggle } from '@react-hookz/web';
import Joyride from 'react-joyride';

type Props = {
  pathnameOrg: string;
};

export default function Banner({ pathnameOrg }: Props) {
  const [openCoachMarkGuide, toggleCoachMarkGuide] = useToggle(false);

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
        title={instructionGuide.title}
        desc={instructionGuide.description}
        btnLink={instructionGuide.btn_link}
        btnText={instructionGuide.btn_text}
        videoUrl={instructionGuide.video_link}
        onSideDialogClose={toggleCoachMarkGuide}
      />
      <Joyride
        steps={steps}
        run={openCoachMarkGuide}
        callback={handleJoyrideCallback}
        tooltipComponent={InstructionToolTip}
        styles={{ options: { arrowColor: '#499AA5' } }}
      />
    </>
  );
}
