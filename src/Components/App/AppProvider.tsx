import React, { useState } from 'react';

interface IContext {
    table: Array<ITable>
    handleCreateTable: (newTable: ITable) => void;
    handleDeleteTable: (deleteIndex: number) => void;
}

const InitContext: IContext = {
    table: [],
    handleCreateTable: () => {},
    handleDeleteTable: () => {}
}

const AppContext: React.Context<IContext> = React.createContext(InitContext);

const useAppContext = () => React.useContext(AppContext);

const useFetch = (): { value: IContext } => {
    
    const [table, setTable] = useState<Array<ITable>>([]);
    
    const handleCreateTable = (newTable: ITable) => {
        setTable([ ...table, newTable ]);
    }
    
    const handleDeleteTable = (deleteIndex: number) => {
        const tables = table.filter((_, key) => key !== deleteIndex);
        setTable([ ...tables ]);
    }

    return {
        value: {
            table,
            handleCreateTable,
            handleDeleteTable
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