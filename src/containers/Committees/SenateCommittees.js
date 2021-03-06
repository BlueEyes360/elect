import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {PROPUBLICA_API_KEY} from '../../API_keys';

class SenateCommittees extends Component {

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
        let congress = "115"
        let chamber = "senate"

        let url = "https://api.propublica.org/congress/v1/" + congress + "/" + chamber + "/committees.json"
        
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
                    results: result["results"][0]["committees"]
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
                        <Card className="card_layout">
                            <Card.Body>
                                 <Card.Header className="card_h" style={{"border-style":"solid"}}>
                                    {<Card.Title style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"Committee: " + result.name}</Card.Title> }
                                    <Card.Text>{"Chair: " + result.chair}</Card.Text>
                                    {result.chair_party === "D" && <Card.Text>Democrat</Card.Text>}
                                    {result.chair_party === "R" && <Card.Text>Republican</Card.Text>}
                                    <Card.Title>{"Subcommittees"}</Card.Title>
                                    <Card.Text>{result.title}</Card.Text>
                                    {results[i].subcommittees !== undefined && results[i].subcommittees.map((sub, i ) => (
                                        <Card.Text>{sub.name}</Card.Text>
                                    ))}
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

export default SenateCommittees;