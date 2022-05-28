import Head from 'next/head';
import Link from 'next/link';
import { plantsDatabase } from '../util/plantdata';

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
        <p>Your Chosen Ones:</p>
        <div>{}</div>
        <button>Checkout :D</button>
      </main>
    </div>
  );
}
