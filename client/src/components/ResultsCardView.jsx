import React from 'react';
import ResultCard from './ResultCard';
import "../styles/ResultsCardView.css";

export default function ResultsCardView({results}) {
    return (
        <div className='card-view-container results-view'>
            { results.data &&
                results.data.map((thread, i) => {
                    return (<ResultCard thread={thread} key={i}/>)
                })
            }
        </div>
    );
}