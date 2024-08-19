import Footer from '@/components/footer/footer';
import FooterInvestors from '@/components/footer/investors';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Footer slot={<FooterInvestors />} />
    </>
  );
}
