import React from 'react';
import {useUnit} from '../contexts/UnitContext.jsx';
import "../styles/ResultsCard.css";


export default function ResultCard({thread}) {
    return (
        <div className='thread-card card'>
            <div className='thread-title title-container'>
                <h3>{`${thread.name} ${thread.family.name ?? ''}`}</h3>
                {thread.family.fullName && <h4>{thread.family.fullName}</h4>}
            </div>
            <div className='details thread-details details-container'>
                <MeasurementRow title="Outer Diameter" measurement={thread.outerDiameter} />
                <MeasurementRow title="Inner Diameter" measurement={thread.innerDiameter} />
                <MeasurementRow title="Tap Drill Diameter" measurement={thread.tap} />
                <MeasurementRow title="Clearance Drill Diameter" measurement={thread.clearance} />
            </div>
        </div>
    )
}

function MeasurementRow({title, measurement}) {
    const {unit} = useUnit();

    if (!measurement || isNaN(measurement)) {
        return null;
    }

    return (
        <div className='measurement-row measurement-container'>
            <div className='measurement-title-container'>
                <h5 className='measurement-title'>{title}</h5>
            </div>
            <div className='measurement-value-container'>
                <p className='measurement-value'>
                    {(unit === 'mm') ? measurement : (measurement / 25.4)}
                </p>
            </div>
        </div>
        
    );

}