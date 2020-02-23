import React, { Component } from 'react';
import Card from 'react-bootstrap/Card';

import LocalRepNews from '../LocalRepresentatives/LocalRepNews/LocalRepNews';
import SupportedBills from '../HouseMembers/SupportedBills';
import Votes from '../HouseMembers/Votes';
import Travel from '../HouseMembers/Travel';
import Statements from '../HouseMembers/Statements';
import Accordion from 'react-bootstrap/Accordion'

class Representative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberId: null
        }
    }

    render() {
        return (
            <Accordion>
                <Card>
                    <Card.Header>
                        <Card.Img variant="Top" src="" />
                        <Card.Title>{this.props.name}</Card.Title>
                        <Card.Subtitle>{this.props.data.title}</Card.Subtitle>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>{this.props.data.office}</Card.Text>
                        <Card.Text>{this.props.data.url}</Card.Text>
                        <Card.Text>{this.props.data.phone}</Card.Text>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title>Voting Record</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Text>Total Votes: {this.props.data.total_votes}</Card.Text>
                        <Card.Text>Missed Votes: {this.props.data.missed_votes}</Card.Text>
                        <Card.Text>Votes with Party: {this.props.data.votes_with_party_pct}%</Card.Text>
                        <Card.Text>Votes against Party: {this.props.data.votes_against_party_pct}%</Card.Text>
                        <Card.Header>
                            <Accordion.Toggle as={Card.Text} variant="link" eventKey="4">
                                Votes
                            </Accordion.Toggle>
                            <Accordion.Collapse eventKey="4">
                                <Votes id={this.props.id} />
                            </Accordion.Collapse>
                        </Card.Header>
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="0">
                            Statements
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="0">
                        <Statements id={this.props.id} />
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="1">
                            Bills Supported
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <SupportedBills id={this.props.id} />
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="2">
                            Travel
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="2">
                        <Travel id={this.props.id} />
                    </Accordion.Collapse>
                </Card>
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Card.Header} variant="link" eventKey="3">
                            News Articles
                        </Accordion.Toggle>
                    </Card.Header>
                    <Accordion.Collapse eventKey="3">
                        <LocalRepNews name={this.props.name} />
                    </Accordion.Collapse>
                </Card>
            </Accordion>
        );
    }
}

export default Representative;