import React from 'react';
import DevExpressProvider from './DevExpressProvider';
import GridTable from '../../DevComponents/GridTable';

const DevExpressContainer = () => (
    <DevExpressProvider>
        <DevExpressPresenter />
    </DevExpressProvider>
)
const DevExpressPresenter = () => <GridTable />;


export default DevExpressContainer;