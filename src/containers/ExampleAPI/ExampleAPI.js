import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {GOOGLE_CIVIC_API_KEY} from '../../API_keys';

class ExampleAPI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            election: null,
            pollingLocations: null,
            contests: null,
            state: null
        }
    }

    // Example of an API Call
    componentDidMount() {
        let address = "1900 Stevens Dr. Richland WA"

        let url = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=" + GOOGLE_CIVIC_API_KEY + "&address=" + address.replace(" ", "%20") + "&electionId=2000"

        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    election: result["election"],
                    pollingLocations: result["pollingLocations"],
                    contests: result["contests"],
                    state: result["state"]
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
        const { error, isLoaded, contests } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    {contests.map((contest, i) => (
                        <Col xs={12} xl={12}>
                            <Card>
                                {/* <Card.Image variant="top" src={} /> */}
                                <Card.Body>
                                    <Card.Header>
                                        <Card.Title>{contest.office}</Card.Title>
                                        <Card.Subtitle>{contest.district.name}</Card.Subtitle>
                                    </Card.Header>
                                    <Card.Text>
                                        <Card.Text>{contest.type}</Card.Text>
                                        <Card.Text>{contest.district.scope}</Card.Text>
                                        <ListGroup>
                                            {(contests[i].candidates !== undefined) && contests[i].candidates.map(candidate => (
                                                <ListGroup.Item>
                                                    <p>{candidate.name}</p>
                                                    <p>{candidate.party}</p>
                                                </ListGroup.Item>
                                            ))}
                                        </ListGroup>
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

export default ExampleAPI;