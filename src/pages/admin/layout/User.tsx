import React, { FC } from 'react';
import styled from 'styled-components';
import { Divider, Paper, Typography } from '@mui/material';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                User
            </Typography>
            <Divider />
        </Paper>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
