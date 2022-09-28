import React, { FC, useEffect } from 'react';
import styled from 'styled-components';
import { Box, Divider, Paper, Tab, Tabs, Typography } from '@mui/material';
import Withdraw from './Withdraw';
import Deposit from './Deposit';
import Purchase from './Purchase';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../redux/Store';
import { useTranslation } from 'react-i18next';

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
    const { t } = useTranslation();
    const [value, setValue] = React.useState(0);
    const selectedBalance: PettDashboard.Balance = useSelector((state: RootState) => state.app.selectedBalance);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    useEffect(() => {
        if (selectedBalance && !selectedBalance.coin.deposits_enabled) {
            setValue(1);
        } else {
            setValue(0);
        }
    }, [selectedBalance]);

    return (
        <Paper className={className} variant="outlined" square>
            <Typography variant="h5" margin={3}>
                {value === 0 ? t('deposit') : value === 1 ? t('purchase') : t('withdraw')}
            </Typography>
            <Divider />
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs centered value={value} onChange={handleChange}>
                    {selectedBalance && selectedBalance.coin.deposits_enabled ? (
                        <Tab label={t('deposit')} value={0} />
                    ) : null}
                    <Tab label={t('purchase')} value={1} />
                    {selectedBalance && selectedBalance.coin.withdrawals_enabled ? (
                        <Tab label={t('withdraw')} value={2} />
                    ) : null}
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                {selectedBalance && <Deposit />}
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Purchase />
            </TabPanel>
            <TabPanel value={value} index={2}>
                {selectedBalance && <Withdraw />}
            </TabPanel>
        </Paper>
    );
};

export default styled(Component)``;
