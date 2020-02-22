import React from 'react';

import Image from 'react-bootstrap/Image';
import ListGroup from "react-bootstrap/ListGroup";
import splash from '../../assets/ELECT-Splash_v1_1.png';
import fluid from '../../assets/elections.jpg';
import './Home.css';

const Home = (props) => {

    return(
        <>
        <Image src={fluid} className="fluid" style={{"margin": "0px", "padding": "0px", "border": "0"}} thumbnail/>
            {/* <Image src={splash} style={{"backgroundColor": "transparent", "border": "0"}} thumbnail /> */}
            {/* <Image src={splash} className="splash" thumbnail /> */}
            <div style={{"margin": "0px", "padding": "0px", "border": "0"} } class="upcoming">
						<h4>Upcoming Events</h4>
						
					</div>
            <div class="footer-copy">
              	<p>&copy; 2020 Election. All rights reserved | Design by <a href="http://elect.com">Elect</a></p>
			</div>
        </>
    )
}

export default Home;