import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { React, useState } from 'react';
import Header from '../../components/Header.js';
import { getParsedCookie, setStringifiedCookie } from '../../util/cookies';
import { productData } from '../../util/database';

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

export default function product(props) {
  const [cartCount, setCartCount] = useState(1); // access count of product if there
  // const [productsInCart, setproductsInCart] = useState('');

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

      <Header />
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
                        name: props.product.name,
                        quantity: parseInt(cartCount),
                      },
                    ];
                    setStringifiedCookie('cart', newProductsInCart);
                    console.log(newProductsInCart);
                  } else {
                    // add quantity if product already in cart
                    const updatedProduct = currentProductsInCart.find(
                      (cookie) => cookie.id === props.product.id,
                    );
                    updatedProduct.quantity += parseInt(cartCount); // shouldn't be parsed again???
                    setStringifiedCookie('cart', currentProductsInCart);
                    console.log(currentProductsInCart);
                    console.log('product found');
                    console.log(typeof updatedProduct.quantity);
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
    </div>
  );
}

export function getServerSideProps(context) {
  const foundproduct = productData.find((product) => {
    return product.id === context.query.productId;
  });

  if (!foundproduct) {
    context.res.statusCode = 404;
  }

  return {
    props: {
      product: foundproduct || null,
    },
  };
}
