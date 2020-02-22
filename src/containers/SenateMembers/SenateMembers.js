import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {PROPUBLICA_API_KEY} from '../../API_keys';

class SenateMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            election: null,
            pollingLocations: null,
            results: null,
            state: null
        }
    }

    // Example of an API Call
    componentDidMount() {
        let category = "Politics"
        let senate_count = "116"
        let sitting = "senate"
        let url = "https://api.propublica.org/congress/v1/" + senate_count + "/" + sitting + "/members.json"
        
        const myHeaders = new Headers({
            'X-API-Key': PROPUBLICA_API_KEY
        });

        const myRequest = new Request(url, {
            method: 'GET',
            headers: myHeaders,
        });

        fetch(myRequest)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    results: result["results"][0]["members"]
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
        const { error, isLoaded, results } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else {
            return (
                <>
                {results.map((result, i) => (
                     <Col xs={12} xl={12}>
                        <Card>
                            <Card.Body>
                                 <Card.Header>
                                     {<Card.Title>{result.title + " " + result.first_name + " " + result.last_name}</Card.Title> }
                                    <Card.Text>
                                        {result.party === "D" && <Card.Text>Democrat</Card.Text>}
                                        {result.party === "R" && <Card.Text>Republican</Card.Text>}
                                        <Card.Text>{"ID: " + result.id}</Card.Text>
                                        <Card.Text>{"Facebook: " + result.facebook_account}</Card.Text>
                                        <Card.Text>{result.url}</Card.Text>
                                        <Card.Text>{result.state}</Card.Text>
                                    </Card.Text>
                                 </Card.Header>
                             </Card.Body>
                         </Card>
                    </Col>
                ))}
                </>
            );
        }
    }
}

export default SenateMembers;