import React, { FC } from 'react';
import { Container, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';
import { resetState, setInState } from '../redux/actions/app';
import { RootState, useAppDispatch } from '../redux/Store';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';

interface Props {
    className?: string;
    isDrawerOpened: boolean;
    isAdmin?: boolean;
    setIsDrawerOpened: (arg1: boolean) => void;
}

const MobileDrawer: FC<Props> = ({ className, isDrawerOpened, isAdmin, setIsDrawerOpened }) => {
    const { t } = useTranslation();
    const dispatch = useAppDispatch();
    const history = useHistory();
    const language = useSelector((state: RootState) => state.app.language);
    const onClose = () => setIsDrawerOpened(false);

    const logout = () => {
        onClose();
        dispatch(resetState());
    };

    const goTo = (path: string) => {
        onClose();
        history.push(path);
    };

    const switchLang = () => {
        if (language === 'en') {
            dispatch(setInState({ language: 'ko' }));
        } else {
            dispatch(setInState({ language: 'en' }));
        }

        onClose();
    };

    return (
        <Drawer
            anchor="top"
            open={isDrawerOpened}
            className={className}
            onClose={onClose}
            PaperProps={{ className: 'paper' }}
        >
            <Container>
                <div className="close-box">
                    <IconButton color="inherit" size="large" onClick={onClose}>
                        <CloseIcon />
                    </IconButton>
                </div>
            </Container>
            <List className="mobile-list">
                {isAdmin && (
                    <ListItem className="link">
                        <ListItemButton className="link-text" onClick={() => goTo('/admin')}>
                            <ListItemText
                                primary={
                                    <Typography variant="h6" textTransform="uppercase">
                                        Admin
                                    </Typography>
                                }
                            />
                        </ListItemButton>
                    </ListItem>
                )}
                <ListItem className="link">
                    <ListItemButton className="link-text" onClick={switchLang}>
                        <ListItemText
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    {language === 'en' ? 'KR' : 'EN'}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
                <ListItem className="link">
                    <ListItemButton className="link-text" onClick={logout}>
                        <ListItemText
                            primary={
                                <Typography variant="h6" textTransform="uppercase">
                                    {t('logOut')}
                                </Typography>
                            }
                        />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default styled(MobileDrawer)`
    .mobile-list {
        color: ${({ theme }) => theme.palette.common.white};
    }

    .link-text {
        display: flex;
        justify-content: center;
    }

    .paper {
        height: 100%;
        background: ${({ theme }) => theme.palette.primary.main};
    }

    .close-box {
        display: flex;
        justify-content: flex-end;
        height: 75px;
        color: ${({ theme }) => theme.palette.common.white};
    }
`;
