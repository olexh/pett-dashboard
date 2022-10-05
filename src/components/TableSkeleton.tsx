import React, { FC } from 'react';
import styled from 'styled-components';
import { Skeleton, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';

interface Props {
    className?: string;
    rows?: number;
    columns?: number;
}

const Component: FC<Props> = ({ className, columns, rows }) => {
    return (
        <TableContainer className={className}>
            <Table>
                <TableBody>
                    {Array(rows)
                        .fill(null)
                        .map((i, idx) => (
                            <TableRow hover key={idx}>
                                {Array(columns)
                                    .fill(null)
                                    .map((item, id) => (
                                        <TableCell key={id}>
                                            <Typography>
                                                <Skeleton width={50} />
                                            </Typography>
                                        </TableCell>
                                    ))}
                            </TableRow>
                        ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default styled(Component)`
    margin-bottom: ${({ theme }) => theme.spacing(3)};
`;
