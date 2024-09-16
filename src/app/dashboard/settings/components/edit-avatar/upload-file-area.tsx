'use client';

import { useEffect, useRef, useState } from 'react';

import { Box } from '@mui/material';

type Props = {
  onReadFile: (files: File[] | FileList) => void;
};

export default function UploadFileArea({ onReadFile }: Props) {
  const dropAreaRef = useRef<HTMLElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const draggingRef = useRef(false);

  useEffect(() => {
    const onDragEnter = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (!draggingRef.current) {
        setIsDragging(true);
        draggingRef.current = true;
      }
    };

    const onDragLeave = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (
        !e.relatedTarget ||
        (e.relatedTarget &&
          dropAreaRef.current &&
          !dropAreaRef.current.contains(e.relatedTarget as Node))
      ) {
        setIsDragging(false);
        draggingRef.current = false;
      }
    };
    const onMouseLeave = (e: MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      if (draggingRef.current) {
        setIsDragging(false);
        draggingRef.current = false;
      }
    };

    const onDragOver = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const onDrop = (e: DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);
      draggingRef.current = false;
      if (!e.dataTransfer?.files.length) {
        return;
      }
      onReadFile(e.dataTransfer.files);
    };

    window.addEventListener('dragenter', onDragEnter, false);

    window.addEventListener('dragover', onDragOver, false);

    window.addEventListener('dragleave', onDragLeave, false);
    window.addEventListener('mouseleave', onMouseLeave, false);

    window.addEventListener('drop', onDrop, false);

    return () => {
      window.removeEventListener('dragenter', onDragEnter, false);

      window.removeEventListener('dragover', onDragOver, false);

      window.removeEventListener('dragleave', onDragLeave, false);
      window.removeEventListener('dragleave', onMouseLeave, false);

      window.removeEventListener('drop', onDrop, false);
    };
  }, []);

  return (
    <Box
      ref={dropAreaRef}
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 10000,
        opacity: isDragging ? 1 : 0,
        transition: 'opacity 0.2s ease-in-out',
        pointerEvents: isDragging ? 'auto' : 'none',
      }}
    ></Box>
  );
}
