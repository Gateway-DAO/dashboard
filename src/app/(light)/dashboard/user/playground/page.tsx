import TitleLayout from '@/components/title-layout/title-layout';
import { playground } from '@/locale/en/playground';

import PlaygroundWrapper from './components/playground-wrapper';

export default async function PlaygroundPage() {
  return (
    <>
      <TitleLayout
        titleId="playground-title"
        title={playground.title}
        subtitle={playground.subtitle}
      />
      <PlaygroundWrapper />
    </>
  );
}
