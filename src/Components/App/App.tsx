import React, { useState } from 'react';
import AppProvider, { useAppContext } from './AppProvider';
import TableInput from '../TableInput';
import styled from 'styled-components';

const App = () => (
    <AppProvider>
        <AppContainer/>
    </AppProvider> 
);

const useInput = (initValue: number): IUseInput => {
    const [value, setValue] = useState<number>(initValue);
    
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        const parsedValue = parseInt(value);
        if(parsedValue) {
            if(!isNaN(parsedValue)) { // 숫자 입력,
                setValue(parsedValue);
            } else { // 숫자가 아닌 경우,
                alert("숫자만 입력해주세요");
            }
        } else {
            setValue(0);
        }
    }

    return {
        value,
        onChange
    };
}

const AppContainer = () => {
    const { table, handleTable } = useAppContext();
    
    const formRow = useInput(0);
    const formColumn = useInput(0);
    
    const onCreateTable = (e) => {
        e.preventDefault();
        const { value: row } = formRow;
        const { value: column } = formColumn;
        handleTable({ row, column } as any);
    }
    return (
        <>
            {/* <NavForm onSubmit={onCreateTable}>
                <InputText type={"text"} { ...formRow }/>
                <InputText type={"text"} { ...formColumn } />
                <InputButton value={"Table Create"} type={'submit'}/>
            </NavForm>
            {
                table && table.map(table => 
                    <TableInput column={table.column} row={table.row}/>
                )
            } */}
            <TableInput column={5} row={4} />
        </>
    )
};
const NavForm = styled.form`

`;
const InputText = styled.input`

`;

const InputButton = styled.input`

`;

export default App;
