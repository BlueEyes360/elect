import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';
import ListGroup from "react-bootstrap/ListGroup";
import splash from '../../assets/ELECT-Splash_v1_1.png';
import fluid from '../../assets/elections.jpg';
import './Home.css';

class Home extends React.Component {

  constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            address: null,
        }
        this.return_data = this.return_data.bind(this);
    }


    return_data = () => {
        let data = { address: this.input.value }
        this.props.return_data(data);
    }

    render () {
        return(
            <>
                
            <Image src={fluid} className="fluid" style={{"margin": "0px", "padding": "0px", "border": "0"}} thumbnail/>
            {/* <Image src={splash} style={{"backgroundColor": "transparent", "border": "0"}} thumbnail /> */}
            {/* <Image src={splash} className="splash" thumbnail /> */}
            <div style={{"margin": "0px", "padding": "0px", "border": "0"} } class="upcoming">
            <Col xs="12" xl="12" style={{"font-family": "Times New Roman, Times, serif"}}>
                    <Form>
                        <Form.Label>Enter address to check</Form.Label>
                        <Form.Control type="address" placeholder="113 Example Lane Richland WA 99354" value={this.state.address} onChange={this.return_data} ref={(i) => this.input = i} />
                    </Form>
            </Col>
                		<h4>Upcoming Events</h4>
						
					</div>
            <div class="footer-copy">
              	<p>&copy; 2020 Election. All rights reserved | Design by <a href="http://elect.com">Elect</a></p>
			</div>

            </>
        )
    }
}

export default Home;