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

interface Props {
    className?: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    loginOpen: () => void;
}

interface ChangePasswordParams {
    email: string;
    newPassword: string;
}

const Component: FC<Props> = ({ className, open, setOpen, loginOpen }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors: fieldsErrors },
    } = useForm<ChangePasswordParams>();

    // change logic:
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

    const handleLogin = (data: ChangePasswordParams) => {
        // loginUser({ data: { ...data } });
    };

    useEffect(() => {
        if (isSuccessLogin && loginData) {
            dispatch(setInState(loginData));
            setOpen(false);
        }
    }, [isSuccessLogin]);
    //
    return (
        <Dialog className={className} maxWidth="sm" fullWidth open={open} onClose={() => setOpen(false)}>
            <DialogContent>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <FormControl>
                        <Grid container spacing={2} textAlign="center" justifyContent="center">
                            <Grid item md={12}>
                                <Typography variant="h4">Change Password</Typography>
                            </Grid>
                            <Grid item md={12}>
                                <Typography align="center">
                                    Please, fill up the fields to change password to your account.
                                </Typography>
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
                                    name="newPassword"
                                    render={({ field: { value, ...rest } }) => (
                                        <TextField
                                            {...rest}
                                            value={value ?? ''}
                                            id="password"
                                            helperText={
                                                fieldsErrors.newPassword ? fieldsErrors.newPassword.message : undefined
                                            }
                                            error={Boolean(fieldsErrors.newPassword)}
                                            InputLabelProps={{ shrink: true }}
                                            fullWidth
                                            required
                                            type="password"
                                            placeholder={t('writeYourPassword')}
                                            label="New password"
                                            {...register('newPassword')}
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
                                    variant="outlined"
                                    fullWidth
                                    size="large"
                                    onClick={loginOpen}
                                    disableElevation
                                    color="secondary"
                                >
                                    Cancel
                                </Button>
                            </Grid>
                            <Grid item md={4} xs={6}>
                                <LoadingButton
                                    loading={isLoadingLogin}
                                    loadingPosition="start"
                                    variant="contained"
                                    disabled
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
