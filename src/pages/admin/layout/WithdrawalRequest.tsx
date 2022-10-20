import React, { FC, useState } from 'react';
import styled from 'styled-components';
import { Box, Divider, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { withdrawalRequest } from '../../../api';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const { userReference } = useParams<{ userReference?: string }>();
    const { enqueueSnackbar } = useSnackbar();
    const [isRefunded, setIsRefunded] = useState(false);
    const [comment, setComment] = useState('');
    const [reference, setReference] = useState(userReference ? userReference : '');
    const [txid, setTxid] = useState('');
    const token = useSelector((state: RootState) => state.app.secret);

    // TODO: test
    const { mutate: request, isLoading: isLoadingRequest } = useMutation(withdrawalRequest, {
        onError: (e: Error) => {
            enqueueSnackbar(e.message, { variant: 'error' });
            setTxid('');
            setComment('');
            setReference('');
        },
        onSuccess: () => {
            enqueueSnackbar('Withdrawal request has been successfully processed', { variant: 'success' });
            setTxid('');
            setComment('');
            setReference('');
        },
    });

    const handleRequest = () => {
        if (!isRefunded && (!txid || txid === '')) {
            enqueueSnackbar('Txid field is required for withdrawal request', { variant: 'error' });
            return;
        }

        if (!reference || reference === '') {
            enqueueSnackbar('Reference field is required for  withdrawal request', { variant: 'error' });
            return;
        }

        request({
            auth: token,
            isRefunded,
            req: {
                txid,
                reference,
                comment,
            },
        });
    };

    const handleChangeRefund = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRefunded(event.target.checked);
    };

    return (
        <Grid className={className} container justifyContent="center">
            <Grid item md={5} sm={5} xs={12}>
                <Paper variant="outlined" square>
                    <Typography variant="h5" margin={3}>
                        {t('withdrawalRequest')}
                    </Typography>
                    <Divider />
                    <Box padding={3}>
                        <Box marginBottom={3}>
                            <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                {t('withdrawalReference')}
                            </Typography>
                            <TextField
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                placeholder={t('typeWithdrawalReference')}
                                fullWidth
                                size="small"
                            />
                        </Box>
                        <Box marginBottom={3}>
                            <FormControlLabel
                                control={<Switch checked={isRefunded} onChange={handleChangeRefund} />}
                                label={t('refundWithdrawal')}
                            />
                        </Box>
                        {!isRefunded && (
                            <Box marginBottom={3}>
                                <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                    {t('txid')}
                                </Typography>
                                <TextField
                                    value={txid}
                                    onChange={(e) => setTxid(e.target.value)}
                                    placeholder="Type txid"
                                    fullWidth
                                    size="small"
                                />
                            </Box>
                        )}
                        <Box marginBottom={3}>
                            <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                {t('comment')}
                            </Typography>
                            <TextField
                                value={comment}
                                multiline
                                InputProps={{ style: { borderRadius: 20 } }}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder={t('typeComment')}
                                fullWidth
                                minRows={4}
                                size="small"
                            />
                        </Box>
                        <LoadingButton
                            loadingPosition="start"
                            loading={isLoadingRequest}
                            size="large"
                            onClick={handleRequest}
                            disableElevation
                            fullWidth
                            variant="contained"
                        >
                            {t('confirm')}
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
