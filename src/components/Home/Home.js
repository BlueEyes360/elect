import React from 'react';

import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Image from 'react-bootstrap/Image';

import splash from '../../assets/ELECT-Splash_v1_1.png';

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
                <Col xs="12" xl="12">
                    <Form>
                        <Form.Label>Enter address to check</Form.Label>
                        <Form.Control type="address" placeholder="113 Example Lane Richland WA 99354" value={this.state.address} onChange={this.return_data} ref={(i) => this.input = i} />
                    </Form>
                </Col>

                <Image src={splash} className="splash" thumbnail />
            </>
        )
    }
}

export default Home;