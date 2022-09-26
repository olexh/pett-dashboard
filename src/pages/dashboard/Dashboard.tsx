import React, { FC } from 'react';
import styled from 'styled-components';
import { Container, Grid } from '@mui/material';
import { Balance, History, Tabs } from './layout';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Container className="container">
                <Grid container spacing={4}>
                    <Grid item md={6} sm={6} xs={12}>
                        <Balance />
                    </Grid>
                    <Grid item md={6} sm={6} xs={12}>
                        <Tabs />
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <History />
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
};

export default styled(Component)`
    .container {
        padding-top: ${({ theme }) => theme.spacing(12)};
    }
`;
