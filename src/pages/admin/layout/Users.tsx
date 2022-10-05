import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import {
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
    TableSortLabel,
    TextField,
    Tooltip,
    Typography,
} from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import BlockIcon from '@mui/icons-material/Block';
import UndoIcon from '@mui/icons-material/Undo';
import { useSnackbar } from 'notistack';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import GroupRemoveIcon from '@mui/icons-material/GroupRemove';
import { Trans, useTranslation } from 'react-i18next';
import { admin as makeAdmin, ban, useUsersList } from '../../../api';
import { TableSkeleton } from '../../../components';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(1);
    const [search, setSearch] = useState('');
    const [orderBy, setOrderBy] = useState('created');
    const [sort, setSort] = useState<'desc' | 'asc' | undefined>('desc');
    const [openBanhammerAlert, setOpenBanhammerAlert] = useState(false);
    const [selectedUser, setSelectedUser] = useState<PettDashboard.User>();
    const token = useSelector((state: RootState) => state.app.secret);

    const { data: users, isLoading: isLoadingUsers } = useUsersList(
        { auth: token, page, search, order: orderBy, sort },
        { refetchInterval: 10000 },
    );

    const {
        mutate: banhammer,
        isLoading: isLoadingBanhammer,
        isSuccess: isSuccessBanhammer,
        isError: isErrorBanhammer,
    } = useMutation(ban, {
        onError: (e) => {
            alert(e);
        },
    });

    const {
        mutate: admin,
        isLoading: isLoadingAdmin,
        isSuccess: isSuccessAdmin,
        isError: isErrorAdmin,
    } = useMutation(makeAdmin, {
        onError: (e) => {
            alert(e);
        },
    });

    const handleBanhammer = (user: PettDashboard.User, type: 'ban' | 'unban') => {
        banhammer({ auth: token, user, type });
        setOpenBanhammerAlert(false);
    };

    const handleBanhammerAlert = (user: PettDashboard.User) => {
        setSelectedUser(user);
        setOpenBanhammerAlert(true);
    };

    const handleCloseBanhammerAlert = () => {
        setOpenBanhammerAlert(false);
        setSelectedUser(undefined);
    };

    const handleAdmin = (user: PettDashboard.User, type: 'admin' | 'unadmin') => {
        admin({ auth: token, user, type });
    };

    const handleOrderBy = (property: string) => {
        const isAsc = orderBy === property && sort === 'asc';
        setSort(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    useEffect(() => {
        if (isSuccessBanhammer) {
            enqueueSnackbar('Banhammer has been successfully done', { variant: 'success' });
        } else if (isErrorBanhammer) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    }, [isSuccessBanhammer, isErrorBanhammer]);

    useEffect(() => {
        if (isSuccessAdmin) {
            enqueueSnackbar('Admin status has been successfully changed', { variant: 'success' });
        } else if (isErrorAdmin) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    }, [isSuccessAdmin, isErrorAdmin]);

    const table = (
        <TableContainer>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Username</TableCell>
                        <TableCell align="center">Email</TableCell>
                        <TableCell align="center" sortDirection={orderBy === 'email-activated' ? sort : false}>
                            <TableSortLabel
                                active={orderBy === 'email-activated'}
                                direction={orderBy === 'email-activated' ? sort : 'asc'}
                                onClick={() => handleOrderBy('email-activated')}
                            >
                                Email activated
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center">Phone Number</TableCell>
                        <TableCell align="center" sortDirection={orderBy === 'created' ? sort : false}>
                            <TableSortLabel
                                active={orderBy === 'created'}
                                direction={orderBy === 'created' ? sort : 'asc'}
                                onClick={() => handleOrderBy('created')}
                            >
                                Created
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" sortDirection={orderBy === 'admin' ? sort : false}>
                            <TableSortLabel
                                active={orderBy === 'admin'}
                                direction={orderBy === 'admin' ? sort : 'asc'}
                                onClick={() => handleOrderBy('admin')}
                            >
                                Admin
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="center" sortDirection={orderBy === 'banned' ? sort : false}>
                            <TableSortLabel
                                active={orderBy === 'banned'}
                                direction={orderBy === 'banned' ? sort : 'asc'}
                                onClick={() => handleOrderBy('banned')}
                            >
                                Banned
                            </TableSortLabel>
                        </TableCell>
                        <TableCell align="right">Actions</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users?.list.map((u: PettDashboard.User) => (
                        <TableRow hover key={u.reference}>
                            <TableCell component="th" scope="row">
                                <Link component={RouterLink} to={`/admin/user/${u.username}`}>
                                    {u.username}
                                </Link>
                            </TableCell>
                            <TableCell align="center">{u.email ? u.email : '-'}</TableCell>
                            <TableCell align="center">{u.email_activated ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="center">{u.phone_number ? u.phone_number : '-'}</TableCell>
                            <TableCell align="center">{moment(u.created * 1000).format('yyyy-MM-DD HH:mm')}</TableCell>
                            <TableCell align="center">{u.admin ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="center">{u.banned ? 'Yes' : 'No'}</TableCell>
                            <TableCell align="right">
                                <Box display="flex" justifyContent="flex-end">
                                    <Tooltip title="Fund">
                                        <IconButton component={RouterLink} to={`/admin/funding/${u.username}`}>
                                            <CurrencyBitcoinIcon />
                                        </IconButton>
                                    </Tooltip>
                                    {!u.admin ? (
                                        <Tooltip title="Give Admin Role">
                                            <IconButton
                                                onClick={() => handleAdmin(u, 'admin')}
                                                disabled={isLoadingAdmin}
                                            >
                                                <GroupAddIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Restrict Admin Role">
                                            <IconButton
                                                onClick={() => handleAdmin(u, 'unadmin')}
                                                disabled={isLoadingAdmin}
                                            >
                                                <GroupRemoveIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
                                    {u.banned ? (
                                        <Tooltip title="Unban">
                                            <IconButton
                                                onClick={() => handleBanhammer(u, 'unban')}
                                                disabled={isLoadingBanhammer}
                                            >
                                                <UndoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    ) : (
                                        <Tooltip title="Ban">
                                            <IconButton
                                                onClick={() => handleBanhammerAlert(u)}
                                                disabled={isLoadingBanhammer}
                                            >
                                                <BlockIcon />
                                            </IconButton>
                                        </Tooltip>
                                    )}
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
            <Box p={3}>
                <Grid container justifyContent="space-between" alignItems="center">
                    <Grid item md="auto">
                        <Typography variant="h5">{t('users')}</Typography>
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            label={t('searchByUsername')}
                            value={search}
                            fullWidth
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </Box>
            <Divider />
            {!isLoadingUsers ? (
                users && users.list.length === 0 ? (
                    <Box padding={3} textAlign="center">
                        <Typography color="textSecondary">There is no users yet.</Typography>
                    </Box>
                ) : (
                    table
                )
            ) : (
                <TableSkeleton columns={8} rows={10} />
            )}
            {users && users.list.length > 0 && (
                <Box display="flex" justifyContent="center" padding={3}>
                    <Pagination
                        disabled={isLoadingUsers}
                        count={users.pagination.pages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                    />
                </Box>
            )}
            <Dialog
                maxWidth="sm"
                fullWidth
                open={openBanhammerAlert && Boolean(selectedUser)}
                onClose={handleCloseBanhammerAlert}
            >
                <DialogContent>
                    <Grid container direction="column" spacing={2} textAlign="center">
                        <Grid item md={12}>
                            <Typography variant="h4">{t('banUser')}</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">
                                <Trans
                                    i18nKey="doYouWantToBanUser"
                                    values={{
                                        email: selectedUser?.email,
                                    }}
                                    components={{
                                        s: <strong />,
                                    }}
                                />
                            </Typography>
                        </Grid>
                        <Grid item container spacing={2} md={12} justifyContent="center">
                            <Grid item md="auto">
                                <Button color="secondary" disableElevation onClick={handleCloseBanhammerAlert}>
                                    {t('cancel')}
                                </Button>
                            </Grid>
                            <Grid item md="auto">
                                <Button
                                    color="secondary"
                                    disableElevation
                                    variant="contained"
                                    onClick={() => handleBanhammer(selectedUser!, 'ban')}
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
