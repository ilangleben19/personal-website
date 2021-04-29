import { AnchorHTMLAttributes, DetailedHTMLProps } from 'react';

import classnames from 'classnames';

import styles from './ButtonLink.module.scss';

type ButtonLinkProps = DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export default function ButtonLink(props: ButtonLinkProps) {
    const { className, target = "_blank", ...restProps } = props;

    return (
        <a
            className={classnames(styles.link, className)}
            target={target}
            {...restProps}
        />
    );
}