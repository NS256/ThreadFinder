import React, {useTransition, useEffect, useState} from 'react';
import {useSearchParams} from 'react-router';
import { Loading } from './DynamicSymbols';
import ResultsCardView from './ResultsCardView';
import '../styles/ThreadResults.css';

/**
 * ThreadResults component has a specified endpoint to call passed in at the point it's rendered
 * This will be called along with any search parameters to filter down/query the search
 */

export default function ThreadResults({endpoint}) {

    let [searchParams, setSearchParams] = useSearchParams();

    const [ isPending, startFetch ] = useTransition();
    const [ threads, setThreads ] = useState({});

    useEffect(() => {
        const queryParams = searchParams.toString();
        startFetch(async () => {
            const threadResponse = await fetch(`${endpoint}${(queryParams.length > 0)? ("?" + queryParams) : "" }`);
            const threads = await threadResponse.json();
            console.log(threads);
            setThreads(threads);
        });
    }, [endpoint, searchParams, startFetch]);

    return (
        <div className='results-page page' id='results-page'>
            <div className='title-container'>
                <h2 className='results-title'>Results</h2>
            </div>
            <div className='results-container container'>
                { isPending && <Loading id="results-loading"/> }
                { !isPending && <ResultsCardView results={threads} />}
            </div>
        </div>
    );
}