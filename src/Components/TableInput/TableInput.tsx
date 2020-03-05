import React, { useRef, useEffect, useState, createRef, forwardRef } from 'react';
import styled from 'styled-components';
import { getKeyDown } from '../../Utils/getKeyDown';

const useArrayRef = (length: number) => Array.from({ length }, () => createRef());

interface IProps {
    row: number;
    column: number;
}
const Table: React.FC<IProps> = ({
    row,
    column
}) => {
    
    const [cursorRow, setCursorRow] = useState<number>(0);
    const [cursorColumn, setCursorColumn] = useState<number>(0);

    const [index, setIndex] = useState<number>(0);
    const ref = useRef<any>(null);
    const refs: any = Array.from({ length: 7 }, () => createRef());
    
    const newRefs: any = [ useArrayRef(column),  useArrayRef(column), useArrayRef(column), useArrayRef(column) ];
    // const newRefs: any = Array(row).fill(useArrayRef(column));

    // const newRefs = Array.from({ length: 5 }, () => createRef()).map(item => item);
    useEffect(() => {
        console.log("** REFs: ", refs);
        console.log("** newRefs: ", newRefs);
        console.log("** newRefs length: ", newRefs.length);
    }, []);

    useEffect(() => {   
        // ref.current.focus();
    }, [ref]);
    
    useEffect(() => {
        console.log("REF2: ", refs);
    }, [refs]);
    
    useEffect(() => {
        if(newRefs[0][0].current) {
            console.log("Move Row To ", row);
            console.log("New Cursor: ", row, column);
            console.log("newRefs[cursorRow][cursorColumn]:" , newRefs[cursorRow][cursorColumn]);
            newRefs[cursorRow][cursorColumn].current.focus();
        }
    }, [cursorRow]);

    useEffect(() => {
        if(newRefs[0][0].current) {
            console.log("Move Column To ", column);
            console.log("New Cursor: ", row, column);
            newRefs[cursorRow][cursorColumn].current.focus();
        }
    }, [cursorColumn]);

    const handleCursor = ({
        row,
        column
    }: { row?: number, column?: number}) => {
        if(row) {
            setCursorRow(row);
        } 
        if(column) {
            setCursorColumn(column);
        }
    }
    
    const onKeyDown = (e: React.KeyboardEvent) => {
        const { keyCode } = e;
        const key = getKeyDown(keyCode);
        console.log("input key: ", key);
        switch(key) {
            case "LEFT": 
                setCursorColumn(prevState => prevState > 0 ? prevState - 1 : prevState);
               break;
            case "RIGHT": 
                setCursorColumn(prevState => prevState < column - 1 ? prevState + 1 : prevState);
                break;
            case "UP": 
                setCursorRow(prevState => prevState > 0 ? prevState - 1 : prevState);
                break;
            case "DOWN": 
                setCursorRow(prevState => prevState < row - 1 ? prevState + 1 : prevState);
                break;
            default:
                break;
        }
    }

    return (
        <>
            <NumberBox>
                <Number>
                    Row: { cursorRow }
                </Number>
                <Number>
                    Column: { cursorColumn }
                </Number>
            </NumberBox>
            <Form>
                <FormTable onKeyDown={onKeyDown}>
                    <Thead>
                        <Tr>
                            <Th>
                                월
                            </Th>    
                            <Th>
                                일
                            </Th>    
                            <Th>
                                제목
                            </Th>    
                            <Th>
                                내용
                            </Th>    
                            <Th>
                                급여
                            </Th>    
                        </Tr>
                    </Thead>
                    <Tbody>
                        {
                            newRefs.map((refs: any, row: number) => 
                                <Tr key={row}>
                                    {
                                        refs.map((ref: any, column: number) => 
                                            <Td key={column}>
                                                <FormInput 
                                                    type={'text'} 
                                                    ref={newRefs[row][column]}
                                                    onClick={() => {}}
                                                    onFocus={() => {
                                                        console.log("on Focus: ", row, column);
                                                        handleCursor({ row, column });
                                                    }}
                                                />
                                            </Td>
                                        )
                                    }
                                </Tr>
                            )
                        }
                    </Tbody>
                </FormTable>
            </Form>
            <Button>
                Click
            </Button>
        </>
    );

};

const NumberBox = styled.div`
    padding: 10px 0;
    text-align: right;
`;
const Number = styled.span`
    margin: 0 5px;
`;
const Form = styled.form`
    width: 100%;
`;
const FormTable = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
    border: 1px solid red;
    width: 100%;
`;

const Thead = styled.thead`

`;
const Tbody = styled.tbody`

`;
const Tr = styled.tr`

`;
const Th = styled.th`

`;
const Td = styled.td`

`;
const FormInput = styled.input`
    width: 100%;
    padding: 5px 10px;
    box-sizing: border-box;
`;
const Button = styled.button`

`;
export default Table;