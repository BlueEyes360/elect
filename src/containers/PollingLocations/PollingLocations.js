import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';

import {GOOGLE_CIVIC_API_KEY} from '../../API_keys';

class PollingLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            pollingLocations: null,
        }
    }

    componentDidMount() {
        let address = "1900 Stevens Dr. Richland WA"

        let url = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=" + GOOGLE_CIVIC_API_KEY + "&address=" + address.replace(" ", "%20") + "&electionId=2000"

        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    pollingLocations: result["pollingLocations"],
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
        const { error, isLoaded, pollingLocations } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    {pollingLocations.map((loc, i) => (
                        <Col xs={12} xl={12}>
                            <Card>
                                <Card.Body>
                                    <Card.Header>
                                        <Card.Title>{loc.address.locationName}</Card.Title>
                                        <Card.Subtitle>{loc.address.line1}</Card.Subtitle>
                                        <Card.Text>{loc.address.city && loc.address.state && loc.address.zip}</Card.Text>
                                    </Card.Header>
                                    <Card.Text>
                                        <Card.Text>{loc.pollingHours}</Card.Text>
                                        <Card.Text>{loc.notes}</Card.Text>
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

export default PollingLocations;