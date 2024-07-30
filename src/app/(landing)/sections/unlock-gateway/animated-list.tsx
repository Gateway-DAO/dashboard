'use client';

import { useState, useEffect } from 'react';

import { AnimatePresence, motion } from 'framer-motion';

import { Typography } from '@mui/material';

const createItem = (name: string) => ({ id: name + Math.random(), name });

const items = [
  'Lending History',
  'Personhood',
  'Consumer Preferences',
  'Browsing History',
  'Gamer Score',
  'Social Reputation',
  'Work Experience',
  'Attestations',
  'Education',
].map(createItem);

export default function AnimatedList() {
  const [list, setList] = useState(items);

  useEffect(() => {
    const interval = setInterval(() => {
      // Move the first item to the end of the list
      setList((prevList) => {
        const firstItem = prevList[0];
        const updatedList = [...prevList.slice(1), createItem(firstItem.name)];
        return updatedList;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence mode="popLayout">
      {list.map((item, index) => (
        <motion.div
          key={item.id}
          initial={{
            opacity: (items.length - 1 - index) / (items.length - 1),
          }}
          animate={{
            opacity: (items.length - 1 - index) / (items.length - 1),
          }}
          exit={{ opacity: 0, y: -60 }}
          transition={{ duration: 0.5 }}
          layout
        >
          <Typography
            variant="h3"
            color="inherit"
            fontWeight="lighter"
            sx={{
              transition: 'opacity 0.1s',
              typography: {
                xs: 'h5',
                sm: 'h4',
                md: 'h3',
              },
              fontWeight: 'lighter!important',
              width: '100%',
              // prevent text breaking
              whiteSpace: 'nowrap',
            }}
          >
            {item.name}
          </Typography>
        </motion.div>
      ))}
    </AnimatePresence>
  );
}
