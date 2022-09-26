import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Container, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import TelegramLoginButton, { TelegramUser } from '@v9v/ts-react-telegram-login';
import cat from '../../assets/cat.png';
import logo_transparent from '../../assets/logo_transparent.png';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { setInState } from '../../redux/actions/app';
import { RootState, useAppDispatch } from '../../redux/Store';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const history = useHistory();
    const dispatch = useAppDispatch();
    const token = useSelector((state: RootState) => state.app.secret);
    const [email, setEmail] = useState('');
    const { mutate: getProfile, data: profileData } = useMutation(() => {
        return axios
            .get(`${axios.defaults.baseURL}/user/profile`, {
                headers: { auth: token },
            })
            .then((data) => data.data);
    });
    const { mutate: loginUser, data: loginData } = useMutation((data: TelegramUser) => {
        return axios.post(`${axios.defaults.baseURL}/auth/login`, data);
    });
    const { mutate: sendEmail, data: emailData } = useMutation((data: string) => {
        return axios.post(`${axios.defaults.baseURL}/auth/email`, { email: data }, { headers: { auth: token } });
    });

    const handleTelegramResponse = (user: TelegramUser) => {
        loginUser(user);
    };

    const handleEmailConfirm = () => {
        if (email && email !== '') {
            sendEmail(email);
        }
    };

    const handlePhoneConfirm = () => {
        history.go(0);
    };

    useEffect(() => {
        if (loginData) {
            dispatch(setInState(loginData.data));
        }
    }, [loginData]);

    useEffect(() => {
        if (token) {
            getProfile();
        }
    }, [token]);

    return (
        <div className={className}>
            <Container className="container">
                <img src={logo_transparent} />
                <Typography variant="h3" marginY={2} color="white" align="center">
                    Pett Network Web Wallet
                </Typography>
                <Typography color="white" marginBottom={6} align="center">
                    Sign up with Telegram
                </Typography>
                <TelegramLoginButton requestAccess dataOnAuth={handleTelegramResponse} botName="pett_buy_bot" />
            </Container>
            <div className="back" />
            <Dialog maxWidth="sm" fullWidth open={Boolean(profileData) && !profileData!.email_activated}>
                <DialogContent>
                    {!emailData && Boolean(profileData) && !profileData!.email ? (
                        <Grid container direction="column" spacing={2} textAlign="center">
                            <Grid item md={12}>
                                <Typography variant="h4">Email Confirmation</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography align="center">Please, type your email to confirm your account.</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <TextField
                                    fullWidth
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Write your email"
                                    label="Email"
                                />
                            </Grid>
                            <Grid item md={12}>
                                <Button
                                    variant="contained"
                                    onClick={handleEmailConfirm}
                                    disableElevation
                                    color="secondary"
                                >
                                    Confirm
                                </Button>
                            </Grid>
                        </Grid>
                    ) : (
                        <Grid container direction="column" spacing={2} textAlign="center">
                            <Grid item md={12}>
                                <Typography variant="h4">Congratulations!</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography align="center">
                                    We've just sent an confirmation link to your email. Please, confirm it to continue
                                    registration.
                                </Typography>
                            </Grid>
                        </Grid>
                    )}
                </DialogContent>
            </Dialog>
            <Dialog
                maxWidth="sm"
                fullWidth
                open={Boolean(profileData) && profileData!.email_activated && !profileData!.telegram_activated}
            >
                <DialogContent>
                    <Grid container direction="column" spacing={2} textAlign="center">
                        <Grid item md={12}>
                            <Typography variant="h4">Phone Confirmation</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">
                                Almost done! Please, share your contact to our telegram bot to finish the registration.
                            </Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Button variant="contained" onClick={handlePhoneConfirm} disableElevation color="secondary">
                                Done
                            </Button>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
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
        background: url(${cat});
        width: 266px;
        height: 224px;
        background-repeat: no-repeat;
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
`;
