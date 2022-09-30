import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { setInState } from '../../../redux/actions/app';
import { useAppDispatch } from '../../../redux/Store';
import { useTranslation } from 'react-i18next';
import { login } from '../../../api';

interface Props {
    className?: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    signUpOpen: () => void;
}

const Component: FC<Props> = ({ className, open, setOpen, signUpOpen }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const {
        mutate: loginUser,
        isLoading: isLoadingLogin,
        isSuccess: isSuccessLogin,
        data: loginData,
    } = useMutation(login, {
        onError: (e) => {
            alert(e);
        },
    });

    const handleLogin = () => {
        if (!email || email === '') {
            return;
        }

        if (!password || password === '') {
            return;
        }

        loginUser({ data: { email, password } });
    };

    useEffect(() => {
        if (isSuccessLogin && loginData) {
            dispatch(setInState(loginData));
            setOpen(false);
        }
    }, [isSuccessLogin]);

    return (
        <Dialog className={className} maxWidth="sm" fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <Grid container spacing={2} textAlign="center" justifyContent="center">
                    <Grid item md={12}>
                        <Typography variant="h4">{t('logIn')}</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography align="center">{t('pleaseFillUpTheFieldsToLogIntoAccount')}</Typography>
                    </Grid>
                    <Grid item md={12} xs={12}>
                        <TextField
                            fullWidth
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
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder={t('writeYourPassword')}
                            label={t('password')}
                        />
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <Button
                            variant="outlined"
                            fullWidth
                            size="large"
                            disabled={isLoadingLogin}
                            onClick={signUpOpen}
                            disableElevation
                            color="secondary"
                        >
                            {t('signUp')}
                        </Button>
                    </Grid>
                    <Grid item md={4} xs={6}>
                        <LoadingButton
                            loading={isLoadingLogin}
                            loadingPosition="start"
                            variant="contained"
                            size="large"
                            fullWidth
                            onClick={handleLogin}
                            disableElevation
                            color="secondary"
                        >
                            {t('confirm')}
                        </LoadingButton>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default styled(Component)``;
