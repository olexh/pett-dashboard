import React, { FC } from 'react';
import styled from 'styled-components';
import { Button, Dialog, DialogContent, Grid, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
    open: boolean;
    onClose: any;
    handleRefund: any;
}

const Component: FC<Props> = ({ className, open, handleRefund, onClose }) => {
    const { t } = useTranslation();

    return (
        <Dialog maxWidth="sm" fullWidth open={open} onClose={onClose} className={className}>
            <DialogContent>
                <Grid container direction="column" spacing={2} textAlign="center">
                    <Grid item md={12}>
                        <Typography variant="h4">{t('refund')}</Typography>
                    </Grid>
                    <Grid item md={12}>
                        <Typography align="center">{t('doYouWantToMakeRefund')}</Typography>
                    </Grid>
                    <Grid item container spacing={2} md={12} justifyContent="center">
                        <Grid item md="auto">
                            <Button color="secondary" disableElevation onClick={onClose}>
                                {t('cancel')}
                            </Button>
                        </Grid>
                        <Grid item md="auto">
                            <Button
                                color="secondary"
                                disableElevation
                                variant="contained"
                                onClick={handleRefund}
                                autoFocus
                            >
                                {t('confirm')}
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </DialogContent>
        </Dialog>
    );
};

export default styled(Component)`
]`;
