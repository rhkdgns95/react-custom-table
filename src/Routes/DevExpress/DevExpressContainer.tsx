import React from 'react';
import DataGrid, { Column, ColumnChooser, ColumnFixing } from 'devextreme-react/data-grid';
import DevExpressProvider, { useDevExpressContext } from './DevExpressProvider';

const DevExpress = () => (
    <DevExpressProvider>
        <DevExpressContainer />
    </DevExpressProvider>
)
const DevExpressContainer = () => {
    const { employees, calculateCellValue } = useDevExpressContext();
    return ( 
        <DataGrid
            id="gridContainer"
            dataSource={employees}
            allowColumnReordering={true}
            allowColumnResizing={true}
            columnAutoWidth={true}
            showBorders={true}
        >
            <ColumnChooser enabled={true} />
            <ColumnFixing enabled={true} />
            <Column
            caption="MyEmployee"
            width={230}
            fixed={true}
            calculateCellValue={calculateCellValue}
            />
            <Column
            dataField="BirthDate"
            dataType="date"
            />
            <Column
            dataField="HireDate"
            dataType="date"
            />
            <Column
            dataField="Position"
            alignment="right"
            />
            <Column
            dataField="Address"
            width={230}
            />
            <Column dataField="City" />
            <Column dataField="State" />
            <Column
            dataField="Zipcode"
            visible={false}
            />
            <Column dataField="HomePhone" />
            <Column dataField="MobilePhone" />
            <Column dataField="Skype" />
            <Column dataField="Email" />
        </DataGrid>
    );
}


export default DevExpress;