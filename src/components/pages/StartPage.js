import React, { useState } from 'react';
import Header from './Header';
import Hero from './Hero';
const StartPage = () => {
    const [isAdmin] = useState(true);
    return (
        <div>
            {<Header isAdmin={isAdmin} />}
            {<Hero />}
        </div>
    );
};

export default StartPage;
