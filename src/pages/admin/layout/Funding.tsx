import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Box, Divider, Grid, MenuItem, Paper, Select, SelectChangeEvent, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { DateTimePicker } from '@mui/x-date-pickers';
import moment, { Moment } from 'moment';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { NumericFormat } from 'react-number-format';
import { useTranslation } from 'react-i18next';
import { funding as makeFunding, useAdminStats } from '../../../api';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { usernameParam } = useParams<{ usernameParam?: string }>();
    const { enqueueSnackbar } = useSnackbar();
    const [ticker, setTicker] = useState('');
    const [username, setUsername] = useState(usernameParam ? usernameParam : '');
    const [amount, setAmount] = useState('');
    const [timelock, setTimelock] = useState<Moment | null>(null);
    const token = useSelector((state: RootState) => state.app.secret);
    const { data: statsData } = useAdminStats({ auth: token });

    //todo: test
    const { mutate: funding, isLoading: isLoadingFunding } = useMutation(makeFunding, {
        onError: (e: Error) => {
            enqueueSnackbar(e.message, { variant: 'error' });
            setTicker('');
            setAmount('');
            setTimelock(null);
            setUsername('');
        },
        onSuccess: () => {
            enqueueSnackbar('Funds has been successfully sent', { variant: 'success' });
            setTicker('');
            setAmount('');
            setTimelock(null);
            setUsername('');
        },
    });

    const handleChangeTicker = (event: SelectChangeEvent) => {
        setTicker(event.target.value as string);
    };

    const handleFunding = () => {
        if (!ticker || ticker === '') {
            enqueueSnackbar('Ticker field is required for funding', { variant: 'error' });
            return;
        }

        if (!amount || amount === '') {
            enqueueSnackbar('Amount field is required for funding', { variant: 'error' });
            return;
        }

        if (!username || username === '') {
            enqueueSnackbar('Reference field is required for funding', { variant: 'error' });
            return;
        }

        funding({
            auth: token,
            req: {
                amount: parseFloat(amount),
                username,
                ticker,
                timelock: timelock ? parseInt(moment(timelock).format('X')) : undefined,
            },
        });
    };

    return (
        <Grid className={className} container justifyContent="center">
            <Grid item md={5} sm={5} xs={12}>
                <Paper variant="outlined" square>
                    <Typography variant="h5" margin={3}>
                        {t('funding')}
                    </Typography>
                    <Divider />
                    <Box padding={3}>
                        <Box marginBottom={3}>
                            <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                {t('username')}
                            </Typography>
                            <TextField
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder={t('typeUsername')}
                                fullWidth
                                size="small"
                            />
                        </Box>
                        <Box marginBottom={3}>
                            <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                {t('amount')}
                            </Typography>
                            <NumericFormat
                                value={amount}
                                customInput={TextField}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder={t('typeAmount')}
                                fullWidth
                                size="small"
                            />
                        </Box>
                        <Box marginBottom={3}>
                            <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                {t('coin')}
                            </Typography>
                            <Select size="small" fullWidth value={ticker} onChange={handleChangeTicker}>
                                {statsData &&
                                    statsData.coins.map((c) => (
                                        <MenuItem key={c.coin.reference} value={c.coin.ticker}>
                                            {c.coin.ticker}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </Box>
                        <Box marginBottom={3}>
                            <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                {t('timelock')}
                            </Typography>
                            <DateTimePicker
                                value={timelock}
                                onChange={(newValue) => setTimelock(newValue)}
                                renderInput={(params) => <TextField {...params} size="small" fullWidth />}
                            />
                        </Box>
                        <LoadingButton
                            loadingPosition="start"
                            loading={isLoadingFunding}
                            size="large"
                            onClick={handleFunding}
                            disableElevation
                            fullWidth
                            variant="contained"
                        >
                            {t('fund')}
                        </LoadingButton>
                    </Box>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
