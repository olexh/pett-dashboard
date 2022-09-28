import React, { FC } from 'react';
import styled from 'styled-components';
import { Divider, Paper, Typography } from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/Store';
import { BalanceItem } from '../../../../../components';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { usernameParam } = useParams<{ usernameParam: string }>();
    const token = useSelector((state: RootState) => state.app.secret);
    const { data: balances } = useQuery<PettDashboard.Balance[]>(
        ['userBalancesAdmin'],
        () => {
            return axios
                .get(`${axios.defaults.baseURL}/admin/user/${usernameParam}/balances`, { headers: { auth: token } })
                .then((data) => data.data);
        },
        { cacheTime: 0 },
    );

    return (
        <Paper className={className} variant="outlined" square sx={{ height: '100%' }}>
            <Typography variant="h5" margin={3}>
                {t('balances')}
            </Typography>
            <Divider />
            {balances &&
                balances.map((b: PettDashboard.Balance, index) => (
                    <>
                        {index > 0 && <Divider />}
                        <BalanceItem disabled key={b.reference} {...b} />
                    </>
                ))}
        </Paper>
    );
};

export default styled(Component)``;
