import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Button, Grid, Skeleton, Typography } from '@mui/material';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Box marginBottom={3}>
                <Typography variant="subtitle2" marginBottom={1}>
                    <Skeleton width={40} animation="wave" />
                </Typography>
                <Skeleton width={40} animation="wave" />
            </Box>
            <Box marginBottom={3}>
                <Typography variant="subtitle2" marginBottom={1}>
                    <Skeleton width={40} animation="wave" />
                </Typography>
                <Skeleton width={40} animation="wave" />
            </Box>
            <Box marginBottom={3}>
                <Skeleton animation="wave">
                    <Button size="large" />
                </Skeleton>
            </Box>
            <Grid container spacing={4}>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                    <Typography variant="body2">
                        <Skeleton width={40} animation="wave" />
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default styled(Component)``;
