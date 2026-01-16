import React, {useState} from 'react';
import '../styles/UnitsToggle.css';

export default function UnitsToggle({unitState, setUnitState}) {
    const [unit, setUnit] = useState(false);

    const handleClick = () => {
        setUnit(!unit);
    };

    return (
        <div id='unit-toggle' className='unit-toggle-container container'>
            <div className='unit-container icon-container'>
                <img src='/24-tape_measure.svg' alt='Tape measure icon.' className='icon'/>
            </div>
            <div className='unit container unit-container' onClick={handleClick}>
                <span className='unit-name'>{(unit) ? 'mm' : 'inch'}</span>
            </div>
        </div>
    );
}