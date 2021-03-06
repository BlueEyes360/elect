import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {GOOGLE_CIVIC_API_KEY} from '../../API_keys';


class UpcomingElections extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            elections: []
        }
    }

    componentDidMount() {
        let url = "https://www.googleapis.com/civicinfo/v2/elections?key=" + GOOGLE_CIVIC_API_KEY
        fetch(url)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    elections: result["elections"]
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
        const { error, isLoaded, elections } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                    {elections.map(election => (
                        <Col xs={12} xl={12}>
                            <Card className="card_layout">
                                {/* <Card.Image variant="top" src={} /> */}
                                <Card.Body>
                                    <Card.Header className="card_h">
                                        <Card.Title>{election.name}</Card.Title>
                                        <Card.Subtitle>{election.electionDay}</Card.Subtitle>
                                    </Card.Header>
                                    <Card.Text className="card_t"> 
                                        <p style={{"margin-bottom": "0px"}}>{election.id}</p>
                                        <p style={{"margin-bottom": "0px"}}>{election.ocdDivisionId}</p>
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

export default UpcomingElections;