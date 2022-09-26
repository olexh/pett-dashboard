import React, { FC } from 'react';
import styled from 'styled-components';
import { Box, Container, Tab, Tabs } from '@mui/material';
import { Funding, History, Users, Withdrawal, WithdrawalRequest } from "./layout";
import { Link, Redirect, Route, Switch, useLocation } from 'react-router-dom';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const location = useLocation();
    const currentRoot = location.pathname.split('/');

    return (
        <div className={className}>
            <Container className="container">
                <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <Tabs variant="scrollable" scrollButtons value={`/${currentRoot[1]}/${currentRoot[2]}`}>
                        <Tab label="Users" value="/admin/users" component={Link} to="/admin/users" />
                        <Tab label="TX History" value="/admin/history" component={Link} to="/admin/history" />
                        <Tab
                            label="Withdrawal List"
                            value="/admin/withdrawal"
                            component={Link}
                            to="/admin/withdrawal"
                        />
                        <Tab label="Funding" value="/admin/funding" component={Link} to="/admin/funding" />
                        <Tab label="Withdrawal Request" value="/admin/request" component={Link} to="/admin/request" />
                    </Tabs>
                </Box>
                <Switch>
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
                    <Route path="/admin/funding/:userReference?" exact>
                        <Box padding={3}>
                            <Funding />
                        </Box>
                    </Route>
                    <Route path="/admin/request/:userReference?" exact>
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
