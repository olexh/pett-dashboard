import React, { FC } from 'react';
import styled from 'styled-components';
import { Grid, IconButton, Link, Typography } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useTranslation } from 'react-i18next';
import { useBank } from '../../../../api';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { data: bank } = useBank({ refetchInterval: 10000 });

    if (!bank) return null;

    return (
        <Grid className={className} container spacing={4}>
            <Grid item md={6} sm={6} xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    {t('bankName')}
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                    {bank.bank}
                </Typography>
            </Grid>
            <Grid item md={6} sm={6} xs={6}>
                <Typography variant="subtitle2" color="textSecondary">
                    {t('bankAccountNo')}
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                    {bank.account}
                    <CopyToClipboard text={bank.account}>
                        <IconButton size="small">
                            <ContentCopyIcon />
                        </IconButton>
                    </CopyToClipboard>
                </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Typography variant="subtitle2" color="textSecondary">
                    {t('depositor')}
                </Typography>
                <Typography variant="body2" fontWeight={700}>
                    {bank.depositor}
                    <CopyToClipboard text={bank.depositor}>
                        <IconButton size="small">
                            <ContentCopyIcon />
                        </IconButton>
                    </CopyToClipboard>
                </Typography>
            </Grid>
            <Grid item md={12} sm={12} xs={12}>
                <Typography variant="body2">
                    ·{' '}
                    <Link href="#">
                        <strong>{t('contactOurAdministration')}</strong>
                    </Link>
                    {t('beforeMakingABankDeposit')}
                </Typography>
                <Typography variant="body2">{t('sendFundsToOurBankAccount')}</Typography>
                <Typography variant="body2">
                    {t('ifYouWillHaveIssuesOrQuestions')} <Link href="#">{t('pleaseContactOurSupport')}</Link>.
                </Typography>
            </Grid>
        </Grid>
    );
};

export default styled(Component)``;
