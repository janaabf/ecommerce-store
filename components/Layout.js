import Footer from './Footer';
import Header from './Header';

export default function Layout(props) {
  return (
    <div>
      <div>{props.children}</div>
      <Footer />
    </div>
  );
}
