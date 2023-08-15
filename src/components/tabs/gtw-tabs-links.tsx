"use client";

import { usePathname } from 'next/navigation';
import React, { PropsWithChildren, ReactElement } from 'react';

import { Tabs, TabsProps } from "@mui/material";

export default function GTWTabs({ children, ...props }: PropsWithChildren<TabsProps>) {
  const path = usePathname()

  const childrenArray = React.Children.toArray(children) as ReactElement[];
  const value = childrenArray.findIndex(({ props }, index) => {
    if (!props.href) {
      console.log(props)
      throw new Error(`Invalid child of GTWTabs at index ${index}`);
    }
    return props.href === path;
  }) ?? 0;
  return <Tabs value={value} {...props}>
    {children}
  </Tabs>
}
