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

const productItem = css`
  display: flex;
  justify-content: space-between;
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

const productContent = css`
  display: flex;
  justify-content: center;
  align-items: center;

  gap: 10px;
`;

export default function Cart(props) {
  const [cartItems, setCartItems] = useState(props.cartItems);

  // ----- needed when getting info only from cookie
  // useEffect(() => {
  //   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  //   setCartItems(currentCart);
  // }, []);

  const totalQuantity = cartItems
    .map((arr) => arr.quantity)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  console.log(props.cartItems);

  const cartSum = cartItems
    .map((arr) => arr.price * arr.quantity)
    .reduce((a, b) => {
      return a + b;
    }, 0);

  if (cartSum === 0) {
    return (
      <>
        <Head>
          <title>Store - Home</title>
          <meta name="My first E-Commerce store" content="Cart" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Layout globalCart={props.globalCart}>
          <main css={mainStyles}>
            <h1>Cart</h1>
            <p>Oh no there's nothing here yet :(</p>
            <p>
              We have lots of clouds for you to check out, only one click away:
            </p>
            <Link href="/">
              <a>
                <button>back to all clouds</button>
              </a>
            </Link>
          </main>
        </Layout>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>Store - Home</title>
        <meta name="My first E-Commerce store" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout globalCart={props.globalCart}>
        <main css={mainStyles}>
          <h1>Cart</h1>
          <p>Your Chosen Ones:</p>
          {!cartItems ? (
            <p>nothing here yet</p>
          ) : (
            cartItems.map((cartItem) => {
              return (
                <div key={`cart-${cartItem.id}`} css={productItem}>
                  <div css={productContent}>
                    <Link href={`/${cartItem.id}`} passHref>
                      <a>
                        <Image
                          src={`/${cartItem.id}.jpg`}
                          width="150"
                          height="150"
                        />
                      </a>
                    </Link>
                    <div>
                      <div>
                        <Link href={`/products/${cartItem.id}`} passHref>
                          <h2>{cartItem.name}</h2>
                        </Link>
                        {cartItem.quantity}
                        {/* add button */}
                        <button
                          onClick={() => {
                            const updatedItem = cartItems.find(
                              (item) => item.id === cartItem.id,
                            );
                            updatedItem.quantity += 1;
                            setCartItems([...cartItems]);

                            const currentCookie = Cookies.get('cart')
                              ? getParsedCookie('cart')
                              : [];
                            const updatedCart = currentCookie.find(
                              (cookie) => cookie.id === cartItem.id,
                            );
                            updatedCart.quantity += 1;
                            setStringifiedCookie('cart', currentCookie);
                            props.setGlobalCart(currentCookie);
                          }}
                        >
                          +
                        </button>
                        {/* minus button */}
                        <button
                          onClick={() => {
                            const updatedItem = cartItems.find(
                              (item) => item.id === cartItem.id,
                            );
                            const currentCookie = Cookies.get('cart')
                              ? getParsedCookie('cart')
                              : [];
                            const updatedCart = currentCookie.find(
                              (cookie) => cookie.id === cartItem.id,
                            );
                            if (updatedItem.quantity !== 1) {
                              updatedCart.quantity -= 1;
                              setStringifiedCookie('cart', currentCookie);
                              props.setGlobalCart(currentCookie);
                              updatedItem.quantity -= 1;
                              setCartItems([...cartItems]);
                            }
                          }}
                        >
                          -
                        </button>
                      </div>
                      <div>
                        subtotal: {cartItem.price * cartItem.quantity} €
                      </div>
                    </div>
                  </div>
                  <div>
                    {/* remove button */}
                    <button
                      onClick={() => {
                        // cookie
                        const currentCookie = Cookies.get('cart')
                          ? getParsedCookie('cart')
                          : [];
                        const newCookie = currentCookie.filter((cookie) => {
                          return cookie.id !== cartItem.id;
                        });
                        setStringifiedCookie('cart', newCookie);
                        props.setGlobalCart([...newCookie]);
                        // cart
                        const newCart = cartItems.filter((item) => {
                          return item.id !== cartItem.id;
                        });
                        setCartItems([...newCart]);
                        console.log(newCart);
                      }}
                    >
                      remove from cart
                    </button>
                  </div>
                </div>
              );
            })
          )}
          <div>total quantity of items: {totalQuantity}</div>
          <div>total sum: {cartSum} €</div>
          <br />
          <Link href="/checkout">
            <button>Checkout</button>
          </Link>
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

//     return [cookie, databaseProduct];
