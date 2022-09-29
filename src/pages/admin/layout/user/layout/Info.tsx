import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/Store';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { useTranslation } from 'react-i18next';
import { useUserInfo } from '../../../../../api';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { usernameParam } = useParams<{ usernameParam: string }>();
    const token = useSelector((state: RootState) => state.app.secret);

    const { data: info } = useUserInfo({ auth: token, username: usernameParam }, { cacheTime: 0 });

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                {t('userInfo')}
            </Typography>
            <Divider />
            {info && (
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
                                {moment(info.created * 1000).format('yyyy-MM-DD HH:mm')}
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            )}
        </Paper>
    );
};

export default styled(Component)``;
