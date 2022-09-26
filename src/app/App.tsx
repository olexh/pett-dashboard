import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import GlobalStyle from './GlobalStyle';
import ScrollToTop from './ScrollToTop';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Admin, Dashboard, EmailConfirmation, Login } from '../pages';
import BackToTop from './BackToTop';
import { Fab } from '@mui/material';
import { CgArrowLongUp } from 'react-icons/cg';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/Store';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { Navigation } from '../components';
import { LocalizationProvider } from '@mui/x-date-pickers';

const App = ({ ...props }) => {
    const token = useSelector((state: RootState) => state.app.secret);
    const { data: profileData, refetch: refetchProfile } = useQuery(
        ['profile', token],
        () => {
            return axios
                .get(`${axios.defaults.baseURL}/user/profile`, {
                    headers: { auth: token },
                })
                .then((data) => data.data);
        },
        { retry: false },
    );

    useEffect(() => {
        if (token) {
            refetchProfile();
        }
    }, [token]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
                <Router>
                    <ScrollToTop />
                    <MuiThemeProvider theme={theme}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <GlobalStyle />
                            {profileData && profileData!.email_activated && profileData!.telegram_activated && (
                                <Navigation />
                            )}
                            <Switch>
                                <Route path="/activate/:token" exact component={EmailConfirmation} />
                                {(!profileData ||
                                    !profileData!.email_activated ||
                                    !profileData!.telegram_activated) && (
                                    <>
                                        <Route path="/" exact component={Login} />
                                        <Redirect to="/" />
                                    </>
                                )}
                                {profileData && profileData!.email_activated && profileData!.telegram_activated && (
                                    <>
                                        <Route path="/" exact component={Dashboard} />
                                        {profileData!.admin && <Route path="/admin" component={Admin} />}
                                        <Redirect to="/" />
                                    </>
                                )}
                            </Switch>
                            {/*<Footer />*/}
                            <BackToTop {...props}>
                                <Fab color="default" size="medium" aria-label="scroll back to top">
                                    <CgArrowLongUp size={24} />
                                </Fab>
                            </BackToTop>
                        </ThemeProvider>
                    </MuiThemeProvider>
                </Router>
            </SnackbarProvider>
        </LocalizationProvider>
    );
};

export default App;
