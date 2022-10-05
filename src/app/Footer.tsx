import React, { FC } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    return (
        <div className={className}>
            <Container></Container>
        </div>
    );
};

export default styled(Component)`
    padding: ${({ theme }) => theme.spacing(8, 0)};

    .btn {
        cursor: pointer;
    }

    .media-btn {
        padding: 10px;
        min-width: 0;
    }
`;
