import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {GOOGLE_CIVIC_API_KEY} from '../../API_keys';

import ballot from '../../assets/ballot.png';

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
                            <Card>
                                <Card.Header>
                                    { "photoUrl" in rep === true && <Card.Img variant="top" src={rep.photoUrl} /> }
                                    <Card.Title>{rep.name}</Card.Title>
                                    { offices[i] !== undefined && <Card.Subtitle>{offices[i].name}</Card.Subtitle>}
                                    <Card.Subtitle>{rep.party}</Card.Subtitle>
                                </Card.Header>
                                <Card.Body>
                                    <Card.Text>
                                        { rep.address !== undefined &&
                                            <Card.Text>{rep.address[0].line1} 
                                                <Card.Text>{rep.address[0].line2}</Card.Text>
                                                <Card.Text>{rep.address[0].line3}</Card.Text>
                                                <Card.Text>{rep.address[0].city} {rep.address[0].state}</Card.Text>
                                            </Card.Text>
                                        }
                                        { rep.urls !== undefined && <Card.Text> {rep.urls[0]} </Card.Text> }
                                        { rep.phones !== undefined && <Card.Text> {rep.phones[0]} </Card.Text> }
                                        {/* <ListGroup>
                                            {(representatives[i].candidates !== undefined) && representatives[i].candidates.map(candidate => (
                                                <ListGroup.Item>
                                                    <p>{candidate.name}</p>
                                                    <p>{candidate.party}</p>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup> */}
                                    </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </>
            );
        }
    }
}
export default LocalRepresentatives;