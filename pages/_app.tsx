
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from '@/components/Footer';
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App({ Component, pageProps }: AppProps) {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <>
      <Navbar onHeightChange={setNavHeight} />
      <main style={{ paddingTop: navHeight, flex: 1}}>
        <Component {...pageProps} />
      </main>
      <Footer/>
      
    </>
  );
}
