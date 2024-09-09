import { Metadata } from 'next';
import { redirect } from 'next/navigation';

import CardCell from '@/components/card-cell/card-cell';
import routes from '@/constants/routes';
import { api } from '@/services/api/api';
import { PageProps } from '@/types/next';
import { formatDate } from '@/utils/date';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { vs2015 } from 'react-syntax-highlighter/dist/esm/styles/hljs';

import {
  Box,
  Card,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';

import ExplorerBreadcrumb from '../../components/breadcrumb/breadcrumb';
import ExplorerHeader from '../../components/header/header';
import CopyData from './components/copy-data';

export async function generateMetadata({
  params: { id },
}: {
  params: { id: string };
}): Promise<Metadata> {
  const { data, error } = await api.GET('/data-models/{id}', {
    params: { path: { id: parseInt(id, 10) } },
  });

  if (error) {
    return {
      title: 'Data Model',
    };
  }

  return {
    title: data.title,
  };
}

export default async function DataModelDetailPage({
  params: { id },
}: PageProps<{ id: string }>) {
  const { data: dataModel, error } = await api.GET('/data-models/{id}', {
    params: { path: { id: parseInt(id, 10) } },
  });

  if (!dataModel || error) {
    return redirect(routes.explorer.dataModels);
  }

  return (
    <>
      <ExplorerHeader sx={{ pb: 5 }}>
        <Container>
          <ExplorerBreadcrumb
            paths={[
              {
                route: routes.explorer.dataModels,
                label: 'Data Models',
              },
              {
                label: dataModel.title!,
              },
            ]}
          />
          <Typography component="h1" variant="h2" fontWeight="300" mb={2}>
            {dataModel.title}
          </Typography>
        </Container>
        <Container>
          <Box sx={{ maxWidth: 892 }}>
            <Typography variant="body1" color="textSecondary" mb={6}>
              {dataModel.description}
            </Typography>
            <Stack
              component={Card}
              variant="outlined"
              sx={{
                width: '100%',
              }}
            >
              <Stack direction="row" justifyContent="space-between">
                <CardCell label="Creation Date" margin={false} py={3}>
                  {formatDate(dataModel.created_at)}
                </CardCell>
                <Divider orientation="vertical" flexItem />
                <CardCell label="Last update" margin={false} py={3}>
                  {formatDate(dataModel.updated_at)}
                </CardCell>
              </Stack>
              <Divider orientation="horizontal" flexItem />
              <CardCell
                label="Data model ID"
                margin={false}
                py={3}
                contentProps={{
                  display: 'flex',
                  sx: {
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  },
                }}
              >
                <span>{dataModel.id}</span>
                <CopyData text={dataModel.id!.toString()} />
              </CardCell>
            </Stack>
          </Box>
        </Container>
        <Divider sx={{ my: 6 }} />
        <Container>
          <Box
            sx={{
              maxWidth: 892,
              'code, code span': {
                fontFamily: 'monospace',
              },
            }}
          >
            <Typography variant="h5" mb={4}>
              Schema
            </Typography>
            {dataModel?.schema && (
              <SyntaxHighlighter
                language="json"
                style={vs2015}
                customStyle={{
                  borderRadius: 12,
                }}
                showLineNumbers
                lineNumberStyle={{ opacity: 0.5 }}
              >
                {JSON.stringify(dataModel.schema, null, 4)}
              </SyntaxHighlighter>
            )}
          </Box>
        </Container>
      </ExplorerHeader>
    </>
  );
}
