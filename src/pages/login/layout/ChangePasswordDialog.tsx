import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, FormControl, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { resetPassword as resetPasswordAPI } from '../../../api';
import { Controller, useForm } from 'react-hook-form';
import { useSnackbar } from "notistack";

interface Props {
    className?: string;
    open: boolean;
    setOpen: (value: boolean) => void;
    loginOpen: () => void;
}

const Component: FC<Props> = ({ className, open, setOpen, loginOpen }) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors: fieldsErrors },
    } = useForm<{ email: string }>();

    // change logic:
    const {
        mutate: resetPassword,
        isLoading: isLoadingResetPassword,
        isSuccess: isSuccessResetPassword,
        reset: resetMutation,
    } = useMutation(resetPasswordAPI, {
        onError: (e: Error) => {
            enqueueSnackbar(e?.message, { variant: 'error' });
        },
    });

    const handleLogin = (data: { email: string }) => {
        resetPassword(data);
    };

    const handleClose = () => {
        resetMutation();
        setOpen(false);
    };
    //
    return (
        <Dialog className={className} maxWidth="sm" fullWidth open={open} onClose={handleClose}>
            <DialogContent>
                {!isSuccessResetPassword ? (
                    <form onSubmit={handleSubmit(handleLogin)}>
                        <FormControl>
                            <Grid container spacing={2} textAlign="center" justifyContent="center">
                                <Grid item md={12}>
                                    <Typography variant="h4">{t('changePassword')}</Typography>
                                </Grid>
                                <Grid item md={12}>
                                    <Typography align="center">{t('fillUpChangePassword')}</Typography>
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
                                <Grid item md={4} xs={6}>
                                    <Button
                                        variant="outlined"
                                        fullWidth
                                        size="large"
                                        onClick={loginOpen}
                                        disableElevation
                                        color="secondary"
                                    >
                                        {t('cancel')}
                                    </Button>
                                </Grid>
                                <Grid item md={4} xs={6}>
                                    <LoadingButton
                                        loading={isLoadingResetPassword}
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
                            <Typography variant="h4">{t('changePassword')}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">{t('sentResetPasswordLink')}</Typography>
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
