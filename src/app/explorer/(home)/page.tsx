import FeaturedDataModels from './components/featured-data-models/featured-data-models';
import Header from './components/header/header';
import LastTransactionsSection from './components/last-transactions-section/last-transactions-section';

export default function ExplorerHome() {
  return (
    <>
      <Header />
      <LastTransactionsSection />
      <FeaturedDataModels />
    </>
  );
}
