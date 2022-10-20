import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { Funding, FundingList, History, Stats, User, Users, Withdrawal, WithdrawalRequest } from './layout';
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const location = useLocation();
    const currentRoot = location.pathname.split('/');

    return (
        <div className={className}>
            <Container className="container">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs variant="scrollable" scrollButtons value={`/${currentRoot[1]}/${currentRoot[2]}`}>
                        <Tab label={t('users')} value="/admin/users" component={Link} to="/admin/users" />
                        <Tab label={t('txHistory')} value="/admin/history" component={Link} to="/admin/history" />
                        <Tab
                            label={t('withdrawalList')}
                            value="/admin/withdrawal"
                            component={Link}
                            to="/admin/withdrawal"
                        />
                        <Tab label={t('fundingList')} value="/admin/fundlist" component={Link} to="/admin/fundlist" />
                        <Tab label={t('funding')} value="/admin/funding" component={Link} to="/admin/funding" />
                        <Tab
                            label={t('withdrawalRequest')}
                            value="/admin/request"
                            component={Link}
                            to="/admin/request"
                        />
                        <Tab label={t('stats')} value="/admin/stats" component={Link} to="/admin/stats" />
                    </Tabs>
                </Box>
                <Switch>
                    <Route path="/admin/stats" exact>
                        <Box padding={3}>
                            <Stats />
                        </Box>
                    </Route>
                    <Route path="/admin/user/:usernameParam" exact>
                        <Box padding={3}>
                            <User />
                        </Box>
                    </Route>
                    <Route path="/admin/users" exact>
                        <Box padding={3}>
                            <Users />
                        </Box>
                    </Route>
                    <Route path="/admin/history" exact>
                        <Box padding={3}>
                            <History />
                        </Box>
                    </Route>
                    <Route path="/admin/withdrawal" exact>
                        <Box padding={3}>
                            <Withdrawal />
                        </Box>
                    </Route>
                    <Route path="/admin/fundlist" exact>
                        <Box padding={3}>
                            <FundingList />
                        </Box>
                    </Route>
                    <Route path="/admin/funding/:usernameParam?" exact>
                        <Box padding={3}>
                            <Funding />
                        </Box>
                    </Route>
                    <Route path="/admin/request/:usernameParam?" exact>
                        <Box padding={3}>
                            <WithdrawalRequest />
                        </Box>
                    </Route>
                    <Redirect to="/admin/users" />
                </Switch>
            </Container>
        </div>
    );
};

export default styled(Component)`
    .container {
        padding-top: ${({ theme }) => theme.spacing(12)};
    }
`;
