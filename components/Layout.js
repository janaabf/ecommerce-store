import Cookies from 'js-cookie';
import { React, useEffect, useState } from 'react';
import { getParsedCookie, setStringifiedCookie } from '../util/cookies';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  // const [totalQuantity, setTotalQuantity] = useState(0);

  // useEffect(() => {
  //   const currentCart = Cookies.get('cart') ? getParsedCookie('cart') : [];
  //   const total = currentCart
  //     .map((cookie) => cookie.quantity)
  //     .reduce((accumulator, value) => {
  //       return parseInt(accumulator) + parseInt(value);
  //     }, 0);
  //   setTotalQuantity(total);
  //   console.log(total);
  // }, []);

  // const totalCart = props.cartItems
  //   .map((cookie) => cookie.quantity)
  //   .reduce((accumulator, value) => {
  //     return parseInt(accumulator) + parseInt(value);
  //   }, 0);

  // const totalQuantity = cartItems
  // .map((arr) => arr.quantity)
  // .reduce((a, b) => {
  //   return a + b;
  // }, 0);
  // console.log(props);

  return (
    <div>
      <Header globalCart={props.globalCart} />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
