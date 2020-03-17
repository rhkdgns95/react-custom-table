import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import ModalLayout from '../../Components/ModalLayout';

const PortalContainer = () => {
    const [ isModal, setIsModal ] = useState<boolean>(false);

    const handleToggleModal = () => {
        setIsModal(!isModal);
    }

    return <PortalPresenter {...{ isModal, handleToggleModal }}/>

};

interface IPortalPresenter {
    isModal: boolean;
    handleToggleModal: () => any;
}   
const PortalPresenter: React.FC<IPortalPresenter> = ({
    isModal,
    handleToggleModal
}) => (
    <Container>
        <Button onClick={handleToggleModal}>
            { isModal ? "Close" : "Open"}
        </Button>

        <ModalLayout isOpen={isModal}>
            <TempModal handleToggleModal={handleToggleModal}/>
        </ModalLayout>
    </Container>
);

const TempModal:React.FC<{handleToggleModal: () => {}}> = ({
    handleToggleModal
}) => {
    const [isEffect, setIsEffect] = useState<boolean>(false);

    useEffect(() => {
        setIsEffect(true);
    }, []);

    return (
        <ModalContainer className={isEffect ? "active" : ""}>
            <Button onClick={handleToggleModal}>
                창 닫기
            </Button>
        </ModalContainer>
    )
}
const Container = styled.div`

`;
const Button = styled.button`
    cursor: pointer;
`;
const ModalContainer = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.42);
    display: flex;
    justify-content: center;
    align-items: center;
    height: 0;
    transition: .3s;
    &.active {
        height: 100%;
    }
`;
const ModalWrapper = styled.div`

`;
export default PortalContainer;