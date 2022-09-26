import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Divider, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../../../redux/Store';
import { BalanceItem } from '../components';
import { setInState } from '../../../redux/actions/app';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const token = useSelector((state: RootState) => state.app.secret);
    const selectedBalance: PettDashboard.Balance = useSelector((state: RootState) => state.app.selectedBalance);
    const dispatch = useAppDispatch();
    const { data: balances } = useQuery<PettDashboard.Balance[]>(
        ['balances'],
        () => {
            return axios
                .get(`${axios.defaults.baseURL}/user/balances`, { headers: { auth: token } })
                .then((data) => data.data);
        },
        { refetchInterval: 10000 },
    );

    const handleSelectBalance = (balance: PettDashboard.Balance) => {
        dispatch(setInState({ selectedBalance: balance }));
    };

    useEffect(() => {
        if (!selectedBalance && balances && balances.length > 0) {
            handleSelectBalance(balances[0]);
        } else if (selectedBalance && balances) {
            const newBalance = balances.find((b) => b.reference === selectedBalance.reference);

            if (newBalance) {
                handleSelectBalance(newBalance);
            }
        }
    }, [balances]);

    return (
        <Paper className={className} variant="outlined" square sx={{ height: '100%' }}>
            <Typography variant="h5" margin={3}>
                Balances
            </Typography>
            <Divider />
            {balances &&
                balances.map((b: PettDashboard.Balance, index) => (
                    <>
                        {index > 0 && <Divider />}
                        <BalanceItem
                            onClick={() => handleSelectBalance(b)}
                            selected={selectedBalance && selectedBalance.reference === b.reference}
                            key={b.reference}
                            {...b}
                        />
                    </>
                ))}
        </Paper>
    );
};

export default styled(Component)``;
