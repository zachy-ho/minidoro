import './app.css';
import type { AppProps } from 'next/app';

function PomodoroApp({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}

export default PomodoroApp;
