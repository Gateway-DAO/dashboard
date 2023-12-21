'use client';
import routes from '@/constants/routes';
import useOrganization from '@/hooks/use-organization';
import { issuePda } from '@/locale/en/datamodel';

import LaunchIcon from '@mui/icons-material/Launch';
import { Button, Chip, Skeleton, Typography } from '@mui/material';
import { Stack } from '@mui/system';

type Props = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  isLoading: boolean;
};

export default function DataModelDetailHeader({
  id,
  title,
  description,
  tags,
  isLoading,
}: Props) {
  const { isOrg, organization } = useOrganization();
  return (
    <>
      <Stack mb={3} data-testid="data_model__header">
        <Typography variant="h4" mb={1} data-testid="data_model__header__title">
          {isLoading ? <Skeleton /> : title}
        </Typography>
        {tags && tags.length > 0 && (
          <Stack direction="row" gap={1}>
            {tags.map((tag, i) => (
              <Chip
                key={tag}
                label={tag}
                data-testid={`data_model__header__tag__${i}`}
              />
            ))}
          </Stack>
        )}
        <Typography
          variant="body1"
          mt={5}
          data-testid="data_model__header__description"
        >
          {isLoading ? <Skeleton /> : description}
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        <Button
          size="large"
          variant="contained"
          href={
            isOrg
              ? routes.dashboard.org.issuePda(organization.gatewayId, id)
              : routes.dashboard.user.issuePda(id)
          }
        >
          {issuePda.issue}
        </Button>
        <Button
          variant="outlined"
          size="large"
          endIcon={<LaunchIcon />}
          href={routes.explorer.dataModel(id)}
          target="_blank"
        >
          {issuePda.view_on_explorer}
        </Button>
      </Stack>
    </>
  );
}
