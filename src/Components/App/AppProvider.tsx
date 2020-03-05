import React, { useState } from 'react';

interface IContext {
    table: Array<ITable>
    handleTable: (neTable: ITable) => void;
}

const InitContext: IContext = {
    table: [],
    handleTable: () => {},
}

const AppContext: React.Context<IContext> = React.createContext(InitContext);

const useAppContext = () => React.useContext(AppContext);

const useFetch = (): { value: IContext } => {
    
    const [table, setTable] = useState<Array<ITable>>([]);

    const handleTable = (newTable: ITable) => {
        setTable([ ...table, newTable ]);
    }

    return {
        value: {
            table,
            handleTable
        }
    };
};

const AppProvider: React.FC<any> = ({
    children
}) => (
    <AppContext.Provider { ...useFetch() }>
        {
            children
        }
    </AppContext.Provider>
);

export { useAppContext };
export default AppProvider;