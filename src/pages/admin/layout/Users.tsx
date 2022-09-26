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
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import moment from 'moment';
import { Link as RouterLink } from 'react-router-dom';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import BlockIcon from '@mui/icons-material/Block';
import UndoIcon from '@mui/icons-material/Undo';
import { useSnackbar } from 'notistack';

interface Props {
    className?: string;
}

interface Response {
    pagination: {
        pages: number;
        total: number;
        current: number;
    };
    list: PettDashboard.User[];
}

const Component: FC<Props> = ({ className }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [page, setPage] = useState(1);
    const [openBanhammerAlert, setOpenBanhammerAlert] = useState(false);
    const [selectedUser, setSelectedUser] = useState<PettDashboard.User>();
    const token = useSelector((state: RootState) => state.app.secret);
    const { data: users, isLoading: isLoadingUsers } = useQuery<Response>(
        ['users', token, page],
        () => {
            return axios
                .get(`${axios.defaults.baseURL}/admin/user/list`, { headers: { auth: token }, params: { page } })
                .then((data) => data.data);
        },
        { refetchInterval: 10000 },
    );
    const {
        mutate: banhammer,
        isLoading: isLoadingBanhammer,
        isSuccess: isSuccessBanhammer,
        isError: isErrorBanhammer,
    } = useMutation((req: { user: PettDashboard.User; type: 'ban' | 'unban' }) => {
        return axios
            .post(
                `${axios.defaults.baseURL}/admin/user/${req.user.reference}/${req.type}`,
                {},
                { headers: { auth: token } },
            )
            .then((data) => data.data);
    });

    const handleBanhammer = (user: PettDashboard.User, type: 'ban' | 'unban') => {
        banhammer({ user, type });
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

    useEffect(() => {
        if (isSuccessBanhammer) {
            enqueueSnackbar('Banhammer has been successfully done', { variant: 'success' });
        } else if (isErrorBanhammer) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
        }
    }, [isSuccessBanhammer, isErrorBanhammer]);

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                Users
            </Typography>
            <Divider />
            {users && users.list.length > 0 && (
                <TableContainer>
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Reference</TableCell>
                                <TableCell align="center">Email</TableCell>
                                <TableCell align="center">Email activated</TableCell>
                                <TableCell align="center">Phone Number</TableCell>
                                <TableCell align="center">Created</TableCell>
                                <TableCell align="center">Banned</TableCell>
                                <TableCell align="right">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {users.list.map((u: PettDashboard.User) => (
                                <TableRow hover key={u.reference}>
                                    <TableCell component="th" scope="row">
                                        {u.reference}
                                    </TableCell>
                                    <TableCell align="center">{u.email ? u.email : '-'}</TableCell>
                                    <TableCell align="center">{u.email_activated ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="center">{u.phone_number ? u.phone_number : '-'}</TableCell>
                                    <TableCell align="center">
                                        {moment(u.created * 1000).format('yyyy-MM-DD HH:mm')}
                                    </TableCell>
                                    <TableCell align="center">{u.banned ? 'Yes' : 'No'}</TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" justifyContent="flex-end">
                                            <Tooltip title="Fund">
                                                <IconButton component={RouterLink} to={`/admin/funding/${u.reference}`}>
                                                    <CurrencyBitcoinIcon />
                                                </IconButton>
                                            </Tooltip>
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
            {users && users.list.length === 0 && (
                <Box padding={3} textAlign="center">
                    <Typography color="textSecondary">There is no users yet.</Typography>
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
                            <Typography variant="h4">Ban user</Typography>
                        </Grid>
                        <Grid item md={12}>
                            <Typography align="center">
                                Do you want to ban user <strong>{selectedUser?.email}</strong>?
                            </Typography>
                        </Grid>
                        <Grid item container spacing={2} md={12} justifyContent="center">
                            <Grid item md="auto">
                                <Button color="secondary" disableElevation onClick={handleCloseBanhammerAlert}>
                                    Cancel
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
                                    Confirm
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
