'use client';
import { useMemo } from 'react';

import ToggleDropIcon from '@/components/toggle-drop-icon/toggle-drop-icon';
import { common } from '@/locale/en/common';
import { Explorer_Data_Model_Detail_OverviewQuery } from '@/services/protocol/types';
import getOrganizationOrUserData from '@/utils/get-organization-or-user-data';
import { useToggle } from '@react-hookz/web';
import { PartialDeep } from 'type-fest';

import { Button, Collapse } from '@mui/material';

import ProfileList from '../profile-list/profile-list';

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
            endIcon={<ToggleDropIcon active={isShowing} />}
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
