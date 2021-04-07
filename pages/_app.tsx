import { useEffect } from 'react';

import 'styles/styles.global.css';

export default function App({ Component, pageProps }) {
    useEffect(() => {
        const jssStyles = document.querySelector('#jss-server-side');
        if (jssStyles)
            jssStyles.parentElement.removeChild(jssStyles);
    }, []);

    return <Component {...pageProps} />;
}