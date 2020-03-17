import React from 'react';
import { convertedHtmlToJsx } from '../../Utils/convertHtmlToJsx';
import styled from 'styled-components';

interface IProps {
    html: string;
}

const HtmlContainer: React.FC<IProps> = ({
    html
}) => {
    
    return (
        <Container className="converted-html-to-jsx">
            {
                convertedHtmlToJsx(html)
            }
        </Container>
    );
};

const Container = styled.div`

`;

export default HtmlContainer;