import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Box,
    Divider,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/Store';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
}

interface Response {
    pagination: {
        pages: number;
        total: number;
        current: number;
    };
    list: PettDashboard.History[];
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { usernameParam } = useParams<{ usernameParam: string }>();
    const [page, setPage] = useState(1);
    const token = useSelector((state: RootState) => state.app.secret);
    const { data: history, isLoading: isLoadingHistory } = useQuery<Response>(
        ['userHistoryAdmin', token, page],
        () => {
            return axios
                .get(`${axios.defaults.baseURL}/admin/user/${usernameParam}/history`, {
                    headers: { auth: token },
                    params: { page },
                })
                .then((data) => data.data);
        },
        { cacheTime: 0 },
    );

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                {t('history')}
            </Typography>
            <Divider />
            {history && history.list.length > 0 && (
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Type</TableCell>
                                <TableCell align="center">Tx Hash</TableCell>
                                <TableCell align="center">Date</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="right">Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {history.list.map((h: PettDashboard.History) => (
                                <TableRow hover key={h.txid}>
                                    <TableCell component="th" scope="row">
                                        {h.category.charAt(0).toUpperCase() + h.category.slice(1)}
                                    </TableCell>
                                    <TableCell align="center">{h.txid ? h.txid : '-'}</TableCell>
                                    <TableCell align="center">
                                        {moment(h.created * 1000).format('yyyy-MM-DD HH:mm')}
                                    </TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} src={h.coin.logo} />
                                            <NumericFormat
                                                value={h.amount}
                                                decimalScale={2}
                                                fixedDecimalScale
                                                thousandSeparator
                                                suffix={` ${h.coin.ticker}`}
                                                displayType="text"
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="right">
                                        {h.status.charAt(0).toUpperCase() + h.status.slice(1)}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {history && history.list.length > 0 && (
                <Box display="flex" justifyContent="center" padding={3}>
                    <Pagination
                        disabled={isLoadingHistory}
                        count={history.pagination.pages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                    />
                </Box>
            )}
            {history && history.list.length === 0 && (
                <Box padding={3} textAlign="center">
                    <Typography color="textSecondary">There is no transaction history yet.</Typography>
                </Box>
            )}
        </Paper>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
