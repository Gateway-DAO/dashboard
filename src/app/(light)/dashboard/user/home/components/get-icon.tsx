import HomeOrganizationIcon from '@/components/icons/home-organization';
import PDABannerIcon from '@/components/icons/pda-banner';
import PlaygroundIcon from '@/components/icons/playground';
import { SxProps, Theme } from '@mui/system';

export default function GetIcon({
  index,
  sx,
}: {
  index: number;
  sx: SxProps<Theme>;
}) {
  return (
    <>
      {index === 0 && <HomeOrganizationIcon sx={sx} />}
      {index === 1 && <PlaygroundIcon sx={sx} />}
      {index === 2 && <PDABannerIcon sx={sx} />}
    </>
  );
}
