import React, {useTransition, useEffect} from 'react';
import {useSearchParams} from 'react-router';

/**
 * ThreadResults component has a specified endpoint to call passed in at the point it's rendered
 * This will be called along with any search parameters to filter down/query the search
 */

export default function ThreadResults({endpoint}) {

    // const [searchParams, setSearchParams] = useSearchParams();



    // searchParams.keys().forEach((param) => console.log(param));

    // console.log(searchParams.keys().contains("q"));

    return (
        <div className='results-page page' id='results-page'>
            <div className='title-container'>
                <h1>Results</h1>
            </div>
            <div className='results-container container'>
                
                
            </div>

        </div>
    );
}