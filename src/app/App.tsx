import React from 'react';
import { ThemeProvider } from 'styled-components';
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import GlobalStyle from './GlobalStyle';
import ScrollToTop from './ScrollToTop';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { Home } from '../pages';
import BackToTop from './BackToTop';
import { Fab } from '@mui/material';
import { CgArrowLongUp } from 'react-icons/cg';
import Navigation from './Navigation';

import 'swiper/css';
import Footer from './Footer';

const App = ({ ...props }) => {
    return (
        <Router>
            <ScrollToTop />
            <MuiThemeProvider theme={theme}>
                <ThemeProvider theme={theme}>
                    <CssBaseline />
                    <GlobalStyle />
                    <Navigation />
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Redirect to="/" />
                    </Switch>
                    <Footer />
                    <BackToTop {...props}>
                        <Fab color="default" size="medium" aria-label="scroll back to top">
                            <CgArrowLongUp size={24} />
                        </Fab>
                    </BackToTop>
                </ThemeProvider>
            </MuiThemeProvider>
        </Router>
    );
};

export default App;
