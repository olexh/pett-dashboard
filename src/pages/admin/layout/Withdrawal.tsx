import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Box,
    Divider,
    IconButton,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Tooltip,
    Typography,
} from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import moment from 'moment';
import { NumericFormat } from 'react-number-format';
import CheckIcon from '@mui/icons-material/Check';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAdminWithdrawalList } from '../../../api';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const token = useSelector((state: RootState) => state.app.secret);

    const { data: withdrawal, isLoading: isLoadingWithdrawal } = useAdminWithdrawalList(
        { auth: token, page },
        { refetchInterval: 10000 },
    );

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                {t('withdrawalList')}
            </Typography>
            <Divider />
            {withdrawal && withdrawal.list.length > 0 && (
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Reference</TableCell>
                                <TableCell align="center">User Ref</TableCell>
                                <TableCell align="center">Amount</TableCell>
                                <TableCell align="center">Comment</TableCell>
                                <TableCell align="center">Refunded</TableCell>
                                <TableCell align="center">Address</TableCell>
                                <TableCell align="center">Sent</TableCell>
                                <TableCell align="center">Tx Hash</TableCell>
                                <TableCell align="center">Created</TableCell>
                                <TableCell align="right">Options</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {withdrawal.list.map((w: PettDashboard.Withdrawal) => (
                                <TableRow hover key={w.reference}>
                                    <TableCell component="th" scope="row">
                                        {w.reference}
                                    </TableCell>
                                    <TableCell align="center">{w.user}</TableCell>
                                    <TableCell align="center">
                                        <Box display="flex" alignItems="center" justifyContent="center">
                                            <Avatar sx={{ width: 24, height: 24, marginRight: 1 }} src={w.coin.logo} />
                                            <NumericFormat
                                                value={w.amount}
                                                decimalScale={2}
                                                fixedDecimalScale
                                                thousandSeparator
                                                suffix={` ${w.coin.ticker}`}
                                                displayType="text"
                                            />
                                        </Box>
                                    </TableCell>
                                    <TableCell align="center">{w.comment ? w.comment : '-'}</TableCell>
                                    <TableCell align="center">{w.refunded ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{w.address}</TableCell>
                                    <TableCell align="center">{w.sent ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{w.txid ? w.txid : '-'}</TableCell>
                                    <TableCell align="center">
                                        {moment(w.created * 1000).format('yyyy-MM-DD HH:mm')}
                                    </TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" justifyContent="flex-end">
                                            <Tooltip title="Process Request">
                                                <IconButton
                                                    disabled={w.refunded || w.sent}
                                                    component={Link}
                                                    to={`/admin/request/${w.reference}`}
                                                >
                                                    <CheckIcon />
                                                </IconButton>
                                            </Tooltip>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            {withdrawal && withdrawal.list.length > 0 && (
                <Box display="flex" justifyContent="center" padding={3}>
                    <Pagination
                        disabled={isLoadingWithdrawal}
                        count={withdrawal.pagination.pages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                    />
                </Box>
            )}
            {withdrawal && withdrawal.list.length === 0 && (
                <Box padding={3} textAlign="center">
                    <Typography color="textSecondary">There is no withdrawal history yet.</Typography>
                </Box>
            )}
        </Paper>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
