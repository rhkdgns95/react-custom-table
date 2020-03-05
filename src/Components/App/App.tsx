import React, { useState, useEffect } from 'react';
import AppProvider, { useAppContext } from './AppProvider';
import TableInput from '../TableInput';
import styled from 'styled-components';

const App = () => (
    <AppProvider>
        <AppContainer/>
    </AppProvider> 
);

const useInputNumber = (initValue: number): IUseInputNumber => {
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

const useInputString = (initValue: string): IUseInputString => {
    const [value, setValue] = useState<string>(initValue);

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        setValue(value);
    }

    return {
        value,
        onChange
    };
}

const useArrayInput = (initValue: string) => {
    const [value, setValue] = useState<Array<string>>([initValue]);
}

// https://morioh.com/p/13c4c3eda92f 참고

const useArrayString = () => {
    const [arr, setArr] = useState([]);
    const [name, setName] = useState("");
    
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { target: { value } } = event;
        setArr([ ...arr, value])
    }
    
}

const AppContainer = () => {
    const { table, handleTable } = useAppContext();

    const formRow = useInputNumber(0);
    const formColumn = useInputNumber(0);
    const formTitle = useInputString("");
    const tmp = useInputString("");
    const [theadList, setTheadList] = useState<Array<IUseInputString>>([ useInputString("") ]);

    const [thead, setThead] = useState<Array<string>>([]);
    
    const handleThead = (index: number) => {
        // setThead
        setThead([
            ...thead,
            ""
        ]);
    }

    useEffect(() => {
        console.log("useEffect");
        if(theadList.length === 1 && formColumn.value === 0) { // 맨 초기 실행시,
            
        } else {
            console.log("증가");
            const newData = tmp;
            setTheadList([
                ...theadList,
                newData
            ])
            // setTheadList((prevState) => {
            //     if(prevState.length < formColumn.value) {
            //         // 새 Column갯수 보다 작은경우 => 새 배열 추가해주어야 함
            //         console.log("RESULT - POP");
            //         const newTheadList = prevState.pop();
            //         return newTheadList;
            //     } else {
            //         console.log("RESULT - PUSH");
            //         // 새 Column갯수 보다 큰 경우 => 마지막 배열 삭제해주어야 함
            //         const newTheadList = prevState.push({tmp});
            //         return newTheadList;
            //     }
            // })
            
        }
        
    }, [formColumn]);

    const onCreateTable = (e) => {
        e.preventDefault();
        const { value: row } = formRow;
        const { value: column } = formColumn;
        const { value: title } = formTitle;
        handleTable({ row, column, title } as any);
    }

    console.log("THEAD: ", theadList);

    return (
        <>
            <NavForm onSubmit={onCreateTable}>
                Title: <InputText type={"text"} { ...formTitle } />
                Row:  <InputText type={"text"} { ...formRow }/>
                Column: <InputText type={"text"} { ...formColumn } />
                <InputTheadBox>
                Thead:
                {/* {
                    theadList && theadList.map((item, key) => 
                        <InputText key={key} type={"text"} { ...item  }/>
                    )
                } */}
                     
                </InputTheadBox>
                <InputButton value={"Table Create"} type={'submit'}/>
            </NavForm>
            {
                table && table.map((table, key) => 
                    <TableInput key={key} title={table.title} column={table.column} row={table.row} thArray={[]}/>
                )
            }
            {/* <TableInput column={5} row={4} /> */}
        </>
    )
};
const NavForm = styled.form`

`;
const InputText = styled.input`

`;
const InputTheadBox = styled.div`

`;

const InputButton = styled.input`

`;
export default App;
