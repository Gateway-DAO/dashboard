import Link from 'next/link';
import { usePathname } from 'next/navigation';

import externalLinks from '@/constants/externalLinks';
import { common } from '@/locale/en/common';
import { currentEnv, isSandbox } from '@/utils/env';

import { Button } from '@mui/material';

export default function ToSandboxOrMainnetLink() {
  const pathname = usePathname();
  return (
    <>
      {currentEnv === 'production' ? (
        <Button
          component={Link}
          variant="outlined"
          href={`${externalLinks.gateway_sandbox}${pathname}`}
        >
          {common.general.sandbox}
        </Button>
      ) : (
        <Button
          component={Link}
          variant="outlined"
          href={`${externalLinks.gateway}${pathname}`}
        >
          {isSandbox ? common.general.testnet : common.general.mainnet}
        </Button>
      )}
    </>
  );
}
