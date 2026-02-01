/**Context description:
 * 
 * Unit can be set to either inch or mm
 * 
 * LEGACY INFORMATION
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
    const [unit, setUnit] = useState('inch');

    const toggleUnit = () => setUnit((prev) => (prev === 'inch' ? 'mm' : 'inch'));

    return (
        <UnitContext.Provider value={{unit, toggleUnit}}>
            {children}
        </UnitContext.Provider>
    );
};

export const useUnit = () => useContext(UnitContext);   