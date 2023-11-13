import { Metadata } from 'next';

import FeaturedDataModels from './components/featured-data-models/featured-data-models';
import FeaturedRequestTemplates from './components/featured-request-templates/featured-request-templates';
import Header from './components/header/header';
import LastTransactionsSection from './components/last-transactions-section/last-transactions-section';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: `Gateway Explorer`,
    description: `Explore transactions, data models, and request templates on our Gateway platform.`,
  };
}

export default function ExplorerHome() {
  return (
    <>
      <Header />
      <LastTransactionsSection />
      <FeaturedDataModels />
      <FeaturedRequestTemplates />
    </>
  );
}
