import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Divider, Grid, IconButton, Link, Paper, Tab, Tabs, Typography } from '@mui/material';
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';

interface Props {
    className?: string;
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3 }}>
                    <Typography>{children}</Typography>
                </Box>
            )}
        </div>
    );
}

const Component: FC<Props> = ({ className }) => {
    const [value, setValue] = React.useState(0);
    const selectedBalance: PettDashboard.Balance = useSelector((state: RootState) => state.app.selectedBalance);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (selectedBalance && !selectedBalance.coin.deposits_enabled) {
            setValue(2);
        } else {
            setValue(0);
        }
    }, [selectedBalance]);

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                {value === 0 ? 'Deposit' : value === 1 ? 'Purchase' : 'Withdraw'}
            </Typography>
            <Divider />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs centered value={value} onChange={handleChange}>
                    {selectedBalance && selectedBalance.coin.deposits_enabled ? (
                        <Tab label="Deposit" value={0} />
                    ) : null}
                    {/*<Tab label="Purchase" value={1} />*/}
                    {selectedBalance && selectedBalance.coin.withdrawals_enabled ? (
                        <Tab label="Withdraw" value={2} />
                    ) : null}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {selectedBalance && <Deposit />}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Grid container spacing={4}>
                    <Grid item md={6} sm={6} xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Bank Name
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                            하나은행 (KEB)
                        </Typography>
                    </Grid>
                    <Grid item md={6} sm={6} xs={6}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Bank Account No.
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                            635-910012-29104
                            <CopyToClipboard text="635-910012-29104">
                                <IconButton size="small">
                                    <ContentCopyIcon />
                                </IconButton>
                            </CopyToClipboard>
                        </Typography>
                    </Grid>
                    <Grid item md={12} sm={12} xs={12}>
                        <Typography variant="subtitle2" color="textSecondary">
                            Depositor
                        </Typography>
                        <Typography variant="body2" fontWeight={700}>
                            유한회사 창신무역
                            <CopyToClipboard text="유한회사 창신무역">
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
                                <strong>Contact our administration</strong>
                            </Link>{' '}
                            before making a Bank deposit.
                        </Typography>
                        <Typography variant="body2">· Send funds to our Bank Account.</Typography>
                        <Typography variant="body2">
                            · If you will have issues or questions, <Link href="#">please contact our support</Link>.
                        </Typography>
                    </Grid>
                </Grid>
            </TabPanel>
            <TabPanel value={value} index={2}>
                {selectedBalance && <Withdraw />}
            </TabPanel>
        </Paper>
    );
};

export default styled(Component)``;
