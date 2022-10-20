import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Box, Divider, Grid, Paper, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/Store';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { changePassword, useUserInfo } from '../../../../../api';
import { LoadingButton } from '@mui/lab';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { UserInfoSkeleton } from '../../../components';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const { usernameParam } = useParams<{ usernameParam: string }>();
    const [newPassword, setNewPassword] = useState('');
    const token = useSelector((state: RootState) => state.app.secret);

    const { data: info, isLoading } = useUserInfo({ auth: token, username: usernameParam }, { cacheTime: 0 });
    const { mutate: changeUserPassword, isLoading: isLoadingChangePassword } = useMutation(
        ['adminChangePassowrd'],
        changePassword,
        {
            onSuccess: () => {
                enqueueSnackbar('Password has been successfully changed', { variant: 'success' });
                setNewPassword('');
            },
            onError: () => {
                enqueueSnackbar('Something went wrong', { variant: 'error' });
            },
        },
    );

    const handleChangePassword = () => {
        if (newPassword && newPassword !== '') {
            changeUserPassword({ username: usernameParam, auth: token, password: newPassword });
        }
    };

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                {t('userInfo')}
            </Typography>
            <Divider />
            {!isLoading ? (
                info && (
                    <Box p={3}>
                        <Grid container spacing={4}>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Username
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    {info.username}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Email
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    {info.email}
                                </Typography>
                                <Typography variant="caption" color="textSecondary">
                                    {info.email_activated ? 'Activated' : 'Not Activated'}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Admin
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    {info.admin ? 'Yes' : 'No'}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Phone Number
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    {info.phone_number}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Banned
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    {info.banned ? 'Yes' : 'No'}
                                </Typography>
                            </Grid>
                            <Grid item md={6} sm={6} xs={6}>
                                <Typography variant="subtitle2" color="textSecondary">
                                    Created
                                </Typography>
                                <Typography variant="body2" fontWeight={700}>
                                    {moment(info.created! * 1000).format('yyyy-MM-DD HH:mm')}
                                </Typography>
                            </Grid>
                            <Grid item md={12} sm={12} xs={12}>
                                <Box marginBottom={3}>
                                    <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                        {t('changePassword')}
                                    </Typography>
                                    <TextField
                                        placeholder={t('typeNewPassword')}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        fullWidth
                                        size="small"
                                    />
                                </Box>
                                <Box marginBottom={3}>
                                    <LoadingButton
                                        loadingPosition="start"
                                        loading={isLoadingChangePassword}
                                        onClick={handleChangePassword}
                                        size="large"
                                        disableElevation
                                        fullWidth
                                        variant="contained"
                                    >
                                        {t('confirm')}
                                    </LoadingButton>
                                </Box>
                            </Grid>
                        </Grid>
                    </Box>
                )
            ) : (
                <UserInfoSkeleton />
            )}
        </Paper>
    );
};

export default styled(Component)``;
