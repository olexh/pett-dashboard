import React, { FC, useState } from 'react';
import styled from 'styled-components';
import {
    AppBar,
    Button,
    ButtonBase,
    Container,
    Grid,
    IconButton,
    Theme,
    Toolbar,
    Typography,
    useMediaQuery,
    useScrollTrigger,
} from '@mui/material';
import logo from '../assets/logo.svg';
import MenuIcon from '@mui/icons-material/Menu';
import MobileDrawer from './MobileDrawer';
import { RootState, useAppDispatch } from '../redux/Store';
import { resetState, setInState } from '../redux/actions/app';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Link as RouterLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
}

const ElevationScroll = ({ ...props }) => {
    const { children, window } = props;
    // Note that you normally won't need to set the window ref as useScrollTrigger
    // will default to window.
    // This is only being set here because the demo is in an iframe.
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        style: {
            transition: 'all 0.2s ease',
            background: trigger ? '#E46FA4' : 'transparent',
            color: trigger ? 'white' : '#E46FA4',
            // Todo fix transition color change
        },
    });
};

const Navigation: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const language = useSelector((state: RootState) => state.app.language);
    const [isDrawerOpened, setIsDrawerOpened] = useState(false);
    const mobile = useMediaQuery(({ breakpoints }: Theme) => breakpoints.down('sm'));
    const token = useSelector((state: RootState) => state.app.secret);
    const { data: profileData } = useQuery(
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

    const logoPETT = (
        <div className="logo-pett">
            <img src={logo} alt={t('logo')} width={39} height={39} />
            <Typography variant="h6" display="inline" paddingLeft={1} fontWeight={400}>
                {t('pettNetwork')}
            </Typography>
        </div>
    );

    const logout = () => {
        dispatch(resetState());
    };

    const switchLang = () => {
        if (language === 'en') {
            dispatch(setInState({ language: 'ko' }));
        } else {
            dispatch(setInState({ language: 'en' }));
        }
    };

    return (
        <ElevationScroll>
            <AppBar className={className} color="transparent" elevation={0}>
                <MobileDrawer
                    isAdmin={profileData && profileData!.admin}
                    isDrawerOpened={isDrawerOpened}
                    setIsDrawerOpened={setIsDrawerOpened}
                />
                <Container>
                    {!mobile && (
                        <Toolbar className="toolbar">
                            <Grid container spacing={2} alignItems="center">
                                <Grid item md xs>
                                    <ButtonBase component={RouterLink} to="/" className="logo-btn">
                                        {logoPETT}
                                    </ButtonBase>
                                </Grid>
                                <Grid item md="auto">
                                    <Button onClick={switchLang}>{language === 'en' ? 'KR' : 'EN'}</Button>
                                </Grid>
                                {profileData && profileData!.admin && (
                                    <Grid item md="auto" textAlign="right">
                                        <Button
                                            size="small"
                                            component={RouterLink}
                                            to="/admin"
                                            variant="text"
                                            color="inherit"
                                        >
                                            Admin
                                        </Button>
                                    </Grid>
                                )}
                                <Grid item md="auto" textAlign="right">
                                    <Button size="small" onClick={logout} variant="outlined" color="inherit">
                                        Log out
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    )}
                    {mobile && (
                        <div className="mobile-menu-box">
                            <Container className="mobile">
                                <ButtonBase style={{ display: 'flex', justifyContent: 'center' }}>
                                    <img src={logo} className="mobile-logo" alt="logo" />
                                </ButtonBase>
                                <IconButton color="inherit" size="large" onClick={() => setIsDrawerOpened(true)}>
                                    <MenuIcon />
                                </IconButton>
                            </Container>
                        </div>
                    )}
                </Container>
            </AppBar>
        </ElevationScroll>
    );
};

export default styled(Navigation)`
    .logo-pett {
        display: flex;
        align-items: center;
    }

    .toolbar {
        display: flex;
        justify-content: space-between;
    }

    .right-links {
        display: flex;
    }

    .nav-item {
        transition: 0.1s ease;
        border-radius: ${({ theme }) => theme.spacing(0.5)};
        padding: ${({ theme }) => theme.spacing(0, 0.5)};
        margin-right: ${({ theme }) => theme.spacing(2)};
    }

    .mobile-logo {
        width: 60px;
    }

    .mobile-link {
        margin: ${({ theme }) => theme.spacing(0, 0.5)};
    }

    .mobile-menu-box {
        min-height: 75px;
        display: flex;
        align-items: center;
    }

    .mobile {
        width: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        // color: ${({ theme }) => theme.palette.common.white};
    }

    .logo-btn {
        border-radius: 40px;
        padding: 0 10px;
    }
`;
