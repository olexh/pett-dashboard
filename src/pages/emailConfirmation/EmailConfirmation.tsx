import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Container } from '@mui/material';
import { useHistory, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { token } = useParams<{ token?: string }>();
    const history = useHistory();
    const { data, isError } = useQuery(
        ['emailConfirmation', token],
        () => {
            return axios.post(`${axios.defaults.baseURL}/auth/email/confirm`, { token });
        },
        { retry: false },
    );

    useEffect(() => {
        if (!token) {
            history.push('/');
        }
    }, [token]);

    useEffect(() => {
        if (data || isError) {
            history.push('/');
        }
    }, [data, isError]);

    return (
        <div className={className}>
            <Container></Container>
        </div>
    );
};

export default styled(Component)``;
