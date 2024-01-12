import CloseIcon from '@mui/icons-material/Close';
import { Button, Card, IconButton, Typography } from '@mui/material';

type Props = {
  title: string;
  description: string;
  textBtn: string;
  onClickCard?: () => void;
  onClose: () => void;
};

export default function EducationalTooltip({
  title,
  description,
  textBtn,
  onClickCard,
  onClose,
}: Props) {
  return (
    <Card
      onClick={onClickCard}
      sx={{
        position: 'absolute',
        left: '103%',
        bottom: 0,
        p: 2,
        width: 260,
        border: 0,
        backgroundColor: 'info.dark',
        color: 'common.white',
        overflow: 'visible',
        cursor: 'pointer',
        '&::before': {
          content: '""',
          width: 10,
          height: 10,
          transform: 'rotate(45deg)',
          backgroundColor: 'info.dark',
          position: 'absolute',
          left: '-5px',
          top: 'calc(50% - 5px)',
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
