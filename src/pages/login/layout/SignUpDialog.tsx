import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, FormControl, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { signUp } from '../../../api';
import { Controller, useForm } from 'react-hook-form';

interface Props {
    className?: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    loginOpen: () => void;
}

interface SignUpParams {
    email: string;
    username: string;
    password: string;
    phone: string;
}

const Component: FC<Props> = ({ className, open, setOpen, loginOpen }) => {
    const { t } = useTranslation();
    const {
        register,
        handleSubmit,
        control,
        reset,
        formState: { errors: fieldsErrors },
    } = useForm<SignUpParams>();

    const {
        mutate: signUpUser,
        isLoading: isLoadingSignUp,
        isSuccess: isSuccessSignUp,
        data: signUpData,
    } = useMutation(signUp, {
        onError: (e) => {
            alert(e);
        },
    });

    const handleSignUp = (data: SignUpParams) => {
        console.log(data);
        const { email, username, phone, password } = data;
        signUpUser({ data: { email, username, phone_number: phone, password } });
    };

    useEffect(() => {
        if (signUpData && isSuccessSignUp) {
            reset();
        }
    }, [isSuccessSignUp]);

    return (
        <Dialog className={className} maxWidth="sm" fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                {!signUpData || !isSuccessSignUp ? (
                    <form onSubmit={handleSubmit(handleSignUp)}>
                        <FormControl fullWidth>
                            <Grid container spacing={2} textAlign="center" justifyContent="center">
                                <Grid item md={12}>
                                    <Typography variant="h4">{t('signUp')}</Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography align="center">
                                        {t('pleaseFillUpTheFieldsToRegisterAccount')}
                                    </Typography>
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Controller
                                        name="username"
                                        render={({ field: { value, ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                value={value ?? ''}
                                                id="username"
                                                required
                                                helperText={
                                                    fieldsErrors.username ? fieldsErrors.username.message : undefined
                                                }
                                                error={Boolean(fieldsErrors.username)}
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                type="username"
                                                placeholder={t('writeYourUsername')}
                                                label={t('username')}
                                                {...register('username')}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required: 'Username required',
                                            pattern: {
                                                value: /[a-z0-9_-]{4,32}$/i,
                                                message: 'Invalid username',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Controller
                                        name="email"
                                        render={({ field: { value, ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                value={value ?? ''}
                                                id="email"
                                                required
                                                helperText={fieldsErrors.email ? fieldsErrors.email.message : undefined}
                                                error={Boolean(fieldsErrors.email)}
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                type="email"
                                                placeholder={t('writeYourEmail')}
                                                label={t('email')}
                                                {...register('email')}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required: 'Email required',
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: 'invalid email address',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Controller
                                        name="phone"
                                        render={({ field: { value, ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                value={value ?? ''}
                                                id="phone"
                                                helperText={fieldsErrors.phone ? fieldsErrors.phone.message : undefined}
                                                error={Boolean(fieldsErrors.phone)}
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                type="tel"
                                                required
                                                placeholder={t('writeYourPhone')}
                                                label={t('phone')}
                                                {...register('phone')}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required: 'Phone number required',
                                            pattern: {
                                                // value: /\(?([0-9]{3})\)?([ .-]?)([0-9]{3})\2([0-9]{4})/i,
                                                value: /^[+][0-9]{9,20}$/i,
                                                message: 'Phone number format must be +NNNNNNNNNNNN',
                                            },
                                        }}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Controller
                                        name="password"
                                        render={({ field: { value, ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                value={value ?? ''}
                                                id="password"
                                                helperText={
                                                    fieldsErrors.password ? fieldsErrors.password.message : undefined
                                                }
                                                error={Boolean(fieldsErrors.password)}
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                type="password"
                                                required
                                                placeholder={t('writeYourPassword')}
                                                label={t('password')}
                                                {...register('password')}
                                            />
                                        )}
                                        control={control}
                                        rules={{
                                            required: 'Password required',
                                        }}
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
                                        disableElevation
                                        color="secondary"
                                        type="submit"
                                    >
                                        {t('confirm')}
                                    </LoadingButton>
                                </Grid>
                            </Grid>
                        </FormControl>
                    </form>
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
