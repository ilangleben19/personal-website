import { ReactNode } from 'react';

import ButtonLink from 'components/ButtonLink';
import EmailIcon from 'components/EmailIcon';
import GithubIcon from 'components/GithubIcon';
import LinkedinIcon from 'components/LinkedinIcon';

const icons: [string, ReactNode][] = [
    ['https://www.linkedin.com/in/ian-langleben/', <LinkedinIcon />],
    ['https://github.com/ilangleben19', <GithubIcon />],
    ['mailto:ilangleben19@gmail.com', <EmailIcon />],
];

export default function Icons() {
    return (
        <>
            {icons.map(([href, icon], i) => (
                <ButtonLink href={href as string} key={i}>{icon}</ButtonLink>
            ))}
        </>
    );
};