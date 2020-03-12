import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const useInput = (name: string) => {
    
    const [value, setValue] = useState<string>("");

    const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const { target: { value }} = event;
        console.log("NAME: ", name);
        console.log("VALUE: ", value);
        setValue(value);
    };

    return {
        value,
        onChange
    };
};

const SampleContainer = () => (
    <SamplePresenter />
);

const SamplePresenter = () => {
    const currentMonth = new Date().getMonth() + 1;
    const [days, setDays] = useState<number>(30);

    const [arr, setArr] = useState<Array<string>>([""]);
    
    const onChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
        const { target: { value }} = event;
        console.log("select: ", value);
        setDays(parseInt(value));
    };

    useEffect(() => {
        const newArr: Array<string> = Array.from({ length: days }, () => "");
        setArr(newArr);
    }, [days]);

    return (
        <>  
            <Month>{ currentMonth }월</Month>
            <select onChange={onChange} defaultValue={days}>
                <option value={0}>0</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={30}>30</option>
            </select>
            <Form>
                {
                    arr.length > 0 && (
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>No</Th>
                                    <Th>Name</Th>
                                    <Th>Address</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    arr.map((_, key) => (
                                        <Tr key={key}>
                                            <Td>
                                                <Input name={`no-${key}`}/>
                                            </Td>
                                            <Td>
                                                <Input name={`name-${key}`}/>
                                            </Td>
                                            <Td>
                                                <Input name={`address-${key}`}/>
                                            </Td>
                                        </Tr>
                                    ))
                                }
                            </Tbody>
                        </Table>
                    )
                }
            </Form>
        </>
    );
}

const Input: React.FC<{name: string}> = ({name}) => {
    const formText = useInput(name);
    return (
        <FormInput name={name} { ...formText } />
    );
};

const Month = styled.h1``;
const Form = styled.form`

`;
const Table = styled.table`
    border-spacing: 0;
    border-collapse: collapse;
`;

const Thead = styled.thead``;
const Tbody = styled.tbody``;
const Tr = styled.tr``;
const Th = styled.th``;
const Td = styled.td``;

const FormInput = styled.input`

`;

export default SampleContainer;