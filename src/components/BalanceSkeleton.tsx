import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Divider, Grid, Skeleton } from '@mui/material';

interface Props {
    className?: string;
    rows?: number;
}

const Component: FC<Props> = ({ className, rows }) => {
    const item = (key: number) => (
        <Box padding={3} width="100%" key={key}>
            <Grid container spacing={2} alignItems="center">
                <Grid item md="auto" sm="auto" xs="auto">
                    <Skeleton variant="circular" animation="wave" width={40} height={40} />
                </Grid>
                <Grid item md sm xs>
                    <div className="balance-skeletons">
                        <Skeleton width={40} animation="wave" /> <Skeleton width={30} animation="wave" />
                    </div>
                </Grid>
                <Grid item md="auto" sm="auto" xs="auto">
                    <div className="balance-skeletons">
                        <Skeleton width={30} animation="wave" /> <Skeleton width={30} animation="wave" />
                    </div>
                </Grid>
            </Grid>
        </Box>
    );

    return (
        <div className={className}>
            {Array(rows)
                .fill(null)
                .map((b, index) => (
                    <>
                        {index > 0 && <Divider />}
                        {item(index)}
                    </>
                ))}
        </div>
    );
};

export default styled(Component)`
    .balance-skeletons {
        display: flex;
        flex-direction: row;
        margin-right: ${({ theme }) => theme.spacing(2)};

        & > * {
            margin-left: ${({ theme }) => theme.spacing(0.5)};
        }
    }
`;
