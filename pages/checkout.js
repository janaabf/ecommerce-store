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

export default function Checkout(props) {
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
          <form>
            <ul>
              <label htmlFor="first-name">First Name</label>
              <input id="first-name" />
            </ul>
          </form>
        </main>
      </Layout>
    </>
  );
}
