import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    loginOpen: () => void;
}

const Component: FC<Props> = ({ className, open, setOpen, loginOpen }) => {
    const { t } = useTranslation();
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');

    // TODO: post method
    const {
        mutate: signUpUser,
        isLoading: isLoadingSignUp,
        isSuccess: isSuccessSignUp,
        data: signUpData,
    } = useMutation((data: { email: string; username: string; password: string; phone_number: string }) => {
        return axios.post(`${axios.defaults.baseURL}/auth/join`, data);
    });

    const handleSignUp = () => {
        if (!email || email === '') {
            return;
        }

        if (!username || username === '' || username.match(new RegExp('^[a-z0-9_-]{4,32}$')) === null) {
            return;
        }

        if (!phone || phone === '') {
            return;
        }

        if (!password || password === '') {
            return;
        }

        signUpUser({ email, username, phone_number: phone, password });
    };

    useEffect(() => {
        if (signUpData && isSuccessSignUp) {
            setPhone('');
            setPassword('');
            setUsername('');
            setEmail('');
        }
    }, [isSuccessSignUp]);

    return (
        <Dialog className={className} maxWidth="sm" fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                {!signUpData || !isSuccessSignUp ? (
                    <Grid container spacing={2} textAlign="center" justifyContent="center">
                        <Grid item md={12}>
                            <Typography variant="h4">{t('signUp')}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">{t('pleaseFillUpTheFieldsToRegisterAccount')}</Typography>
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                fullWidth
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t('writeYourUsername')}
                                label={t('username')}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                fullWidth
                                required
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder={t('writeYourEmail')}
                                label={t('email')}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                fullWidth
                                value={phone}
                                required
                                type="tel"
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder={t('writeYourPhone')}
                                label={t('phone')}
                            />
                        </Grid>
                        <Grid item md={12} xs={12}>
                            <TextField
                                fullWidth
                                required
                                value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder={t('writeYourPassword')}
                                label={t('password')}
                            />
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <Button
                                disabled={isLoadingSignUp}
                                variant="outlined"
                                size="large"
                                fullWidth
                                onClick={loginOpen}
                                disableElevation
                                color="secondary"
                            >
                                {t('logIn')}
                            </Button>
                        </Grid>
                        <Grid item md={4} xs={6}>
                            <LoadingButton
                                fullWidth
                                loading={isLoadingSignUp}
                                loadingPosition="start"
                                variant="contained"
                                size="large"
                                onClick={handleSignUp}
                                disableElevation
                                color="secondary"
                            >
                                {t('confirm')}
                            </LoadingButton>
                        </Grid>
                    </Grid>
                ) : (
                    <Grid container direction="column" spacing={2} textAlign="center">
                        <Grid item md={12}>
                            <Typography variant="h4">{t('congratulations')}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">
                                {t('weveJustSentAnConfirmationLinkToYourEmailPleaseCon')}
                            </Typography>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default styled(Component)``;
