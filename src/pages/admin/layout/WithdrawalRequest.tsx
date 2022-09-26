import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, Divider, FormControlLabel, Grid, Paper, Switch, TextField, Typography } from '@mui/material';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { LoadingButton } from '@mui/lab';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { userReference } = useParams<{ userReference?: string }>();
    const { enqueueSnackbar } = useSnackbar();
    const [isRefunded, setIsRefunded] = useState(false);
    const [comment, setComment] = useState('');
    const [reference, setReference] = useState(userReference ? userReference : '');
    const [txid, setTxid] = useState('');
    const token = useSelector((state: RootState) => state.app.secret);
    const {
        mutate: request,
        isLoading: isLoadingRequest,
        data: requestData,
        error: requestError,
        isError: isErrorRequest,
    } = useMutation((req: { txid?: string; reference: string; comment?: string }) => {
        return axios
            .post(
                `${axios.defaults.baseURL}/admin/withdrawal/${req.reference}/${isRefunded ? 'refund' : 'process'}`,
                req,
                { headers: { auth: token } },
            )
            .then((data) => data.data);
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
            txid,
            reference,
            comment,
        });
    };

    const handleChangeRefund = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRefunded(event.target.checked);
    };

    useEffect(() => {
        if (requestData && !isLoadingRequest) {
            enqueueSnackbar('Withdrawal request has been successfully processed', { variant: 'success' });
            setTxid('');
            setComment('');
            setReference('');
        }
    }, [requestData]);

    useEffect(() => {
        if (requestError && isErrorRequest) {
            enqueueSnackbar('Something went wrong', { variant: 'error' });
            setTxid('');
            setComment('');
            setReference('');
        }
    }, [requestError]);

    return (
        <Grid className={className} container justifyContent="center">
            <Grid item md={5} sm={5} xs={12}>
                <Paper variant="outlined" square>
                    <Typography variant="h5" margin={3}>
                        Withdrawal Request
                    </Typography>
                    <Divider />
                    <Box padding={3}>
                        <Box marginBottom={3}>
                            <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                Withdrawal Reference *
                            </Typography>
                            <TextField
                                value={reference}
                                onChange={(e) => setReference(e.target.value)}
                                placeholder="Type withdrawal reference"
                                fullWidth
                                size="small"
                            />
                        </Box>
                        <Box marginBottom={3}>
                            <FormControlLabel
                                control={<Switch checked={isRefunded} onChange={handleChangeRefund} />}
                                label="Refund withdrawal"
                            />
                        </Box>
                        {!isRefunded && (
                            <Box marginBottom={3}>
                                <Typography variant="subtitle2" marginBottom={1} color="textSecondary">
                                    Txid *
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
                                Comment
                            </Typography>
                            <TextField
                                value={comment}
                                multiline
                                InputProps={{ style: { borderRadius: 20 } }}
                                onChange={(e) => setComment(e.target.value)}
                                placeholder="Type comment"
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
                            Confirm
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
