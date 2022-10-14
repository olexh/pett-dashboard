import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Button, Container, Grid, Typography } from '@mui/material';
import cat from '../../assets/cat.png';
import logo_transparent from '../../assets/logo_transparent.png';
import LoginIcon from '@mui/icons-material/Login';
import AddIcon from '@mui/icons-material/Add';
import { LoginDialog, SignUpDialog } from './layout';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../redux/Store';
import { setInState } from '../../redux/actions/app';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const language = useSelector((state: RootState) => state.app.language);
    const [signUpOpen, setSignUpOpen] = useState(false);
    const [loginOpen, setLoginOpen] = useState(false);

    const openLogin = () => {
        setSignUpOpen(false);
        setLoginOpen(true);
    };

    const openSignUp = () => {
        setSignUpOpen(true);
        setLoginOpen(false);
    };

    const switchLang = () => {
        if (language === 'en') {
            dispatch(setInState({ language: 'ko' }));
        } else {
            dispatch(setInState({ language: 'en' }));
        }
    };

    return (
        <div className={className}>
            <Container className="container">
                <img src={logo_transparent} alt="logo" />
                <Typography variant="h3" marginY={2} color="white" align="center">
                    {t('pettNetworkWebWallet')}
                </Typography>
                <Typography color="white" marginBottom={6} align="center">
                    {t('transactDigitalAssetsWithoutDownloadsAndInstallati')}
                </Typography>
                <Grid container maxWidth={300} spacing={2}>
                    <Grid item md={12} xs={12}>
                        <Button
                            size="large"
                            disableElevation
                            fullWidth
                            variant="contained"
                            color="info"
                            startIcon={<LoginIcon />}
                            onClick={openLogin}
                        >
                            {t('logIn')}
                        </Button>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button
                            size="large"
                            disableElevation
                            fullWidth
                            variant="contained"
                            color="error"
                            startIcon={<AddIcon />}
                            onClick={openSignUp}
                        >
                            {t('signUp')}
                        </Button>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <Button size="large" disableElevation color="inherit" onClick={switchLang}>
                            {language === 'en' ? '🇰🇷 KR' : '🇬🇧 EN'}
                        </Button>
                    </Grid>
                </Grid>
            </Container>
            <div className="back" />
            <LoginDialog open={loginOpen} setOpen={setLoginOpen} signUpOpen={openSignUp} />
            <SignUpDialog open={signUpOpen} setOpen={setSignUpOpen} loginOpen={openLogin} />
        </div>
    );
};

export default styled(Component)`
    height: 100vh;

    .container {
        padding-top: ${({ theme }) => theme.spacing(12)};
        height: inherit;
        display: flex;
        flex-direction: column;
        align-items: center;
        position: relative;
        text-align: center;
        color: white;
    }

    .back {
        content: ' ';
        position: absolute;
        z-index: -1;
        width: 100vw;
        height: 100vw;
        background: ${({ theme }) => theme.palette.primary.main};
        border-radius: 50%;
        top: -55vw;
    }

    &:after {
        content: ' ';
        position: absolute;
        z-index: 1;
        width: 266px;
        height: 224px;
        background: url(${cat}) no-repeat;
        background-size: contain;
        top: calc(45vw - 112px);
        left: calc(50vw - 133px);
    }

    ${({ theme }) => theme.breakpoints.down('md')} {
        background: ${({ theme }) => theme.palette.primary.main};

        &:after {
            top: calc(100% - 224px);
        }
    }

    ${({ theme }) => theme.breakpoints.down('sm')} {
        background: ${({ theme }) => theme.palette.primary.main};

        &:after {
            display: none;
        }
    }
`;
