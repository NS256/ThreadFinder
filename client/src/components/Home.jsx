import React, {useState} from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';
import '../styles/Home.css';
import UnitsToggle from './UnitsToggle';

export default function Home(){
    const [totalThreads, setTotalThreads] = useState(0); 
    const [totalThreadFamilies, setTotalThreadFamilies] = useState(0);
    // const [units, setUnits] = useState('inch');

    const searchPlaceHolders = [
        "3/16 BSW",
        "0.875",
        "Cycle Thread",
        "M10"
    ]
    const [searchPlaceholderIndex, setSearchPlaceHolderIndex] = useState(1);

    //update the referenced placeholder index every 3 seconds
    setTimeout(() => {
        //if the chosen index is the last available one, reset to 0
        if (searchPlaceholderIndex === (searchPlaceHolders.length - 1)) {
            setSearchPlaceHolderIndex(0);
        } else {
            setSearchPlaceHolderIndex(searchPlaceholderIndex + 1);
        }
        
    },2500);




    useEffect(() => {
        (async () => {
            try {
                const res = await fetch('/api/1/threads/count');
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                if (data.status === 'success') {
                    setTotalThreads(data.counts.totalThreads || 0);
                    setTotalThreadFamilies(data.counts.totalThreadFamilies || 0);
                } else {
                    console.warn('Counts API returned non-success', data);
                }
            } catch (err) {
                console.error('Failed to load counts', err);
            }
        })();
    }, []);

    return (
        <div id='homepage'>
            <div className='title-container'>
                <h1>ThreadFinder</h1>
            </div>
            <div className='description-container'>
                <p>Search { (totalThreads > 0) ? totalThreads: "many"} threads and { (totalThreadFamilies > 0) ? totalThreadFamilies: ""} thread types to find the right one for your project.</p>
            </div>
            <div className='search-container'>
                <form className='search-form' method='get' action="/search">
                    <div>
                        <input type='text' id='search-term' className='search-form-element' placeholder={searchPlaceHolders[searchPlaceholderIndex]} name="q" />
                    </div>
                    {/* <div>
                        <input type="radio" name='unit' id='imperial' value='Imperial'/>
                        <label for='imperial' className='radio-label'>Imperial</label>
                        <input type="radio" name='unit' id='metric' value='Metric'/>
                        <label for='metric' className='radio-label'>Metric</label>
                    </div> */}
                    
                    <div>
                        <button type='submit' className='search-form-element' >Search</button>
                    </div>
                    <div>
                        <Link to="/advanced">
                            <button type='button' className='search-form-element'>Advanced search</button>
                        </Link>
                    </div>
                    <div>
                        <Link to="/all">
                            <button type='button' className='search-form-element secondary'>View all</button>
                        </Link>
                    </div>
                    <UnitsToggle />
                </form>
            </div>
        </div>
    );
}