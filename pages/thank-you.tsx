import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '../components/Layout.js';

const mainStyles = css`
  margin: 30vh auto;
  text-align: center;

  a {
    color: #3e9aa5;
    font-weight: bold;
    :hover {
      color: #1a494e;
    }
  }
`;

type Props = {
  globalCart: { id: number; quantity: number };
};

export default function Checkout(props: Props) {
  return (
    <>
      <Head>
        <title>Store - Home</title>
        <meta name="My first E-Commerce store" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout globalCart={props.globalCart}>
        <main css={mainStyles}>
          <div>
            <h1>Thank you for your order!</h1>
            {/* {console.log(props)} */}
            <Link href="/">
              <a>Shop more</a>
            </Link>
          </div>
        </main>
      </Layout>
    </>
  );
}
