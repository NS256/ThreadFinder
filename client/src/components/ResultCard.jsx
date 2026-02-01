import React from 'react';
import {useUnit} from '../contexts/UnitContext.jsx';
import "../styles/ResultsCard.css";


export default function ResultCard({thread}) {
    return (
        <div className='thread-card card'>
            <div className='thread-title title-container card-inner'>
                <h3>{`${thread.name} ${thread.family.name ?? ''}`}</h3>
                {thread.family.fullName && <h4 className='thread-family-subtitle'>{thread.family.fullName}</h4>}
            </div>
            <div className='details thread-details details-container card-inner'>
                <MeasurementRow title="Outer Diameter" measurement={thread.outerDiameter} defaultUnit={thread.family.defaultUnit}/>
                <MeasurementRow title="Inner Diameter" measurement={thread.innerDiameter} defaultUnit={thread.family.defaultUnit}/>
                <MeasurementRow title="TPI" measurement={thread.tpi} convertValues={false} defaultUnit={thread.family.defaultUnit}/>
                <MeasurementRow title="Tap Drill Diameter" measurement={thread.tap} defaultUnit={thread.family.defaultUnit}/>
                <MeasurementRow title="Clearance Drill Diameter" measurement={thread.clearance} defaultUnit={thread.family.defaultUnit}/>
            </div>
        </div>
    )
}

function MeasurementRow({title, measurement, defaultUnit, convertValues=true}) {
    //unit is boolean - true for metric, false for imperial

    // Commenting out unit to test
    const {unit} = useUnit();

    // console.log(`${title}: convertValues=${convertValues}, unit=${unit}, measurement=${measurement}`);

    if (!measurement || isNaN(measurement)) {
        return null;
    }

    return (
        <div className='measurement-row'>
            <div className='measurement-title-container measurement-container'>
                <h5 className='measurement-title'>{title}:</h5>
            </div>
            <div className='measurement-value-container measurement-container'>
                <p className='measurement-value'>
                    {/* Commenting out original flow to test new options */}
                    {/* {convertValues ? (unit ? measurement : (measurement / 25.4).toFixed(4)) : measurement} */}

                    {/* Trialling displaying default unit symbols instead */}
                    {( unit === defaultUnit || !convertValues ) ? measurement : measurement * (unit === 'mm' ? 25.4 : 0.0393700787 )}
                    {`${convertValues ? (defaultUnit === 'inch' ? '"' : 'mm') : ''}`}

                </p>
            </div>
        </div>
        
    );

}