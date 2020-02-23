import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {GOOGLE_CIVIC_API_KEY} from '../../API_keys';

class LocalRepresentatives extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            representatives: null,
            offices: null
        }
    }

    // Example of an API Call
    componentDidMount() {
        let address = "1900 Stevens Dr. Richland WA"

        if (this.props.address !== null) {
            address = this.props.address
        }

        let url = "https://www.googleapis.com/civicinfo/v2/representatives?key=" + GOOGLE_CIVIC_API_KEY + "&address=" + address.replace(" ", "%20")

        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    representatives: result["officials"],
                    offices: result["offices"],
                });
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                });
            }
        )
    }

    render() {
        const { error, isLoaded, representatives, offices } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    {representatives.map((rep, i) => (
                        <Col xs={12} xl={12}>
                            <Card className="card_layout">
                                <Card.Header>
                                    { "photoUrl" in rep === true && <Card.Img className="card_img" style={{"border-radius": "10px"}} variant="top" src={rep.photoUrl} /> }
                                    <Card.Title>{rep.name}</Card.Title>
                                    { offices[i] !== undefined && <Card.Subtitle>{offices[i].name}</Card.Subtitle>}
                                    <Card.Subtitle>{rep.party}</Card.Subtitle>
                                </Card.Header>
                                <Card.Body >
                                    <Card.Text className="card_t">
                                        { rep.address !== undefined &&
                                            <Card.Text className="card_t" style={{"margin-bottom": "0px"}}>{rep.address[0].line1}
                                                <Card.Text className="card_t" style={{"margin-bottom": "0px"}}>{rep.address[0].line2}</Card.Text>
                                                <Card.Text className="card_t" style={{"margin-bottom": "0px"}}>{rep.address[0].line3}</Card.Text>
                                                <Card.Text className="card_t" style={{"margin-bottom": "0px"}}>{rep.address[0].city} {rep.address[0].state}</Card.Text>
                                            </Card.Text>
                                        }
                                        { rep.urls !== undefined && <Card.Text style={{"margin-bottom": "0px"}}><a href={rep.urls[0]}> {rep.urls[0]} </a> </Card.Text> }
                                        { rep.phones !== undefined && <Card.Text style={{"margin-bottom": "0px"}}> {rep.phones[0]} </Card.Text> }
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                    <div class="footer-copy">
              	<p>&copy; 2020 Election. All rights reserved | Design by <a href="http://smart-elect.info">Elect</a></p>
			</div>
                </>
            );
        }
    }
}
export default LocalRepresentatives;