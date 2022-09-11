import React, {FC} from 'react';
import styled from 'styled-components';

interface Props {
    className?: string;
}

const Component: FC<Props> = ({className}) => {
    return (
        <div className={className}>
        </div>
    );
};

export default styled(Component)``;
