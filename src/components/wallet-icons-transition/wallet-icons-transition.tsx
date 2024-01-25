import { useEffect, useState } from 'react';

import { Chain } from '@/services/protocol/types';
import { FaEthereum } from 'react-icons/fa';
import { IconBaseProps } from 'react-icons/lib';
import { TbCurrencySolana } from 'react-icons/tb';

import PoktIcon from '../icons/pokt';

const icons = {
  [Chain.Evm]: FaEthereum,
  [Chain.Sol]: TbCurrencySolana,
  [Chain.Pokt]: PoktIcon,
};

type Props = {
  network?: Chain;
};

function AnimatedWallet(iconProps: IconBaseProps) {
  const [currentIcon, setCurrentIcon] = useState<Chain>(Chain.Evm);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIcon((icon) => (icon === Chain.Evm ? Chain.Sol : Chain.Evm));
    }, 3000); // 3 second

    return () => {
      clearInterval(intervalId);
    };
  }, []);
  const Icon = icons[currentIcon];
  return <Icon {...iconProps} />;
}

export function WalletIconsTransition({
  network,
  ...iconProps
}: Props & IconBaseProps) {
  if (!network) {
    return <AnimatedWallet {...iconProps} />;
  }
  const Icon = icons[network];

  return <Icon {...iconProps} />;
}
