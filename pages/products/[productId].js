import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Layout from '../../components/Layout.js';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { getProductDataId } from '../../util/database';

const mainStyles = css`
  margin: 0 5vw;
`;

const contentContainer = css`
  display: flex;
  align-items: center;
  gap: 20px;
`;

const contentStyles = css`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default function Product(props) {
  const [cartCount, setCartCount] = useState(1); // access count of product if there

  // const [totalQuantity, setTotalQuantity] = useState(props.totalQuantity);

  // ---------------- to set totalQuantity from cookies manually
  // useEffect(() => {
  //   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  //   const initialTotalCart = currentCart
  //     .map((cookie) => cookie.quantity)
  //     .reduce((accumulator, value) => {
  //       return parseInt(accumulator) + parseInt(value);
  //     }, 0);
  //   setTotalQuantity(initialTotalCart);
  // }, []);

  // ----------------- to update quantity onClick manually
  // function handleUpdate() {
  //   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  //   let totalQuantityCookies = currentCart
  //     .map((cookie) => cookie.quantity)
  //     .reduce((accumulator, value) => {
  //       return parseInt(accumulator) + parseInt(value);
  //     }, 0);
  //   totalQuantityCookies += parseInt(cartCount);
  //   setTotalQuantity(totalQuantityCookies);
  // }

  // useEffect(() => {
  //   const totalQuantity = handleUpdate();
  // }, [cartCount]);

  if (!props.product) {
    return (
      <div>
        <Head>
          <title>product not found</title>
          <meta
            name="description"
            content="Unfortunately, we don't have the product that you're looking for :("
          />
        </Head>

        <h1>product not found :(</h1>
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>product</title>
        <meta name="description" content="the product you were looking for." />
      </Head>

      <Layout globalCart={props.globalCart}>
        <main css={mainStyles}>
          <h2>{props.product.subtitle}</h2>
          <h1>{props.product.name}</h1>
          <div css={contentContainer}>
            <Image src={`/${props.product.id}.jpg`} width="300" height="300" />
            <div css={contentStyles}>
              <div>{props.product.description}</div>
              <div>{props.product.price} €</div>
              <label>
                <input
                  type="number"
                  step={1}
                  value={cartCount}
                  onChange={(e) =>
                    e.currentTarget.value > 0
                      ? setCartCount(e.currentTarget.value)
                      : setCartCount(1)
                  }
                />
                <button
                  onClick={() => {
                    // alert('added to cart!');
                    const currentProductsInCart = Cookies.get('cart')
                      ? getParsedCookie('cart')
                      : [];

                    if (
                      !currentProductsInCart.find(
                        (cookie) => cookie.id === props.product.id,
                      )
                    ) {
                      // add product if product not yet in cart
                      const newProductsInCart = [
                        ...currentProductsInCart,
                        {
                          id: props.product.id,
                          // name: props.product.name,
                          quantity: parseInt(cartCount),
                          // price: parseInt(props.product.price),
                        },
                      ];
                      setStringifiedCookie('cart', newProductsInCart);
                      props.setGlobalCart(newProductsInCart);
                    } else {
                      // add quantity if product already in cart
                      const updatedProduct = currentProductsInCart.find(
                        (cookie) => cookie.id === props.product.id,
                      );
                      updatedProduct.quantity += parseInt(cartCount); // shouldn't be parsed again???
                      setStringifiedCookie('cart', currentProductsInCart);
                      props.setGlobalCart(currentProductsInCart);
                    }
                  }}
                >
                  Add to Cart
                </button>
              </label>
              <br />
              <Link href="/">
                <button>back to all products</button>
              </Link>
            </div>
          </div>
        </main>
      </Layout>
    </div>
  );
}

export async function getServerSideProps(context) {
  // get right product from database
  const product = await getProductDataId(context.query.productId);

  // // --------- to get animals NOT from Database:
  // const foundProduct = productData.find((products) => {
  //   return products.id === context.query.productId;
  // });

  // // get saved cookie
  // const cartCookie = JSON.parse(context.req.cookies.cart || '[]');

  // // get cookies
  // const foundCookie = cartCookie.find((cookie) => {
  //   return cookie.id === foundProduct.id;
  // });

  // console.log(foundCookie);

  return {
    props: {
      product: product, // value is always truthy, so we don't need to have an else statement
    },
  };
}
