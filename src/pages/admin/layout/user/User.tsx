import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid } from '@mui/material';
import { Balance, History, Info } from './layout';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <Grid container className={className} spacing={4}>
            <Grid item md={6} xs={12}>
                <Info />
            </Grid>
            <Grid item md={6} xs={12}>
                <Balance />
            </Grid>
            <Grid item md={12} xs={12}>
                <History />
            </Grid>
        </Grid>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
