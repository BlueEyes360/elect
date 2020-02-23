import React, { Component } from 'react';
import Card, { CardHeader } from 'react-bootstrap/Card';

import LocalRepNews from '../LocalRepresentatives/LocalRepNews/LocalRepNews';
import SupportedBills from '../HouseMembers/SupportedBills';
import Votes from '../HouseMembers/Votes';
import Travel from '../HouseMembers/Travel';
import Statements from '../HouseMembers/Statements';

class Representative extends Component {
    constructor(props) {
        super(props);
        this.state = {
            memberId: null
        }
    }

    render() {
        return (
            <div>
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
                        <Votes id={this.props.id} />
                    </Card.Body>
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title>Statements</Card.Title>
                    </Card.Header>
                    <Statements id={this.props.id} />
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title>Bills Supported</Card.Title>
                    </Card.Header>
                    <SupportedBills id={this.props.id} />
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title>Travel</Card.Title>
                    </Card.Header>
                    <Travel id={this.props.id} />
                </Card>
                <Card>
                    <Card.Header>
                        <Card.Title>News Articles</Card.Title>
                    </Card.Header>
                    <LocalRepNews name={this.props.name} />
                </Card>
            </div>
        );
    }
}

export default Representative;