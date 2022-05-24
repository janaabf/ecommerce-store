import Head from 'next/head';
import Link from 'next/link';

export default function Cart() {
  return (
    <div>
      <Head>
        <title>Store - Home</title>
        <meta name="My first E-Commerce store" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>Cart</h1>
        <p>List of your favorite items</p>
        <div>ITEMS</div>
        <button>Checkout :D</button>
      </main>
    </div>
  );
}
