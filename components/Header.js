import { css } from '@emotion/react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { React, useContext, useEffect, useState } from 'react';
import Cart from '../pages/cart.js';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies.js';

const headerStyles = css`
  display: flex;
  justify-content: space-between;
  padding: 10px 14px;
  color: #333333;
`;

// let context = React.createContext(null);

export default function Header(props) {
  // const [cartItems, setCartItems] = useState([]);

  // useEffect(() => {
  //   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  //   setCartItems(currentCart);
  //   console.log('set initial value');
  // }, []);

  // useEffect(() => {
  //   setCartCounter(props.totalQuantity);
  // }, []);

  // let totalQuantity = 0;
  // for (let i = 0; i < props.cartItems.length; i++) {
  //   totalQuantity += props.cartItems[i].quantity;
  // }

  const totalQuantity = props.globalCart
    .map((arr) => arr.quantity)
    .reduce((a, b) => {
      return parseInt(a) + parseInt(b);
    }, 0);

  return (
    <header css={headerStyles}>
      <Link href="/">☁️</Link>
      <span>
        <Link href="/cart">cart </Link>
        <span>({totalQuantity})</span>
      </span>
    </header>
  );
}
