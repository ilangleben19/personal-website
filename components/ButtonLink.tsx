import { PropsWithChildren } from 'react';

import styles from 'styles/ButtonLink.module.scss';

type Props = PropsWithChildren<{
    href: string;
}>;

export default function ButtonLink({ children, href }: Props) {
    return (
        <a className={styles.link} href={href} target="_blank">
            {children}
        </a>
    );
}