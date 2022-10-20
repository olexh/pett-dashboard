import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Divider, Grid, Paper, Skeleton, Typography } from '@mui/material';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <Grid className={className} item md xs={12}>
            <Paper variant="outlined" square>
                <Typography variant="h5" margin={3}>
                    <Skeleton width={140} animation="wave" />
                </Typography>
                <Divider />
                <Box p={3}>
                    <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                        <Grid item md sm xs={6}>
                            <Typography variant="subtitle2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                        </Grid>
                        <Grid item md sm xs={6}>
                            <Typography variant="subtitle2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                        </Grid>
                        <Grid item md sm xs={6}>
                            <Typography variant="subtitle2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                        </Grid>
                        <Grid item md sm xs={6}>
                            <Typography variant="subtitle2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                            <Typography variant="body2">
                                <Skeleton width={40} animation="wave" />
                            </Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Grid>
    );
};

export default styled(Component)``;
