import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Col from 'react-bootstrap/Col';

import {GOOGLE_CIVIC_API_KEY} from '../../API_keys';

class LocalContests extends Component {
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

    componentDidMount() {
        let address = "1900 Stevens Dr. Richland WA"

        let url = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=" + GOOGLE_CIVIC_API_KEY + "&address=" + address.replace(" ", "%20") + "&electionId=2000"

        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    contests: result["contests"],
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
                                    { contest.type === "General" &&
                                        <>
                                            <Card.Header>
                                                <Card.Title>{contest.office}</Card.Title>
                                                <Card.Subtitle>{contest.district.name}</Card.Subtitle>
                                            </Card.Header>
                                            <Card.Text>
                                                <Card.Text>{contest.type} {contest.district.scope}</Card.Text>
                                                <ListGroup>
                                                    {(contests[i].candidates !== undefined) && contests[i].candidates.map(candidate => (
                                                        <ListGroup.Item>
                                                            <p>{candidate.name}</p>
                                                            <p>{candidate.party}</p>
                                                        </ListGroup.Item>
                                                    ))}
                                                </ListGroup>
                                            </Card.Text>
                                        </>
                                    }
                                    { contest.type === "Referendum" &&
                                        <>
                                            <Card.Header>
                                                <Card.Title>{contest.referendumTitle}</Card.Title>
                                                <Card.Subtitle>{contest.district.name} {contest.district.scope}</Card.Subtitle>
                                            </Card.Header>
                                            <Card.Text>{contest.referendumUrl}</Card.Text>
                                            <Card.Text>Source: {contest.sources[0].name}</Card.Text>
                                        </>
                                    }
                                    { contest.type === "primary" &&
                                        <>
                                            <Card.Header>
                                                <Card.Title>{contest.office}</Card.Title>
                                                <Card.Subtitle>{contest.type} {contest.district.name}</Card.Subtitle>
                                            </Card.Header>
                                            <Card.Text>{contest.referendumUrl}</Card.Text>
                                            <ListGroup>
                                                {(contests[i].candidates !== undefined) && contests[i].candidates.map(candidate => (
                                                    <ListGroup.Item>
                                                        {candidate.photoUrl && <Card.Img variant="top" src={candidate.photoUrl} />  }
                                                        <p>{candidate.name}</p>
                                                        <p>{candidate.party}</p>
                                                    </ListGroup.Item>
                                                ))}
                                            </ListGroup>
                                            <Card.Text>Source: {contest.sources[0].name}</Card.Text>
                                        </>
                                    }
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </>
            );
        }
    }
}

export default LocalContests;