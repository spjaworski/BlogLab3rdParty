import * as React from 'react';
import { useState, useEffect } from 'react';
import { apiService } from '../services/api-service'

const Home = (props: HomeProps) => {

    const [homeMess, setHomeMess] = useState<string>('');

    useEffect(() => {

        apiService('/api/homeTest')
            .then(data => setHomeMess(data))

        //         const TOKEN = localStorage.getItem(TOKEN_KEY);
        //         fetch('api/homeTest', {
        //             method: 'GET', 
        //             headers: {
        //                 Authorization: `Bearer ${TOKEN_KEY}`
        //             }
        //         })
        //         .then(res => res.json())
        //         .then(data => setHomeMess(data))
    }, [])

    // const defeatedBirdLogo = require('https://i2.cdn.turner.com/money/dam/assets/140327111009-wounded-twitter-bird-1024x576.png')

    return (
        <div>
            <div className='p-3 rounded-lg'>Welcome to the Blogs Lab! BTW I'm stealing the bird thing since it looks like they don't want it anymore</div>
            {/* <h1 className="text-center">Home Page</h1> */}
            {/* <img alt='logo' style={{ width: 100 }} src={String(defeatedBirdLogo)} /> */}
            {/* <div className='p-1'>*insert shitty drawing of the Twitter bird here*</div> */}
            <span style={{ fontWeight: 'bold' }}>*insert shitty bird drawing here*</span>
            {/* <div>
                <h1 className="text-center display-1">{homeMess}</h1>
            </div> */}
        </div>
    );
};

interface HomeProps { }

export default Home; 