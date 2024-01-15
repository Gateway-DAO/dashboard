import { useRouter } from 'next-nprogress-bar';

import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, IconButton, Typography } from '@mui/material';

type Props = {
  title: string;
  description: string;
  textBtn: string;
  href?: string;
  onClickCard?: () => void;
  onClose: () => void;
  position: 'right' | 'bottom';
  alignX: 'center' | 'left' | 'right';
  alignY: 'top' | 'bottom';
};

export default function EducationalTooltip({
  title,
  description,
  textBtn,
  href,
  onClickCard,
  onClose,
  position,
  alignX,
  alignY,
}: Props) {
  const router = useRouter();
  return (
    <Card
      onClick={() => {
        if (!!onClickCard) {
          onClickCard();
        }
        if (!!href) {
          router.push(href);
        }
      }}
      sx={{
        position: 'absolute',
        left:
          position === 'right'
            ? 'calc(100% + 10px)'
            : alignX === 'left'
            ? 0
            : alignX === 'center'
            ? 'calc(-100% + 110px)'
            : 'auto',
        right:
          position === 'right'
            ? 'auto'
            : alignX === 'left' || alignX === 'center'
            ? 'auto'
            : 0,
        bottom: position === 'right' && alignY === 'bottom' ? 0 : 'auto',
        top:
          position === 'right' && alignY === 'top'
            ? 0
            : position === 'bottom'
            ? 'calc(100% + 10px)'
            : 'auto',
        p: 2,
        width: 260,
        border: 0,
        backgroundColor: 'info.dark',
        color: 'common.white',
        overflow: 'visible',
        cursor: 'pointer',
        textDecoration: 'none',
        '&::before': {
          content: '""',
          width: 10,
          height: 10,
          transform: 'rotate(45deg)',
          backgroundColor: 'info.dark',
          position: 'absolute',
          left: position === 'right' ? '-5px' : 'calc(50% - 5px)',
          top: position === 'right' ? 'calc(50% - 5px)' : '-5px',
        },
      }}
    >
      <IconButton
        sx={{
          cursor: 'pointer',
          position: 'absolute',
          top: 10,
          right: 10,
        }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onClose();
        }}
      >
        <CloseIcon sx={{ color: 'common.white' }} />
      </IconButton>
      <Typography fontWeight={700} mb={1}>
        {title}
      </Typography>
      <Typography mb={2}>{description}</Typography>
      <Button
        variant="contained"
        size="small"
        sx={{
          background: 'white',
          color: 'info.dark',
          '&:hover': { backgroundColor: 'white' },
        }}
      >
        {textBtn}
      </Button>
    </Card>
  );
}
