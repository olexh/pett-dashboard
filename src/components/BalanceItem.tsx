import React, { FC } from 'react';
import styled from 'styled-components';
import { Avatar, Box, ButtonBase, ButtonBaseProps, Grid, Typography } from '@mui/material';
import { NumericFormat } from 'react-number-format';
import LockIcon from '@mui/icons-material/Lock';

interface Props extends PettDashboard.Balance, ButtonBaseProps {
    className?: string;
    selected?: boolean;
}

const Component: FC<Props> = ({ className, selected, coin, available, frozen, usd, ...props }) => {
    return (
        <ButtonBase className={className} {...props}>
            <Box padding={3} width="100%" className="box">
                <Grid container spacing={2} alignItems="center">
                    <Grid item md="auto" sm="auto" xs="auto">
                        <Avatar src={coin.logo} />
                    </Grid>
                    <Grid item md sm xs>
                        <Typography align="left">
                            <Box fontWeight={700} component="span">
                                {coin.name}
                            </Box>{' '}
                            {coin.ticker}
                        </Typography>
                    </Grid>
                    <Grid item md="auto" sm="auto" xs="auto">
                        <Typography fontWeight={700}>
                            <NumericFormat
                                value={available}
                                decimalScale={2}
                                fixedDecimalScale
                                thousandSeparator
                                displayType="text"
                            />{' '}
                            <Typography component="span" color="textSecondary" fontWeight={700}>
                                /{' '}
                                <Box display="inline-flex" alignItems="flex-start">
                                    <NumericFormat
                                        value={frozen}
                                        decimalScale={2}
                                        fixedDecimalScale
                                        thousandSeparator
                                        displayType="text"
                                    />
                                    <LockIcon fontSize="small" />
                                </Box>
                            </Typography>
                            {usd !== null && (
                                <>
                                    {' '}
                                    <Typography component="span" color="#32a96d" fontWeight={700}>
                                        <NumericFormat
                                            value={usd}
                                            decimalScale={2}
                                            fixedDecimalScale
                                            suffix="$"
                                            thousandSeparator
                                            displayType="text"
                                        />
                                    </Typography>
                                </>
                            )}
                        </Typography>
                    </Grid>
                </Grid>
            </Box>
        </ButtonBase>
    );
};

export default styled(Component)`
    width: 100%;

    .box {
        background: ${({ selected, theme }) => (selected ? theme.palette.action.selected : 'transparent')};
        //color: ${({ selected, theme }) => (selected ? theme.palette.common.white : theme.palette.text.primary)};
    }
`;
