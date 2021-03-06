import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';

import {PROPUBLICA_API_KEY} from '../../API_keys';

class SupportedBills extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            election: null,
            supported_bills: null,
            results: null,
            state: null
        }
    }

    // Example of an API Call
    componentDidMount() {
        let member_id = "L000287" 
        let type = "active"

        let url_bill = "https://api.propublica.org/congress/v1/members/" + member_id + "/bills/" + type + ".json"
        
        const myHeaders = new Headers({
            'X-API-Key': PROPUBLICA_API_KEY
        });

        const myRequest = new Request(url_bill, {
            method: 'GET',
            headers: myHeaders,
        });

        fetch(myRequest)
        .then(res => res.json())
        .then(
            (result) => {
                this.setState({
                    isLoaded: true,
                    results: result["results"][0]["bills"]
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
                {results.map((results, i) => (
                    <Card className="card_layout" >
                        <Card.Body>
                                <Card.Header className="card_h" style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>
                                {<Card.Title>{results.number}</Card.Title> }
                                <Card.Text>
                                    <Card.Text>{results.title}</Card.Text>
                                    <Card.Text>{"Sponsor: " + results.sponsor_name} </Card.Text>
                                    <Card.Text>{"Link to bill: " + results.congressdotgov_url} </Card.Text>
                                </Card.Text>
                            </Card.Header>
                        </Card.Body>
                    </Card>
                ))}
                </>
            );
        }
    }
}

export default SupportedBills;