import React from 'react';
import {Link} from 'react-router-dom';

export default function Home(){
    return (
        <div>
            <div className='header-container'>
                <h1>ThreadFinder</h1>
            </div>
            <div className='description-container'>
                
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