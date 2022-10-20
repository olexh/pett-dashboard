import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
    Avatar,
    Box,
    Button,
    Dialog,
    DialogContent,
    Divider,
    Grid,
    IconButton,
    Link,
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
import { useTranslation } from 'react-i18next';
import { refund, useAdminHistory } from '../../../api';
import { TableSkeleton } from '../../../components';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(1);
    const [openRefundAlert, setOpenRefundAlert] = useState(false);
    const [selectedHistory, setSelectedHistory] = useState<Dashboard.History>();
    const token = useSelector((state: RootState) => state.app.secret);

    const { data: history, isLoading: isLoadingHistory } = useAdminHistory(
        { auth: token, page: page },
        { refetchInterval: 10000 },
    );

    const { mutate: makeRefund, isLoading: isLoadingRefund } = useMutation(refund, {
        onSuccess: () => {
            enqueueSnackbar('Refund has been successfully made', { variant: 'success' });
        },
        onError: (e: Error) => {
            enqueueSnackbar(e.message, { variant: 'error' });
        },
    });

    const handleRefund = () => {
        makeRefund({ reference: selectedHistory!.event, token });
        setOpenRefundAlert(false);
    };

    const handleRefundAlert = (h: Dashboard.History) => {
        setSelectedHistory(h);
        setOpenRefundAlert(true);
    };

    const handleCloseRefundAlert = () => {
        setOpenRefundAlert(false);
        setSelectedHistory(undefined);
    };

    const table = (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Tx Hash</TableCell>
                        <TableCell align="center">Date</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Status</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {history?.list.map((h: Dashboard.History) => (
                        <TableRow hover key={h.created}>
                            <TableCell component="th" scope="row">
                                <Link component={RouterLink} to={`/admin/user/${h.user.username}`}>
                                    {h.user.username}
                                </Link>
                            </TableCell>
                            <TableCell align="center">
                                {h.category.charAt(0).toUpperCase() + h.category.slice(1)}
                            </TableCell>
                            <TableCell align="center">{h.txid ? h.txid : '-'}</TableCell>
                            <TableCell align="center">{moment(h.created * 1000).format('yyyy-MM-DD HH:mm')}</TableCell>
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
                            <TableCell align="center">{h.status.charAt(0).toUpperCase() + h.status.slice(1)}</TableCell>
                            <TableCell align="right">
                                <Box display="flex" justifyContent="flex-end">
                                    <Tooltip title="Refund">
                                        <IconButton
                                            onClick={() => handleRefundAlert(h)}
                                            disabled={isLoadingRefund || h.category !== 'funding'}
                                        >
                                            <SettingsBackupRestoreIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                {t('history')}
            </Typography>
            <Divider />
            {!isLoadingHistory ? (
                history && history.list.length === 0 ? (
                    <Box padding={3} textAlign="center">
                        <Typography color="textSecondary">There is no transaction history yet.</Typography>
                    </Box>
                ) : (
                    table
                )
            ) : (
                <TableSkeleton columns={5} rows={10} />
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
            <Dialog
                maxWidth="sm"
                fullWidth
                open={openRefundAlert && Boolean(selectedHistory)}
                onClose={handleCloseRefundAlert}
            >
                <DialogContent>
                    <Grid container direction="column" spacing={2} textAlign="center">
                        <Grid item md={12}>
                            <Typography variant="h4">{t('refund')}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">{t('doYouWantToMakeRefund')}</Typography>
                        </Grid>
                        <Grid item container spacing={2} md={12} justifyContent="center">
                            <Grid item md="auto">
                                <Button color="secondary" disableElevation onClick={handleCloseRefundAlert}>
                                    {t('cancel')}
                                </Button>
                            </Grid>
                            <Grid item md="auto">
                                <Button
                                    color="secondary"
                                    disableElevation
                                    variant="contained"
                                    onClick={handleRefund}
                                    autoFocus
                                >
                                    {t('confirm')}
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
        </Paper>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
