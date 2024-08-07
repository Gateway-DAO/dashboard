import Footer from './components/footer/footer';
import Providers from './providers';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Providers>
      {children}
      <Footer />
    </Providers>
  );
}
