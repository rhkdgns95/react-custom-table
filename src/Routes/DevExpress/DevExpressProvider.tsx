import React, { createContext, useContext } from 'react';
import service from './data';

interface IContext {
    employees: any;
    calculateCellValue: any;
}

const InitContext: IContext = {
    employees: [],
    calculateCellValue: () => {}
}

const Context: React.Context<IContext> = createContext(InitContext);

const useDevExpressContext = () => useContext(Context);

const useFetch = () => {
    const employees = service.getEmployees();
    console.log("employees: " ,employees);
    const calculateCellValue = (data) => {
        console.log("HI");
        return [data.Title, data.FirstName, data.LastName].join(' ');
    }

    return {
        value: {
            employees,
            calculateCellValue
        }
    };
};

const DevExpressProvider: React.FC<any> = ({
    children
}) => (
    <Context.Provider { ...useFetch() }>
        {
            children
        }
    </Context.Provider>
);

export { useDevExpressContext };
export default DevExpressProvider;