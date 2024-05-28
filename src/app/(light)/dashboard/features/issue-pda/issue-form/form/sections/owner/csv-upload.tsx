import { FC } from 'react';

import { csvUpload } from '@/locale/en/pda';
import { useToggle } from '@react-hookz/web';

import {
  ExpandLess,
  ExpandMore,
  FileDownloadOutlined,
  FileUploadOutlined,
} from '@mui/icons-material';
import {
  Button,
  Collapse,
  Divider,
  Stack,
  SvgIconProps,
  Typography,
} from '@mui/material';

export default function CsvUpload() {
  const [expanded, toggleExpanded] = useToggle(false);

  const steps: {
    number: number;
    title: string;
    description: string;
    button?: { text: string; link: string; icon: FC<SvgIconProps> };
  }[] = [
    {
      number: 1,
      title: csvUpload.steps.download.title,
      description: csvUpload.steps.download.description,
      button: {
        text: csvUpload.steps.download.text_btn,
        link: csvUpload.steps.download.link,
        icon: FileDownloadOutlined,
      },
    },
    {
      number: 2,
      title: csvUpload.steps.fill_csv.title,
      description: csvUpload.steps.fill_csv.description,
    },
    {
      number: 3,
      title: csvUpload.steps.upload.title,
      description: csvUpload.steps.upload.description,
      button: {
        text: csvUpload.steps.upload.text_btn,
        link: csvUpload.steps.upload.link,
        icon: FileUploadOutlined,
      },
    },
  ];

  return (
    <Stack>
      <Stack
        direction="row"
        gap={1}
        onClick={toggleExpanded}
        sx={{ cursor: 'pointer' }}
      >
        <Typography color="primary" variant="body2" fontWeight={700}>
          {csvUpload.title}
        </Typography>
        {expanded ? (
          <ExpandLess color="primary" />
        ) : (
          <ExpandMore color="primary" />
        )}
      </Stack>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <Typography fontWeight={700} variant="body2" my={2}>
          {csvUpload.subtitle}
        </Typography>
        <Stack
          direction="column"
          divider={
            <Divider
              orientation="vertical"
              sx={{ height: 20, width: 12, my: 0.5 }}
            />
          }
        >
          {steps.map((step) => (
            <Stack
              key={step.number}
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
            >
              <Stack
                sx={(theme) => ({
                  borderRadius: '50%',
                  backgroundColor: theme.palette.primary.main,
                  width: 24,
                  height: 24,
                  alignItems: 'center',
                  justifyContent: 'center',
                })}
              >
                <Typography sx={{ color: 'common.white', fontSize: 12 }}>
                  {step.number}
                </Typography>
              </Stack>
              <Stack sx={{ flexGrow: 1 }}>
                <Typography variant="body2" fontWeight={700}>
                  {step.title}
                </Typography>
                <Typography variant="caption">{step.title}</Typography>
              </Stack>
              {step.button && (
                <Button
                  href={step.button.link}
                  variant="outlined"
                  size="small"
                  endIcon={<step.button.icon />}
                  target="_blank"
                >
                  {step.button.text}
                </Button>
              )}
            </Stack>
          ))}
        </Stack>
      </Collapse>
    </Stack>
  );
}
