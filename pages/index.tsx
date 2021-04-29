import Head from 'next/head';

import ButtonLink from 'components/ButtonLink';
import Icons from 'components/Icons';
import { useWindowSize } from '../util';

import styles from 'styles/Home.module.scss';

function CVButton() {
    return (
        <ButtonLink className={styles.cvButton} href="/Ian Langleben - CV.pdf">
            CV
        </ButtonLink>
    );
}

function WideLayout() {
    return (
        <div className={`${styles.root} ${styles.row}`}>
            <div className={styles.column}>
                <h1 className={styles.title}>Ian Langleben</h1>
                <div className={styles.row}>
                    <Icons />
                    <CVButton />
                </div>
            </div>
            <div style={{ width: 30 }} />
            <div>
                <img
                    alt="Ian Langleben"
                    className={styles.image}
                    height={200}
                    src="/Ian.jpg"
                    width={200}
                />
            </div>
        </div>
    );
}

function ThinLayout() {
    return (
        <div className={`${styles.root} ${styles.column}`}>
            <div className={styles.column}>
                <img
                    alt="Ian Langleben"
                    className={styles.image}
                    height={200}
                    src="/Ian.jpg"
                    width={200}
                />
                <h1 className={styles.title}>Ian Langleben</h1>
                <div className={styles.row}>
                    <Icons />
                    <CVButton />
                </div>
            </div>
        </div>
    );
}

export default function Home() {
    const windowSize = useWindowSize();

    return (
        <>
            <Head>
                <title>Ian Langleben</title>

                <link rel="preconnect" href="https://fonts.gstatic.com" />
                <link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;700&display=swap" rel="stylesheet" />

                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
                <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
                <link rel="manifest" href="/site.webmanifest" />
                <link rel="shortcut icon" href="/favicon.ico" />

                <script dangerouslySetInnerHTML={{
                    __html: `
                        {
                            "@context": "http://schema.org",
                            "@type": "Person",
                            "gender": "male",
                            "image": "https://ilang.ca/ian.jpg",
                            "name": "Ian Langleben",
                            "url": "ilang.ca"
                        }
                    `,
                }} type="json+ld" />
            </Head>

            <style jsx global>{`
                body {
                    background-image: linear-gradient(90deg, #2b4d82 0, #2890ac 100%);
                    font-family: 'Barlow', sans-serif;
                    margin: 0;
                }
            `}</style>

            {windowSize.width > 991 ? <WideLayout /> : <ThinLayout />}
        </>
    );
}
