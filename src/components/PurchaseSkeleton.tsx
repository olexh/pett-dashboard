import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid, Skeleton, Typography } from '@mui/material';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <Grid className={className} container spacing={4}>
            <Grid item md={6} sm={6} xs={6}>
                <Typography variant="subtitle2">
                    <Skeleton width={60} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
                <Typography variant="subtitle2">
                    <Skeleton width={60} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Typography variant="subtitle2">
                    <Skeleton width={60} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Typography variant="body2">
                    <Skeleton width={200} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={180} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={200} animation="wave" />
                </Typography>
            </Grid>
        </Grid>
    );
};

export default styled(Component)``;
