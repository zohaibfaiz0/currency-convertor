import Head from 'next/head';
import CurrencyConverter from '@/app/components/converter';

const Home: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Currency Converter</title>
        <meta name="description" content="A simple currency converter app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <CurrencyConverter />
      </main>
    </div>
  );
};

export default Home;
