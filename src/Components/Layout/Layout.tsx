import React from 'react';
import styled from 'styled-components';
import NavbarLeft from '../NavbarLeft';
import NavbarTop from '../NavbarTop';

interface IProps {

}
const LayoutContainer: React.FC<IProps> = ({
    children
}) => {
    const navWidth = 100;
    const navHeight = 80;
    return (
        <Container>
            <Wrapper navWidth={navWidth} navHeight={navHeight}>
                <NavbarLeft navWidth={navWidth} />
                <NavbarTop navHeight={navHeight}/>
                <Content>
                { 
                    children
                }    
                </Content>
            </Wrapper>
        </Container>      
    );
}

const Container = styled.div`
    width: 100%;
`;

interface IWrapper {
    navWidth: number;
    navHeight: number;
}

const Wrapper = styled.div<IWrapper>`
    // display: flex;
    width: 100%;
    padding-left: ${props => props.navWidth}px;
`;
const Content = styled.div`
    width: 100%;
    padding: 20px;
`;

export default LayoutContainer;