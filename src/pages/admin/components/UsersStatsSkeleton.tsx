import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid, Skeleton, Typography } from '@mui/material';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <Grid container spacing={4} className={className} justifyContent="space-between" alignItems="flex-start">
            <Grid item md xs>
                <Typography variant="subtitle2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
            </Grid>
            <Grid item md xs>
                <Typography variant="subtitle2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
            </Grid>
            <Grid item md xs>
                <Typography variant="subtitle2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
                <Typography variant="body2">
                    <Skeleton width={40} animation="wave" />
                </Typography>
            </Grid>
        </Grid>
    );
};

export default styled(Component)``;
