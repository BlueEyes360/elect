import React from 'react';

import Image from 'react-bootstrap/Image';

import splash from '../../assets/ELECT-Splash_v1_1.png';

import './Home.css';

const Home = (props) => {

    return(
        <>
            <Image src={splash} style={{"backgroundColor": "transparent", "border": "0"}} thumbnail />
            <Image src={splash} className="splash" thumbnail />
        </>
    )
}

export default Home;