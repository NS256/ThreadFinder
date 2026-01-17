import React, { createContext, useContext, useState } from 'react';

const UnitContext = createContext();

export const UnitContextProvider = ({children}) => {
    const [unit, setUnit] = useState(false);

    const toggleUnit = () => setUnit((prev) => !prev);

    return (
        <UnitContext.Provider value={{unit, toggleUnit}}>
            {children}
        </UnitContext.Provider>
    );
};

export const useUnit = () => useContext(UnitContext);   