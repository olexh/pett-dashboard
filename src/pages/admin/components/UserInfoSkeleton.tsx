import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Grid, Skeleton, Typography } from '@mui/material';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <Box p={3} className={className}>
            <Grid container spacing={4}>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={80} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={80} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={80} animation="wave" />
                    </Typography>
                    <Typography variant="caption">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={80} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={80} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={80} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={80} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
            </Grid>
        </Box>
    );
};

export default styled(Component)``;
