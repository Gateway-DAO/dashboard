'use client';

import dynamic from 'next/dynamic';
import { useCallback, useState } from 'react';

import { common } from '@/locale/en/common';
import type { Area } from 'react-easy-crop';

import { Add, Remove } from '@mui/icons-material';
import {
  Box,
  Button,
  DialogActions,
  DialogTitle,
  Slider,
  Stack,
} from '@mui/material';

import getCroppedImg from './utils';

const EasyCropper = dynamic(() => import('react-easy-crop'), { ssr: false });

export type Props = {
  image: string;
  onSubmit: (image: Blob) => void;
  onClose: () => void;
};

export default function CropDialog({ image, onSubmit, onClose }: Props) {
  const [crop, setCrop] = useState<Pick<Area, 'x' | 'y'>>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState<Area>();

  const onCropComplete = useCallback(
    (_croppedArea: Area, croppedAreaPixels: Area) => {
      setCroppedArea(croppedAreaPixels);
    },
    []
  );

  const onCrop = useCallback(async () => {
    if (!croppedArea) return;
    try {
      const croppedImage = await getCroppedImg(image, croppedArea);
      onSubmit(croppedImage);
    } catch (e) {
      console.error(e);
    }
  }, [croppedArea, image, onSubmit]);

  return (
    <>
      <DialogTitle>Edit Image</DialogTitle>
      <Box
        sx={{
          width: '100%',
          height: 350,
          position: 'relative',
        }}
      >
        <EasyCropper
          image={image}
          crop={crop}
          zoom={zoom}
          aspect={1}
          cropShape="round"
          onCropChange={setCrop}
          onCropComplete={onCropComplete}
          onZoomChange={setZoom}
          zoomSpeed={0.5}
          maxZoom={3}
          minZoom={1}
          rotation={0}
          mediaProps={{}}
          restrictPosition
          style={{}}
          classes={{}}
        />
      </Box>

      <Stack spacing={2} direction="row" alignItems="center" padding={2}>
        <Remove />
        <Slider
          aria-label="Zoom"
          value={zoom}
          min={1}
          max={3}
          step={0.1}
          onChange={(e, value) => {
            setZoom(value as number);
          }}
        />
        <Add />
      </Stack>
      <DialogActions
        sx={{
          flexDirection: 'row-reverse',
          justifyContent: 'flex-start',
          gap: 2,
          p: 2,
          pt: 0,
        }}
      >
        <Button type="button" variant="contained" onClick={onCrop}>
          {common.actions.crop}
        </Button>
        <Button type="button" variant="outlined" onClick={onClose}>
          {common.actions.cancel}
        </Button>
      </DialogActions>
    </>
  );
}
