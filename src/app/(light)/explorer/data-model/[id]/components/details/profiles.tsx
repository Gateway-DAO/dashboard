'use client';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { PartialDeep } from 'type-fest';
import { Explorer_Data_Model_Detail_OverviewQuery } from '@/services/protocol/types';
import { useMemo } from 'react';
import { useToggle } from '@react-hookz/web';
import ProfileList from './profile-list';
import { Button, Collapse, Typography } from '@mui/material';
import { ArrowDropDown, ArrowDropUp } from '@mui/icons-material';
import { common } from '@/locale/en/common';

type Props = {
  dataModel: PartialDeep<Explorer_Data_Model_Detail_OverviewQuery['dataModel']>;
};

export default function Profiles({ dataModel }: Props) {
  const [isShowing, toggleShowing] = useToggle(false);
  const { shownAllowedProfiles, remainingAllowedProfiles } = useMemo(() => {
    const allowedUsers =
      dataModel.allowedUsers?.map((user) => getOrganizationOrUserData(user)) ??
      [];
    const allowedOrganizations =
      dataModel.allowedOrganizations?.map((organization) =>
        getOrganizationOrUserData(dataModel.createdBy!, organization!)
      ) ?? [];

    const allowedProfiles = [...allowedOrganizations, ...allowedUsers];
    const shownAllowedProfiles = allowedProfiles.slice(0, 3);
    const remainingAllowedProfiles = allowedProfiles.slice(3);

    return { shownAllowedProfiles, remainingAllowedProfiles };
  }, [dataModel.createdBy]);

  return (
    <>
      <ProfileList profiles={shownAllowedProfiles} sx={{ mt: 3 }} />
      {remainingAllowedProfiles.length > 0 && (
        <>
          <Button
            onClick={toggleShowing}
            endIcon={isShowing ? <ArrowDropUp /> : <ArrowDropDown />}
            sx={{ mt: 2 }}
          >
            {common.general.show_more}
          </Button>
          <Collapse in={isShowing}>
            <ProfileList profiles={remainingAllowedProfiles} sx={{ mt: 2 }} />
          </Collapse>
        </>
      )}
    </>
  );
}
