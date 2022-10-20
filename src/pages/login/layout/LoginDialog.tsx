import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, FormControl, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { setInState } from '../../../redux/actions/app';
import { useAppDispatch } from '../../../redux/Store';
import { useTranslation } from 'react-i18next';
import { login } from '../../../api';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';

interface Props {
    className?: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    signUpOpen: () => void;
    changePasswordOpen: () => void;
}

interface LoginParams {
    email: string;
    password: string;
}

const Component: FC<Props> = ({ className, open, setOpen, signUpOpen, changePasswordOpen }) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors: fieldsErrors },
    } = useForm<LoginParams>();

    const {
        mutate: loginUser,
        isLoading: isLoadingLogin,
        isSuccess: isSuccessLogin,
        data: loginData,
    } = useMutation(login, {
        onError: (e: Error) => {
            enqueueSnackbar(e?.message, { variant: 'error' });
        },
    });

    const handleLogin = (data: LoginParams) => {
        loginUser({ data: { ...data } });
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
                <form onSubmit={handleSubmit(handleLogin)}>
                    <FormControl>
                        <Grid container spacing={2} textAlign="center" justifyContent="center">
                            <Grid item md={12}>
                                <Typography variant="h4">{t('logIn')}</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography align="center">{t('pleaseFillUpTheFieldsToLogIntoAccount')}</Typography>
                            </Grid>
                            <Grid item md={12} xs={12}>
                                <Controller
                                    name="email"
                                    render={({ field: { value, ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            value={value ?? ''}
                                            id="email"
                                            helperText={fieldsErrors.email ? fieldsErrors.email.message : undefined}
                                            error={Boolean(fieldsErrors.email)}
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            required
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
                                            required
                                            type="password"
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
                            <Grid item container md={12} xs={6} justifySelf="flex-start">
                                <Button disableElevation color="secondary" onClick={changePasswordOpen}>
                                    <Typography textTransform="none">Forgot password?</Typography>
                                </Button>
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
            </DialogContent>
        </Dialog>
    );
};

export default styled(Component)``;
