"use client";

import { ClipboardEventHandler, DragEventHandler, useMemo, useState, DragEvent, ClipboardEvent } from 'react';
import useMountedState from './use-mounted-state';

const noop = () => { };

export interface DropAreaState {
  over: boolean;
}

export interface DropAreaBond {
  onDragOver: DragEventHandler;
  onDragEnter: DragEventHandler;
  onDragLeave: DragEventHandler;
  onDrop: DragEventHandler;
  onPaste: ClipboardEventHandler;
}

export interface DropAreaOptions {
  onFiles?: (files: File[], event?: DragEvent) => void;
  onText?: (text: string, event?: DragEvent) => void;
  onUri?: (url: string, event?: DragEvent) => void;
}

/*
const defaultState: DropAreaState = {
  over: false,
};
*/

const createProcess =
  (options: DropAreaOptions, mounted: boolean) => (dataTransfer: DataTransfer, event: DragEvent | ClipboardEvent) => {
    const uri = dataTransfer.getData('text/uri-list');

    if (uri) {
      (options.onUri || noop)(uri, event as DragEvent);
      return;
    }

    if (dataTransfer.files && dataTransfer.files.length) {
      (options.onFiles || noop)(Array.from(dataTransfer.files), event as DragEvent);
      return;
    }

    if (dataTransfer.items && dataTransfer.items.length) {
      dataTransfer.items[0].getAsString((text) => {
        if (mounted) {
          (options.onText || noop)(text, event as DragEvent);
        }
      });
    }
  };

const createBond = (process: ReturnType<typeof createProcess>, setOver: (state: boolean) => void): DropAreaBond => ({
  onDragOver: (event) => {
    event.preventDefault();
  },
  onDragEnter: (event) => {
    event.preventDefault();
    setOver(true);
  },
  onDragLeave: () => {
    setOver(false);
  },
  onDrop: (event) => {
    event.preventDefault();
    event.persist();
    setOver(false);
    process(event.dataTransfer, event);
  },
  onPaste: (event) => {
    event.persist();
    process(event.clipboardData, event);
  },
});

const useDropArea = (options: DropAreaOptions = {}): [DropAreaBond, DropAreaState] => {
  const { onFiles, onText, onUri } = options;
  const isMounted = useMountedState();
  const [over, setOver] = useState<boolean>(false);
  const process = useMemo(() => createProcess(options, isMounted()), [onFiles, onText, onUri]);
  const bond: DropAreaBond = useMemo(() => createBond(process, setOver), [process, setOver]);

  return [bond, { over }];
};

export default useDropArea;
