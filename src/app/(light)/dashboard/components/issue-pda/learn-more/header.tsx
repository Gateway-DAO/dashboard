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
      <Stack mb={3}>
        <Typography variant="h4" mb={1}>
          {isLoading ? <Skeleton /> : title}
        </Typography>
        {tags && tags.length > 0 && (
          <Stack direction="row" gap={1}>
            {tags.map((tag) => (
              <Chip key={tag} label={tag} />
            ))}
          </Stack>
        )}
        <Typography variant="body1" mt={5}>
          {isLoading ? <Skeleton /> : description}
        </Typography>
      </Stack>
      <Stack direction="row" gap={1}>
        <Button
          size="large"
          variant="contained"
          href={
            isOrg
              ? routes.dashboard.org.issue(organization.gatewayId)
              : routes.dashboard.user.issue
          }
        >
          {issuePda.issue}
        </Button>
        <Button
          variant="outlined"
          size="large"
          endIcon={<LaunchIcon />}
          href={routes.explorer.dataModel(id)}
        >
          {issuePda.view_on_explorer}
        </Button>
      </Stack>
    </>
  );
}
