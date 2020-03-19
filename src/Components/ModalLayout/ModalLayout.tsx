import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import { createPortal } from 'react-dom';

interface IProps {
    isOpen: boolean;
}

const ModalLayoutContainer: React.FC<IProps> = ({
    children,
    isOpen
}) => {
    const rootRef = document.getElementById('root-modal');

    return ( isOpen && rootRef ) ? createPortal(
        <Container>
            { children }
        </Container>,
        rootRef
    ) : null;
};

const Container = styled.div`
    height: 0;
    transition: height .5s;
    &.active {
        height: 100%;
    }
`;

export default ModalLayoutContainer;