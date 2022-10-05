import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Grid, TextField, Typography } from '@mui/material';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';
import { useMutation } from '@tanstack/react-query';
import { NumericFormat } from 'react-number-format';
import { useSnackbar } from 'notistack';
import { LoadingButton } from '@mui/lab';
import { useTranslation } from 'react-i18next';
import { withdraw as makeWithdraw } from '../../../../api';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { enqueueSnackbar } = useSnackbar();
    const token = useSelector((state: RootState) => state.app.secret);
    const [address, setAddress] = useState('');
    const [amount, setAmount] = useState('');
    const selectedBalance: PettDashboard.Balance = useSelector((state: RootState) => state.app.selectedBalance);

    // TODO: test
    const {
        mutate: withdraw,
        isLoading: isLoadingWithdraw,
        data: withdrawData,
        error: withdrawError,
        isError: isErrorWithdraw,
    } = useMutation(makeWithdraw, {
        onError: (e) => {
            alert(e);
        },
    });

    const handleWithdraw = () => {
        if (!address || address === '') {
            enqueueSnackbar('Address field is required for withdrawal', { variant: 'error' });
            return;
        }

        if (!amount || amount === '') {
            enqueueSnackbar('Amount field is required for withdrawal', { variant: 'error' });
            return;
        }

        withdraw({
            auth: token,
            data: {
                amount: parseFloat(amount),
                address,
                ticker: selectedBalance.coin.ticker,
            },
        });
    };

    useEffect(() => {
        if (withdrawData && !isLoadingWithdraw) {
            enqueueSnackbar(`${selectedBalance.coin.ticker} has been successfully sent`, { variant: 'success' });
            setAddress('');
            setAmount('');
        }
    }, [withdrawData]);

    useEffect(() => {
        if (withdrawError && isErrorWithdraw) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            setAddress('');
            setAmount('');
        }
    }, [withdrawError]);

    return (
        <div className={className}>
            <Box marginBottom={3}>
                <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                    {t('amount2')}
                </Typography>
                <NumericFormat
                    value={amount}
                    customInput={TextField}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder={t('typeYourAmount')}
                    fullWidth
                    size="small"
                />
            </Box>
            <Box marginBottom={3}>
                <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                    {t('address')}
                </Typography>
                <TextField
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder={t('typeYourWithdrawalAddress')}
                    fullWidth
                    size="small"
                />
            </Box>
            <Box marginBottom={3}>
                <LoadingButton
                    loadingPosition="start"
                    loading={isLoadingWithdraw}
                    size="large"
                    onClick={handleWithdraw}
                    disableElevation
                    fullWidth
                    variant="contained"
                >
                    {t('withdraw')}
                </LoadingButton>
            </Box>
            <Grid container spacing={4}>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                        {t('expectedArrival')}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                        {t('networkConfirmations', { confirmations: selectedBalance.coin.confirmations })}
                    </Typography>
                </Grid>
                <Grid item md={6} sm={6} xs={6}>
                    <Typography variant="subtitle2" color="textSecondary">
                        {t('minimumWithdraw')}
                    </Typography>
                    <Typography variant="body2" fontWeight={700}>
                        <NumericFormat
                            value={selectedBalance.coin.min_withdrawal}
                            decimalScale={2}
                            fixedDecimalScale
                            thousandSeparator
                            displayType="text"
                        />{' '}
                        {selectedBalance.coin.ticker}
                    </Typography>
                </Grid>
            </Grid>
        </div>
    );
};

export default styled(Component)``;
