/**Context description:
 * The UnitContext is a boolean value.
 * This represents whetehr to show data as stored on the server or convert to inches.
 * 
 * At a basic level:
 * - True: MM
 * - False: Inches
 */

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