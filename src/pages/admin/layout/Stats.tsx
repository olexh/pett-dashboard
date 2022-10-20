import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import { useAdminStats } from '../../../api';
import { useSelector } from 'react-redux';
import { RootState } from '../../../redux/Store';
import { TokensStatsSkeleton, UsersStatsSkeleton } from '../components';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({ className }) => {
    const { t } = useTranslation();
    const auth = useSelector((state: RootState) => state.app.secret);
    const { data, isLoading } = useAdminStats({ auth });

    const tokenStats = (
        <>
            {data?.coins.map((c, i) => (
                <Grid item md={i === 0 ? true : 6} xs={12} key={c.coin.reference}>
                    <Paper variant="outlined" square>
                        <Typography variant="h5" margin={3}>
                            {c.coin.name}
                        </Typography>
                        <Divider />
                        <Box p={3}>
                            <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                                <Grid item md sm xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {t('available')}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700}>
                                        <NumericFormat
                                            value={c.available}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix={` ${c.coin.ticker}`}
                                            displayType="text"
                                        />
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="textSecondary">
                                        <NumericFormat
                                            value={c.usd.available}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix="$"
                                            displayType="text"
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item md sm xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {t('frozen')}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700}>
                                        <NumericFormat
                                            value={c.frozen}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix={` ${c.coin.ticker}`}
                                            displayType="text"
                                        />
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="textSecondary">
                                        <NumericFormat
                                            value={c.usd.frozen}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix="$"
                                            displayType="text"
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item md sm xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {t('sold')}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700}>
                                        <NumericFormat
                                            value={c.fundings}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix={` ${c.coin.ticker}`}
                                            displayType="text"
                                        />
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="textSecondary">
                                        <NumericFormat
                                            value={c.usd.fundings}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix="$"
                                            displayType="text"
                                        />
                                    </Typography>
                                </Grid>
                                <Grid item md sm xs={6}>
                                    <Typography variant="subtitle2" color="textSecondary">
                                        {t('withdrawn')}
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700}>
                                        <NumericFormat
                                            value={c.withdrawals}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix={` ${c.coin.ticker}`}
                                            displayType="text"
                                        />
                                    </Typography>
                                    <Typography variant="body2" fontWeight={700} color="textSecondary">
                                        <NumericFormat
                                            value={c.usd.withdrawals}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            thousandSeparator
                                            suffix="$"
                                            displayType="text"
                                        />
                                    </Typography>
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>
            ))}
        </>
    );

    return (
        <Grid className={className} container spacing={4}>
            <Grid item md={4} xs={12}>
                <Paper variant="outlined" square>
                    <Typography variant="h5" margin={3}>
                        {t('users')}
                    </Typography>
                    <Divider />
                    <Box p={3}>
                        {!isLoading ? (
                            data && (
                                <Grid container spacing={4} justifyContent="space-between" alignItems="flex-start">
                                    <Grid item md xs>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t('total')}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={700}>
                                            {data.users.total}
                                        </Typography>
                                    </Grid>
                                    <Grid item md xs>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t('admin')}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={700}>
                                            {data.users.admin}
                                        </Typography>
                                    </Grid>
                                    <Grid item md xs>
                                        <Typography variant="subtitle2" color="textSecondary">
                                            {t('banned')}
                                        </Typography>
                                        <Typography variant="body2" fontWeight={700}>
                                            {data.users.banned}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            )
                        ) : (
                            <UsersStatsSkeleton />
                        )}
                    </Box>
                </Paper>
            </Grid>
            {!isLoading ? (
                data && data.coins.length === 0 ? (
                    <Box padding={3} textAlign="center">
                        <Typography color="textSecondary">There is no withdrawal history yet.</Typography>
                    </Box>
                ) : (
                    tokenStats
                )
            ) : (
                <TokensStatsSkeleton />
            )}
        </Grid>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
