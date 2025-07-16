// // app.tsx (or _app.tsx)

// import '../styles/globals.css';
// import type { AppProps } from 'next/app';
// import Navbar from '../components/Navbar';
// import 'bootstrap/dist/css/bootstrap.min.css';

// export default function App({ Component, pageProps }: AppProps) {
//   return (
//     <>
//       <Navbar />
//       {/* Static padding to prevent content from hiding behind fixed navbar */}
//       <main style={{ paddingTop: '72px' }}>
//         <Component {...pageProps} />
//       </main>
//     </>
//   );
// }
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useState } from 'react';
import Navbar from '../components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App({ Component, pageProps }: AppProps) {
  const [navHeight, setNavHeight] = useState(0);

  return (
    <>
      <Navbar onHeightChange={setNavHeight} />
      <main style={{ paddingTop: navHeight }}>
        <Component {...pageProps} />
      </main>
    </>
  );
}
