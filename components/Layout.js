import { React } from 'react';
import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <Header globalCart={props.globalCart} />
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
