import routes from '@/constants/routes';
import { getPrivateApi } from '@/services/protocol/api';
import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { pdas as pdasLocales, pdaTableColumnNames } from '@/locale/en/pda';
import PdasHeader from '../user/assets/components/pdas-header';
import HelpCards from '../user/assets/received/components/help-cards';
import ReceivedPDAsList from '../user/assets/received/components/list';
import AddIcon from '@mui/icons-material/Add';
import TitleLayout from '@/components/title-layout/title-layout';
import { GridColDef } from '@mui/x-data-grid';
import { DATE_FORMAT } from '@/constants/date';
import dayjs from 'dayjs';

export default async function DashboardV3() {
  const pdas = [
    {
      id: 11955822999552,
      activity: {
        id: '665942419328a6d6576cbd18',
      },
      fileName: null,
      issuanceDate: '2024-05-31T03:21:38.000Z',
      lastUpdated: '2024-05-31T05:20:21.000Z',
      mimeType: null,
      structured: true,
      issuer: {
        username: 'joao',
      },
      dataAsset: null,
    },
    {
      id: 5856991978496,
      activity: {
        id: '6658e523e4988e8bb8cde9a6',
      },
      fileName: null,
      issuanceDate: '2024-05-30T20:44:20.000Z',
      lastUpdated: '2024-05-30T20:44:20.000Z',
      mimeType: null,
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 5686170559488,
      activity: {
        id: '6658e4fae4988e8bb8cde9a2',
      },
      fileName: null,
      issuanceDate: '2024-05-30T20:43:39.000Z',
      lastUpdated: '2024-05-30T20:43:39.000Z',
      mimeType: null,
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 3997229196288,
      activity: {
        id: '6658e368e4988e8bb8cde97e',
      },
      fileName:
        'image_picker_5B8F198B-0ADD-4803-9B61-8EE171FA71C3-98781-00000B3D2E84226A.jpg',
      issuanceDate: '2024-05-30T20:36:56.000Z',
      lastUpdated: '2024-05-30T20:36:59.000Z',
      mimeType: 'application/octet-stream',
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 3924038591488,
      activity: {
        id: '6658e356e4988e8bb8cde97b',
      },
      fileName:
        'image_picker_5B8F198B-0ADD-4803-9B61-8EE171FA71C3-98781-00000B3D2E84226A.jpg',
      issuanceDate: '2024-05-30T20:36:39.000Z',
      lastUpdated: '2024-05-30T20:36:43.000Z',
      mimeType: 'application/octet-stream',
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 558098157568,
      activity: {
        id: '6658e3166eb04b5694903d55',
      },
      fileName:
        'image_picker_3768AC03-2303-43A2-93CA-916FAD68DFBE-98781-00000B3CD13CC3B6.jpg',
      issuanceDate: '2024-05-30T20:35:34.000Z',
      lastUpdated: '2024-05-30T20:35:39.000Z',
      mimeType: 'application/octet-stream',
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 382990159872,
      activity: {
        id: '6658e2ec6eb04b5694903d52',
      },
      fileName: null,
      issuanceDate: '2024-05-30T20:34:52.000Z',
      lastUpdated: '2024-05-30T20:34:52.000Z',
      mimeType: null,
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 177309880320,
      activity: {
        id: '6658e2bb6eb04b5694903d46',
      },
      fileName: null,
      issuanceDate: '2024-05-30T20:34:03.000Z',
      lastUpdated: '2024-05-30T20:34:03.000Z',
      mimeType: null,
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 2561447633920,
      activity: {
        id: '6658e211e4988e8bb8cde957',
      },
      fileName: null,
      issuanceDate: '2024-05-30T20:31:14.000Z',
      lastUpdated: '2024-05-30T20:31:14.000Z',
      mimeType: null,
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 1180328469504,
      activity: {
        id: '6658dc24959ca45cb056471a',
      },
      fileName: 'print-joao.png',
      issuanceDate: '2024-05-30T20:05:56.000Z',
      lastUpdated: '2024-05-30T20:17:17.000Z',
      mimeType: 'image/png',
      structured: false,
      issuer: {
        username: 'ios_05',
      },
      dataAsset: null,
    },
    {
      id: 11122361039872,
      activity: {
        id: '6658ce74d042a11a27e48ff1',
      },
      fileName: null,
      issuanceDate: '2024-05-30T19:07:32.000Z',
      lastUpdated: '2024-05-31T03:20:54.000Z',
      mimeType: null,
      structured: true,
      issuer: {
        username: 'joao',
      },
      dataAsset: null,
    },
    {
      id: 6229202107392,
      activity: {
        id: '6658c9e5d042a11a27e48f39',
      },
      fileName: null,
      issuanceDate: '2024-05-30T18:48:06.000Z',
      lastUpdated: '2024-05-30T19:03:59.000Z',
      mimeType: null,
      structured: true,
      issuer: {
        username: 'joao',
      },
      dataAsset: null,
    },
    {
      id: 2711487374336,
      activity: {
        id: '6658b051287aa7173e65cd79',
      },
      fileName: null,
      issuanceDate: '2024-05-30T16:58:57.000Z',
      lastUpdated: '2024-05-30T17:02:09.000Z',
      mimeType: null,
      structured: true,
      issuer: {
        username: 'nuno',
      },
      dataAsset: null,
    },
    {
      id: 2564767273984,
      activity: {
        id: '66589f6a346d60baea451360',
      },
      fileName: null,
      issuanceDate: '2024-05-30T15:46:51.000Z',
      lastUpdated: '2024-05-30T18:38:23.000Z',
      mimeType: null,
      structured: true,
      issuer: {
        username: 'joao',
      },
      dataAsset: null,
    },
    {
      id: 23258629950464,
      activity: {
        id: '665899170facb87ee2fe17ed',
      },
      fileName: null,
      issuanceDate: '2024-05-30T15:19:51.000Z',
      lastUpdated: '2024-05-30T15:35:25.000Z',
      mimeType: null,
      structured: true,
      issuer: {
        username: 'joao',
      },
      dataAsset: null,
    },
  ];

  return (
    <>
      <TitleLayout title={pdasLocales.my_data_assets} titleId="title-assets">
        <Button
          variant="contained"
          size="large"
          startIcon={<AddIcon />}
          href={routes.dashboard.user.issue}
        >
          {pdasLocales.upload_file}
        </Button>
      </TitleLayout>

      <Box sx={{ pt: 5 }}>
        {pdas && pdas.length > 0 && <ReceivedPDAsList pdas={pdas} />}
        {pdas && pdas.length === 0 && (
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{ textAlign: 'center', width: '100%' }}
          >
            {pdasLocales.empty}
          </Typography>
        )}
      </Box>
    </>
  );
}
