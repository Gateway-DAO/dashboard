'use client';

import { useRouter } from 'next-nprogress-bar';
import { FC, ReactNode } from 'react';

import QuestionSquaredIcon from '@/components/icons/question-squared';
import VideoSquaredIcon from '@/components/icons/video-squared';
import useLocalStorageInstructionGuide from '@/hooks/use-instruction-guide';
import { useToggle } from '@react-hookz/web';

import { SvgIconProps } from '@mui/material';

import InstructionGuideCard from './instruction-guide-card';
import InstructionGuideModalContent from './instruction-guide-modal-content';
import InstructionGuideModalVideo from './instruction-guide-modal-video';

type Props = {
  storageKey: string;
  title: string;
  desc?: string;
  icon?: FC<SvgIconProps>;
  image?: FC<SvgIconProps>;
  btnText: string;
  videoUrl?: string;
  children?: ReactNode;
  onCloseModal?: () => void;
  color?: 'purple' | 'blue';
  removeStorageOnClose?: boolean;
};

export function InstructionGuide({
  title,
  desc,
  icon = QuestionSquaredIcon,
  image = VideoSquaredIcon,
  btnText,
  videoUrl,
  children,
  storageKey,
  onCloseModal,
  color,
  removeStorageOnClose = true,
}: Props) {
  const router = useRouter();
  const [openModal, toggleModal] = useToggle(false);

  const { visible, onSaveStorage } = useLocalStorageInstructionGuide({
    storageKey,
  });

  const closeModal = () => {
    if (removeStorageOnClose) {
      onSaveStorage();
    }
    if (onCloseModal) {
      onCloseModal();
    }
    if (window.location.hash) {
      router.push(window.location.href.split('#')[0]);
    }
    toggleModal(false);
  };

  return (
    visible && (
      <>
        <InstructionGuideCard
          icon={icon}
          title={title}
          desc={desc}
          image={image}
          btnText={btnText}
          onClick={toggleModal}
          onCloseCard={onSaveStorage}
          color={color}
        />
        {videoUrl && (
          <InstructionGuideModalVideo
            title={title}
            description={desc}
            videoUrl={videoUrl}
            onClose={closeModal}
            open={openModal}
          />
        )}
        {children && (
          <InstructionGuideModalContent onClose={closeModal} open={openModal}>
            {children}
          </InstructionGuideModalContent>
        )}
      </>
    )
  );
}
