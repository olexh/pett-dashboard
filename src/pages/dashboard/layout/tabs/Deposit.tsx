import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid, IconButton, Typography } from '@mui/material';
import { QRCodeSVG } from 'qrcode.react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { NumericFormat } from 'react-number-format';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const selectedBalance: PettDashboard.Balance = useSelector((state: RootState) => state.app.selectedBalance);

    return (
        <Grid className={className} container spacing={4}>
            <Grid item md={12} sm={12} xs={12} display="flex" justifyContent="center">
                <QRCodeSVG size={200} value={selectedBalance.address} />
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                    {t('depositAddress')}
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                    {selectedBalance.address}{' '}
                    <CopyToClipboard text={selectedBalance.address}>
                        <IconButton size="small">
                            <ContentCopyIcon />
                        </IconButton>
                    </CopyToClipboard>
                </Typography>
            </Grid>
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
                    {t('minimumDeposit')}
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                    <NumericFormat
                        value={selectedBalance.coin.min_deposit}
                        decimalScale={2}
                        fixedDecimalScale
                        thousandSeparator
                        displayType="text"
                    />{' '}
                    {selectedBalance.coin.ticker}
                </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Typography variant="body2">
                    {t('sendOnlyToThisDepositAddress', { ticker: selectedBalance.coin.ticker })}
                </Typography>
                <Typography variant="body2">
                    {t('ensureTheNetworkIs')}
                    <Typography variant="body2" component="span" color="primary">
                        {selectedBalance.coin.network}
                    </Typography>
                    .
                </Typography>
            </Grid>
        </Grid>
    );
};

export default styled(Component)``;
