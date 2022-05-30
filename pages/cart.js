import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import { React, useEffect, useState } from 'react';
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
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
    setCartItems(currentCart);
    console.log('set initial value');
  }, []);

  let totalQuantity = 0;
  for (let i = 0; i < cartItems.length; i++) {
    totalQuantity += cartItems[i].quantity;
  }

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
        {cartItems.map((cartItem) => {
          return (
            <div key={`cart-${cartItem.name}`} css={plantItem}>
              <div>
                <div>
                  {cartItem.quantity} x {cartItem.name}
                  <button
                    onClick={() => {
                      const updatedItem = cartItems.find(
                        (item) => item.name === cartItem.name,
                      );
                      updatedItem.quantity += 1;
                      setStringifiedCookie('cart', cartItems);
                      setCartItems(cartItems);
                      console.log(cartItems);
                      console.log(cartItem.quantity);
                      console.log(updatedItem);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      const updatedItem = cartItems.find(
                        (item) => item.name === cartItem.name,
                      );
                      updatedItem.quantity -= 1;
                      setStringifiedCookie('cart', cartItems);
                      setCartItems(cartItems);
                      console.log(cartItems);
                      console.log(cartItem.quantity);
                      console.log(updatedItem);
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => {
                    const newCart = cartItems.filter(
                      (item) => item.name !== cartItem.name,
                    );
                    setStringifiedCookie('cart', newCart);
                    setCartItems(newCart);
                  }}
                >
                  remove from cart
                </button>
              </div>
            </div>
          );
        })}
        <div>total quantity of items: {totalQuantity}</div>
        <button>Checkout :D</button>
      </main>
    </div>
  );
}
