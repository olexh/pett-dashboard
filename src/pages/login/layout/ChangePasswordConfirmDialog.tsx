import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, FormControl, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { resetPasswordConfirm as resetPasswordConfirmAPI } from '../../../api';
import { Controller, useForm } from 'react-hook-form';
import { useHistory } from 'react-router-dom';
import { useSnackbar } from "notistack";

interface Props {
    className?: string;
    open: boolean;
    token: string;
}

const Component: FC<Props> = ({ className, open, token }) => {
    const { t } = useTranslation();
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors: fieldsErrors },
    } = useForm<{ password: string; confirmPassword: string }>();

    const {
        mutate: resetPasswordConfirm,
        isLoading: isLoadingResetPasswordConfirm,
        isSuccess: isSuccessResetPasswordConfirm,
    } = useMutation(resetPasswordConfirmAPI, {
        onError: (e: Error) => {
            enqueueSnackbar(e?.message, { variant: 'error' });
        },
    });

    const handleMutation = (data: { password: string; confirmPassword: string }) => {
        if (data.password === data.confirmPassword) {
            resetPasswordConfirm({ token, password: data.password });
        }
    };

    const handleClose = () => {
        history.push('/');
    };
    //
    return (
        <Dialog className={className} maxWidth="sm" fullWidth open={open} onClose={handleClose}>
            <DialogContent>
                {!isSuccessResetPasswordConfirm ? (
                    <form onSubmit={handleSubmit(handleMutation)}>
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
                                                placeholder={t('typeNewPassword')}
                                                label={t('password')}
                                                {...register('password')}
                                            />
                                        )}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item md={12} xs={12}>
                                    <Controller
                                        name="confirmPassword"
                                        render={({ field: { value, ...rest } }) => (
                                            <TextField
                                                {...rest}
                                                value={value ?? ''}
                                                id="confirmPassword"
                                                helperText={
                                                    fieldsErrors.confirmPassword
                                                        ? fieldsErrors.confirmPassword.message
                                                        : undefined
                                                }
                                                error={Boolean(fieldsErrors.confirmPassword)}
                                                InputLabelProps={{ shrink: true }}
                                                fullWidth
                                                required
                                                type="password"
                                                placeholder={t('confirmNewPassword')}
                                                label={t('confirmPassword')}
                                                {...register('confirmPassword')}
                                            />
                                        )}
                                        control={control}
                                    />
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        onClick={handleClose}
                                        disableElevation
                                        color="secondary"
                                    >
                                        Cancel
                                    </Button>
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <LoadingButton
                                        loading={isLoadingResetPasswordConfirm}
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
                ) : (
                    <Grid container direction="column" spacing={2} textAlign="center">
                        <Grid item md={12}>
                            <Typography variant="h4">{t('congratulations')}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">{t('yourPasswordChanged')}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Button variant="contained" onClick={handleClose} disableElevation color="secondary">
                                {t('close')}
                            </Button>
                        </Grid>
                    </Grid>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default styled(Component)``;
