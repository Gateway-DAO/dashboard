import { Metadata } from 'next';

import FeaturedDataModels from './components/featured-data-models/featured-data-models';
import Header from './components/header/header';
import LastTransactionsSection from './components/last-transactions-section/last-transactions-section';

export const metadata: Metadata = {
  title: `Gateway Explorer`,
  description: `Explore transactions, data models, and request templates on our Gateway platform.`,
};

export default function ExplorerHome() {
  return (
    <>
      <Header />
      <LastTransactionsSection />
      <FeaturedDataModels />
    </>
  );
}
