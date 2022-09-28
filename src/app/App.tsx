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
import { Button, Dialog, DialogContent, Fab, Grid, Typography } from '@mui/material';
import { CgArrowLongUp } from 'react-icons/cg';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import 'swiper/css';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState, useAppDispatch } from '../redux/Store';
import axios from 'axios';
import { SnackbarProvider } from 'notistack';
import { Navigation } from '../components';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { resetState } from '../redux/actions/app';
import { useTranslation } from 'react-i18next';
import { useProfile } from '../api';

const App = ({ ...props }) => {
    const { i18n } = useTranslation();
    const dispatch = useAppDispatch();
    const language = useSelector((state: RootState) => state.app.language);
    const token = useSelector((state: RootState) => state.app.secret);

    const {
        data: profileData,
        isError: isErrorProfile,
        refetch: refetchProfile,
    } = useProfile({ auth: token }, { retry: false });

    const logout = () => {
        dispatch(resetState());
    };

    useEffect(() => {
        if (token) {
            refetchProfile();
        }
    }, [token]);

    useEffect(() => {
        i18n.changeLanguage(language);
    }, [language]);

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>
            <SnackbarProvider maxSnack={2} autoHideDuration={2000}>
                <Router>
                    <ScrollToTop />
                    <MuiThemeProvider theme={theme}>
                        <ThemeProvider theme={theme}>
                            <CssBaseline />
                            <GlobalStyle />
                            {profileData && profileData!.email_activated && <Navigation />}
                            <Switch>
                                <Route path="/activate/:token" exact component={EmailConfirmation} />
                                {(!profileData || !profileData!.email_activated) && (
                                    <>
                                        <Route path="/" exact component={Login} />
                                        {isErrorProfile && <Redirect to="/" />}
                                    </>
                                )}
                                {profileData && profileData!.email_activated && (
                                    <>
                                        <Route path="/" exact component={Dashboard} />
                                        {profileData!.admin && <Route path="/admin" component={Admin} />}
                                        {!profileData!.admin && <Redirect to="/" />}
                                    </>
                                )}
                            </Switch>
                            {/*<Footer />*/}
                            <BackToTop {...props}>
                                <Fab color="default" size="medium" aria-label="scroll back to top">
                                    <CgArrowLongUp size={24} />
                                </Fab>
                            </BackToTop>
                            {profileData && (
                                <Dialog maxWidth="sm" fullWidth open={!profileData!.email_activated}>
                                    <DialogContent>
                                        <Grid container justifyContent="center" spacing={2} textAlign="center">
                                            <Grid item md={12}>
                                                <Typography variant="h4">Email Confirmation</Typography>
                                            </Grid>
                                            <Grid item md={12}>
                                                <Typography align="center">
                                                    To finish registration, please confirm your email. We&apos;ve
                                                    already sent a confirmation link to your email!
                                                </Typography>
                                            </Grid>
                                            <Grid item md={4} xs={6}>
                                                <Button
                                                    variant="contained"
                                                    fullWidth
                                                    size="large"
                                                    onClick={logout}
                                                    disableElevation
                                                    color="secondary"
                                                >
                                                    Log out
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </DialogContent>
                                </Dialog>
                            )}
                        </ThemeProvider>
                    </MuiThemeProvider>
                </Router>
            </SnackbarProvider>
        </LocalizationProvider>
    );
};

export default App;
