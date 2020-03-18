import React, { useState } from 'react';

interface IContext {
    isLoggedIn: boolean;
    table: Array<ITable>;
    handleToggleLogged: () => any;
    handleCreateTable: (newTable: ITable) => void;
    handleDeleteTable: (deleteIndex: number) => void;
}

const InitContext: IContext = {
    isLoggedIn: false,
    table: [],
    handleToggleLogged: () => {},
    handleCreateTable: () => {},
    handleDeleteTable: () => {}
}

const AppContext: React.Context<IContext> = React.createContext(InitContext);

const useAppContext = () => React.useContext(AppContext);

const useFetch = (): { value: IContext } => {

    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
    const [table, setTable] = useState<Array<ITable>>([]);
    const handleToggleLogged = () => {
        setIsLoggedIn(!isLoggedIn);
    }

    const handleCreateTable = (newTable: ITable) => {
        setTable([ ...table, newTable ]);
    }
    
    const handleDeleteTable = (deleteIndex: number) => {
        const tables = table.filter((_, key) => key !== deleteIndex);
        setTable([ ...tables ]);
    }

    return {
        value: {
            isLoggedIn,
            table,
            handleToggleLogged,
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