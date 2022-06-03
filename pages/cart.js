import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import { React, useEffect, useState } from 'react';
import Header from '../components/Header.js';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';

const mainStyles = css`
  margin: 0 5vw;
`;

const productItem = css`
  display: flex;
  gap: 10px;
  align-items: center;
  border: 1px solid gray;
  border-radius: 3px;
  margin: 10px 10px;
  padding: 15px 20px;
  opacity: 0.8;
  background-color: rgb(255, 255, 255, 0.5);
  :hover {
    background-color: rgb(255, 255, 255);
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

      <Header />
      <main css={mainStyles}>
        <h1>Cart</h1>
        <p>Your Chosen Ones:</p>
        {cartItems.map((cartItem) => {
          return (
            <div key={`cart-${cartItem.id}`} css={productItem}>
              <Image src={`/${cartItem.id}.jpg`} width="100" height="100" />
              <div>
                <div>
                  {cartItem.quantity} x {cartItem.name}
                  <button
                    onClick={() => {
                      const updatedItem = cartItems.find(
                        (item) => item.id === cartItem.id,
                      );
                      const newAmount = (updatedItem.quantity += 1);
                      setStringifiedCookie('cart', cartItems);
                      setCartItems([...cartItems]);
                      console.log(cartItems);
                      console.log(cartItem.quantity);
                      console.log(newAmount);
                    }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => {
                      const updatedItem = cartItems.find(
                        (item) => item.id === cartItem.id,
                      );
                      if (updatedItem.quantity === 1) {
                        const newCart = cartItems.filter(
                          (item) => item.id !== cartItem.id,
                        );
                        setStringifiedCookie('cart', newCart);
                        setCartItems(newCart);
                      } else {
                        const newAmount = (updatedItem.quantity -= 1);
                        setStringifiedCookie('cart', cartItems);
                        setCartItems([...cartItems]);
                        console.log(cartItems);
                        console.log(cartItem.quantity);
                        console.log(newAmount);
                      }
                    }}
                  >
                    -
                  </button>
                </div>
                <button
                  onClick={() => {
                    const newCart = cartItems.filter(
                      (item) => item.id !== cartItem.id,
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
        {/* <button>Checkout :D</button> */}
      </main>
    </div>
  );
}
