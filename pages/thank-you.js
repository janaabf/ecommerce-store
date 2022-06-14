import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { React, useEffect, useState } from 'react';
import Header from '../components/Header.js';
import Layout from '../components/Layout.js';

export default function Checkout(props) {
  return (
    <>
      <Head>
        <title>Store - Home</title>
        <meta name="My first E-Commerce store" content="Cart" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout globalCart={props.globalCart}>
        <main>
          <h1>Thank you for your order!</h1>
          <Link href="/">
            <button>Shop more ☁️</button>
          </Link>
        </main>
      </Layout>
    </>
  );
}
