import React, {useState} from 'react';
import { useEffect } from 'react';
import {Link} from 'react-router-dom';

export default function Home(){
    const [totalThreads, setTotalThreads] = useState(0); 
    const [totalThreadFamilies, setTotalThreadFamilies] = useState(0);

    useEffect(() => {
        async function fetchAndSetCounts() {
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
        }
        fetchAndSetCounts();
    }, []);

    return (
        <div>
            <div className='header-container'>
                <h1>ThreadFinder</h1>
            </div>
            <div className='description-container'>
                <p>Search through { (totalThreads > 0) ? totalThreads: "many"} different threads and { (totalThreadFamilies > 0) ? totalThreadFamilies: ""} thread types to find the right one for your project.</p>
            </div>
            <div className='search-container'>
                <form className='search-form'>
                    <div>
                        <input type='text' id='search-term' className='search-form-element' />
                    </div>
                    <div>
                        <button type='submit' className='search-form-element' >Search</button>
                    </div>
                    <div>
                        <Link to="/advanced">
                            <button type='button' className='search-form-element'>Advanced search</button>
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}