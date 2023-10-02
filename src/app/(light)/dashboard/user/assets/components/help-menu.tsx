'use client';

import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import Fab from '@mui/material/Fab';
import { useMenu } from '@/hooks/use-menu';
import Link from 'next/link';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import {
  Menu,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Icon,
} from '@mui/material';
import { SiDiscord } from 'react-icons/si';
import { common } from '@/locale/en/common';

export default function HelpMenu() {
  const { isOpen, onOpen, onClose, element: anchorEl } = useMenu();

  return (
    <>
      <Fab
        style={{
          margin: 2,
          right: 55,
          bottom: 30,
          position: 'fixed',
        }}
        sx={{
          backgroundColor: '#000000',
          '&:hover': {
            color: '#ffffff',
          },
        }}
        aria-label="help"
        onClick={onOpen}
      >
        <QuestionMarkIcon htmlColor="#ffffff" />
      </Fab>

      <Menu
        id={'help-icon'}
        anchorEl={anchorEl}
        open={isOpen}
        onClose={onClose}
        slotProps={{
          paper: {
            sx: { mt: -10 },
          },
        }}
        MenuListProps={{
          'aria-labelledby': 'help',
          sx: {
            minWidth: 250,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{
          horizontal: 'right',
          vertical: 'top',
        }}
        sx={{
          '.MuiListItemIcon-root': {
            minWidth: (theme) => `${theme.spacing(5 + 1.5)} !important`,
          },
        }}
      >
        <MenuItem
          component={Link}
          target="_blank"
          href={common.helpMenu.docsLink}
        >
          <ListItemIcon>
            <MenuBookIcon />
          </ListItemIcon>
          <ListItemText>{common.helpMenu.docsTitle}</ListItemText>
        </MenuItem>
        <MenuItem
          component={Link}
          target="_blank"
          href={common.helpMenu.discordLink}
        >
          <ListItemIcon>
            <Icon>
              <SiDiscord />
            </Icon>
          </ListItemIcon>
          <ListItemText>{common.helpMenu.discordTitle}</ListItemText>
        </MenuItem>
      </Menu>
    </>
  );
}
