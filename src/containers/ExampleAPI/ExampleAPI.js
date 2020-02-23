import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {PROPUBLICA_API_KEY} from '../../API_keys';

class ExampleAPI extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            name: null,
            supported_bills: null,
            results: null,
            state: null
        }
    }

    // Example of an API Call
    componentDidMount() {
        let member_id = "K000388"
        let url = "https://api.propublica.org/congress/v1/members/" + member_id + "/private-trips.json"
        
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
                    results: result["results"]
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
                                    {<Card.Title>{result.destination}</Card.Title> }
                                    <Card.Text>{"Travel Times: " + result.departure_date + " to " + result.return_date}</Card.Text>
                                    <Card.Text>{"Sponsor: " + result.sponsor}</Card.Text>
                                    <Card.Text>{"Pdf link: " + result.pdf_url}</Card.Text>
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

export default ExampleAPI;