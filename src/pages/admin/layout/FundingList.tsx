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
import { refund, useAdminFundingList } from '../../../api';
import { TableSkeleton } from '../../../components';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import SettingsBackupRestoreIcon from '@mui/icons-material/SettingsBackupRestore';
import { Link as RouterLink } from 'react-router-dom';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { enqueueSnackbar } = useSnackbar();
    const { t } = useTranslation();
    const [page, setPage] = useState(1);
    const [openRefundAlert, setOpenRefundAlert] = useState(false);
    const [selectedFunding, setSelectedFunding] = useState<Dashboard.Funding>();
    const token = useSelector((state: RootState) => state.app.secret);

    const { data: funding, isLoading: isLoadingFunding } = useAdminFundingList(
        { auth: token, page },
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
        makeRefund({ reference: selectedFunding!.reference, token });
        setOpenRefundAlert(false);
    };

    const handleRefundAlert = (f: Dashboard.Funding) => {
        setSelectedFunding(f);
        setOpenRefundAlert(true);
    };

    const handleCloseRefundAlert = () => {
        setOpenRefundAlert(false);
        setSelectedFunding(undefined);
    };

    const table = (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Amount</TableCell>
                        <TableCell align="center">Comment</TableCell>
                        <TableCell align="center">Refunded</TableCell>
                        <TableCell align="center">Address</TableCell>
                        <TableCell align="center">Sent</TableCell>
                        <TableCell align="center">Tx Hash</TableCell>
                        <TableCell align="center">Created</TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {funding?.list.map((w: Dashboard.Funding) => (
                        <TableRow hover key={w.reference}>
                            <TableCell component="th" scope="row">
                                <Link component={RouterLink} to={`/admin/user/${w.user.username}`}>
                                    {w.user.username}
                                </Link>
                            </TableCell>
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
                            <TableCell align="center">{moment(w.created * 1000).format('yyyy-MM-DD HH:mm')}</TableCell>
                            <TableCell align="right">
                                <Box display="flex" justifyContent="flex-end">
                                    <Tooltip title="Refund">
                                        <IconButton onClick={() => handleRefundAlert(w)} disabled={isLoadingRefund}>
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
                {t('fundingList')}
            </Typography>
            <Divider />
            {!isLoadingFunding ? (
                funding && funding.list.length === 0 ? (
                    <Box padding={3} textAlign="center">
                        <Typography color="textSecondary">There is no funding history yet.</Typography>
                    </Box>
                ) : (
                    table
                )
            ) : (
                <TableSkeleton columns={10} rows={10} />
            )}
            {funding && funding.list.length > 0 && (
                <Box display="flex" justifyContent="center" padding={3}>
                    <Pagination
                        disabled={isLoadingFunding}
                        count={funding.pagination.pages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                    />
                </Box>
            )}
            <Dialog
                maxWidth="sm"
                fullWidth
                open={openRefundAlert && Boolean(selectedFunding)}
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
