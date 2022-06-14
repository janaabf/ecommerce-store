import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Layout from '../components/Layout.js';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import { getProductData } from '../util/database';

const mainStyles = css`
  margin: 0 5vw;
`;

const checkoutContentStyles = css`
  display: flex;
  justify-content: center;
  gap: 100px;
  /* align-items: end; */
`;

const formStyles = css`
  li {
    margin: 5px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }
  input {
    background: none;
    margin-left: 20px;
    border: 1px solid black;

    :focus {
      background: white;
    }
  }
`;

export default function Checkout(props) {
  const cartSum = props.cartItems
    .map((arr) => arr.price * arr.quantity)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  console.log(props.cartItems);

  return (
    <>
      <Head>
        <title>Store - Home</title>
        <meta name="My first E-Commerce store" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout globalCart={props.globalCart}>
        <main css={mainStyles}>
          <h1>Checkout</h1>
          <div css={checkoutContentStyles}>
            <div>
              <h2>Your picks:</h2>
              {/* <p>(good choice, btw 😉)</p> */}
              {props.cartItems.map((cartItem) => {
                return (
                  <div key={`checkout-${cartItem.id}`}>
                    <em>
                      {cartItem.quantity}x {cartItem.name}:
                    </em>
                    <p>Subtotal: {cartItem.quantity * cartItem.price} €</p>
                    <p>_____________________</p>
                  </div>
                );
              })}
              <p>Total Sum: {cartSum} €</p>
              <p>Not quite rigt?</p>
              <Link href="/cart">
                <button>Back to Cart</button>
              </Link>
            </div>
            <div>
              <h2>Please fill in your Information:</h2>
              <form css={formStyles}>
                <ul>
                  <li>
                    <label htmlFor="first-name">First Name</label>
                    <input id="first-name" />
                  </li>
                  <li>
                    <label htmlFor="last-name">Last Name</label>
                    <input id="last-name" />
                  </li>
                  <li>
                    <label htmlFor="email-address">E-Mail</label>
                    <input type="email-address" id="email" />
                  </li>
                  <li>
                    <label htmlFor="address">Address</label>
                    <input id="address" />
                  </li>
                  <li>
                    <label htmlFor="City">City</label>
                    <input id="City" />
                  </li>
                  <li>
                    <label htmlFor="postal-code">Postal Code</label>
                    <input id="postal-code" />
                  </li>
                  <li>
                    <label htmlFor="country">Country</label>
                    <input id="country" />
                  </li>
                  <br />
                  <li>
                    <label htmlFor="credit-card">Credit Card Number</label>
                    <input id="credit-card" />
                  </li>
                  <li>
                    <label htmlFor="expiration-date">Expiration Date</label>
                    <input id="expiration-date" />
                  </li>
                  <li>
                    <label htmlFor="security-code">Security Code</label>
                    <input id="security-code" />
                  </li>
                </ul>
                <Link href="/thank-you">
                  <button
                    onClick={() => {
                      setStringifiedCookie('cart', []);
                      props.setGlobalCart([]);
                    }}
                  >
                    Confirm Order
                  </button>
                </Link>
              </form>
            </div>
          </div>
        </main>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  const productData = await getProductData(); // info from database
  const cookies = JSON.parse(context.req.cookies.cart || '[]');

  const cartItems = cookies.map((cookie) => {
    const databaseProduct = productData.find(
      (product) => cookie.id === product.id,
    );
    return {
      id: databaseProduct.id,
      name: databaseProduct.name,
      description: databaseProduct.description,
      price: databaseProduct.price,
      quantity: cookie.quantity,
    };
  });

  console.log(cartItems);

  return {
    props: {
      productData,
      cartItems,
    },
  };
}
