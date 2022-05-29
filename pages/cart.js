import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Link from 'next/link';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';

const plantItem = css`
  border: 1px solid gray;
  border-radius: 3px;
  margin: 10px 10px;
  padding: 15px 20px;
  :hover {
    background-color: #eee;
  }
`;

export default function Cart() {
  const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
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
        <div>
          {currentCart.map((cartItem) => {
            return (
              <div key={`cart-${cartItem.name}`} css={plantItem}>
                <div>
                  <div>
                    {cartItem.quantity} x {cartItem.name}
                  </div>
                  {console.log(cartItem.name)}
                </div>
              </div>
            );
          })}
        </div>
        <button>Checkout :D</button>
      </main>
    </div>
  );
}
