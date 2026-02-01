import React from 'react';
import {useUnit} from '../contexts/UnitContext.jsx';
import '../styles/UnitsToggle.css';

export default function UnitsToggle() {
    const {unit, toggleUnit} = useUnit();

    const handleClick = () => {
        toggleUnit();
    };

    return (
        <div id='unit-toggle' className='unit-toggle-container container'>
            <div className='unit-container icon-container'>
                <img src='/24-tape_measure.svg' alt='Tape measure icon.' className='icon'/>
            </div>
            <div className='unit container unit-container' onClick={handleClick}>
                <span className='unit-name'>{unit}</span>
            </div>
        </div>
    );
}



// export default function UnitsToggle() {
//     const { unit, toggleUnit } = useUnit();

//     return (
//         <div id='unit-toggle' className='unit-toggle-container container'>
//             <div className='unit-container icon-container'>
//                 <img src='/24-tape_measure.svg' alt='Tape measure icon.' className='icon'/>
//             </div>
//             <div className='unit container unit-container' onClick={toggleUnit}>
//                 <span className='unit-name'>{(unit) ? 'mm' : 'inch'}</span>
//             </div>
//         </div>
//     );
// }