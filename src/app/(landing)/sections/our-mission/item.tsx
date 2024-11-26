'use client';
import Image, { StaticImageData } from 'next/image';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

import { Box, Stack } from '@mui/material';

import { missions } from './missons';

import ComputeImage from '/public/images/missions/compute.png';
import ConfidentialityImage from '/public/images/missions/confidentiality.png';
import ProcessingImage from '/public/images/missions/processing.png';
import AccessImage from '/public/images/missions/access.png';

// Which image to show for each mission
const imageByMissionId: Record<ActiveItem['id'], StaticImageData> = {
  compute: ComputeImage,
  confidentiality: ConfidentialityImage,
  processing: ProcessingImage,
  access: AccessImage,
};

type ActiveItem = {
  id: (typeof missions)[number]['id'];
  element?: HTMLElement;
};

const ActiveContext = createContext<{
  active: ActiveItem;
  setActive: (active: ActiveItem) => void;
}>({
  active: { id: missions[0].id },
  setActive: () => {
    return;
  },
});

export function ActiveContextProvider({ children }: PropsWithChildren) {
  const state = useState<ActiveItem>({ id: missions[0].id });

  return (
    <ActiveContext.Provider
      value={{
        active: state[0],
        setActive: state[1],
      }}
    >
      {children}
    </ActiveContext.Provider>
  );
}

export function OurMissionItem({
  id,
  children,
}: PropsWithChildren<{ id: (typeof missions)[number]['id'] }>) {
  const { active, setActive } = useContext(ActiveContext);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (active.id === id && !active.element && ref.current) {
      setActive({ id, element: ref.current });
    }
  }, [active.element]);

  return (
    <Stack
      gap={2}
      ref={ref}
      sx={{
        py: 5,
        opacity: {
          md: active.id === id ? 1 : 0.3,
        },
        transition: 'opacity 0.25s ease',
        zIndex: 1,
      }}
      tabIndex={0}
      onClick={(event) =>
        setActive({ id, element: event.currentTarget as HTMLElement })
      }
      onFocus={(event) =>
        setActive({ id, element: event.currentTarget as HTMLElement })
      }
      onMouseEnter={(event) =>
        setActive({ id, element: event.currentTarget as HTMLElement })
      }
    >
      {children}
    </Stack>
  );
}

// Controls the position of the image
const topByMissionId: Record<ActiveItem['id'], number> = {
  compute: 50,
  confidentiality: 218,
  processing: 218,
  access: 218,
};

export function MissionImage() {
  const { active } = useContext(ActiveContext);
  const mission = missions.find((mission) => mission.id === active.id);

  const [topPosition, setTopPosition] = useState(
    active.element
      ? active.element.offsetTop - topByMissionId[active.id]
      : undefined
  );

  useEffect(() => {
    const onResize = () => {
      if (active.element) {
        setTopPosition(active.element.offsetTop - topByMissionId[active.id]);
      }
    };
    onResize();
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, [active.element]);

  if (!active.element || !topPosition) {
    return null;
  }

  return (
    <Box
      sx={{
        position: 'absolute',
        top: topPosition,
        right: 0,
        borderRadius: 1.5,
        backgroundColor: 'primary.light',
        width: 437,
        height: 437,
        transition: 'top .25s ease-out',
        overflow: 'hidden',
        opacity: 0.6,
        display: {
          xs: 'none',
          md: 'block',
        },
      }}
    >
      <Box
        sx={{
          position: 'relative',
          inset: 0,
        }}
      >
        <Image
          src={imageByMissionId[active.id]}
          alt={mission!.title}
          style={{
            objectFit: 'cover',
            objectPosition: 'center',
            mixBlendMode: 'multiply',
            width: '100%',
            height: '100%',
          }}
        />
      </Box>
    </Box>
  );
}
