import { useState } from 'react';
import Head from 'next/head';

import downloadjs from 'downloadjs';

import { Button, CircularProgress, Container, Link, Snackbar, TextField, Typography } from '@material-ui/core';
import MuiAlert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';

const margin = 60;
const useStyles = makeStyles({
    root: {
        marginTop: margin,
        marginBottom: margin,
    },
    buttonWrapper: {
        position: 'relative',
    },
    progress: {
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function MiroExport() {
    const [code, setCode] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [open, setOpen] = useState(false);
    const [steps, setSteps] = useState<string[]>([]);

    const classes = useStyles();

    const onClose = (_, reason) => {
        if (reason !== 'clickaway')
            setOpen(false);
    };

    const addStep = (step: string) => setSteps(steps => [...steps, step]);

    const onSubmit = () => {
        setLoading(true);
        setOpen(false);

        if (code === '') {
            setMessage('Please enter your Miro export code! See the Notion tutorial for more information.');
            setLoading(false);
            setOpen(true);
            return;
        }

        const regex = /(http|https):\/\/miro.com\/app\/embed\/([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?/g;
        const matches = code.match(regex);
        if (!matches?.length) {
            setMessage('Sorry, that code is invalid! See the Notion tutorial for more information.');
            setLoading(false);
            setOpen(true);
            return;
        }

        const embedUrl = matches[0];

        addStep('Connecting to server...');
        fetch('/api/med/miro-export',
            {
                body: JSON.stringify({ embedUrl }),
                method: 'POST',
            }
        )
            .then(res => res.text())
            .then(data => {
                downloadjs(data, 'miro-image.png', 'image/png');
                setLoading(false);
            });
    };

    return (
        <>
            <Head>
                <title>High-Res Miro Export</title>

                <link rel="shortcut icon" href="https://www.google.com/s2/favicons?domain=miro.com" />
            </Head>

            <Container className={classes.root} maxWidth="sm">
                <Snackbar autoHideDuration={6000} open={open} onClose={onClose}>
                    <Alert onClose={onClose} severity="warning">
                        {message}
                    </Alert>
                </Snackbar>

                <Typography variant="h3">High-Res Miro Export</Typography>

                <Typography variant="body1">
                    For instructions on how to use this, please see <Link href="https://www.notion.so/ianlangleben/High-Res-Miro-Export-bc62ac9e45594f9d91f42cc01956c944" target="_blank">my Notion tutorial</Link>.
                </Typography>

                <br /><br />

                <TextField
                    fullWidth
                    label="Export code"
                    multiline
                    onChange={event => setCode(event.target.value)}
                    rows={10}
                    value={code}
                    variant="outlined"
                />

                <br /><br />

                <div className={classes.buttonWrapper}>
                    <Button
                        color="primary"
                        disabled={loading}
                        onClick={onSubmit}
                        size="large"
                        variant="outlined"
                    >Get me my image!</Button>
                    {loading && <CircularProgress className={classes.progress} size={24} />}
                </div>

                <br /><br />
                {loading ? <Typography variant="body1">Processing...</Typography> : <></>}
            </Container>
        </>
    );
}