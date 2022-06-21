import { css } from '@emotion/react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { React } from 'react';
import Layout from '../components/Layout.js';
import { setStringifiedCookie } from '../util/cookies';
import { getProductData } from '../util/database';

const mainStyles = css`
  margin: 0 5vw;
`;

const checkoutContentStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;

  a {
    color: #3e9aa5;
    font-weight: bold;
    :hover {
      color: #1a494e;
    }
  }
`;
const flexChild = css`
  background: white;
  border-radius: 10px;
  padding: 10px 30px;
  border-radius: 3px;
`;

const formStyles = css`
  li {
    margin: 5px;
    padding: 5px;
    display: flex;
    justify-content: space-between;
  }
  input {
    margin-left: 20px;
    background-color: #f3f2ef;
    border: 1px solid black;
    width: 20vw;

    :focus {
      background: white;
    }
  }
`;

export default function Checkout(props) {
  const router = useRouter();
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
            <div css={flexChild}>
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
              <br />
              <p>
                <strong>Not quite right?</strong>
              </p>
              <Link href="/cart">
                <a>{'<'} Back to Cart</a>
              </Link>
            </div>
            <div css={flexChild}>
              <h2>Please fill in your Information:</h2>
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  router.push('/thank-you').catch(() => {
                    console.log('submit info error');
                  });
                }}
                css={formStyles}
              >
                <ul>
                  <li>
                    <label htmlFor="first-name">First Name</label>
                    <input required id="first-name" />
                  </li>
                  <li>
                    <label htmlFor="last-name">Last Name</label>
                    <input required id="last-name" />
                  </li>
                  <li>
                    <label htmlFor="email-address">E-Mail</label>
                    <input required type="email-address" id="email" />
                  </li>
                  <li>
                    <label htmlFor="address">Address</label>
                    <input required id="address" />
                  </li>
                  <li>
                    <label htmlFor="City">City</label>
                    <input required id="City" />
                  </li>
                  <li>
                    <label htmlFor="postal-code">Postal Code</label>
                    <input required id="postal-code" />
                  </li>
                  <li>
                    <label htmlFor="country">Country</label>
                    <input required id="country" />
                  </li>
                  <br />
                  <li>
                    <label htmlFor="credit-card">Credit Card Number</label>
                    <input required id="credit-card" />
                  </li>
                  <li>
                    <label htmlFor="expiration-date">Expiration Date</label>
                    <input required id="expiration-date" />
                  </li>
                  <li>
                    <label htmlFor="security-code">Security Code</label>
                    <input required id="security-code" />
                  </li>
                  <br />
                  <br />

                  <button
                    onClick={() => {
                      setStringifiedCookie('cart', []);
                      props.setGlobalCart([]);
                    }}
                  >
                    Submit and Confirm Order
                  </button>
                </ul>
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

  return {
    props: {
      productData,
      cartItems,
    },
  };
}
