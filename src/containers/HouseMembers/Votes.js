import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';

import {PROPUBLICA_API_KEY} from '../../API_keys';

class Votes extends Component {

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
        let url = "https://api.propublica.org/congress/v1/members/" + member_id + "/votes.json"
        
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
                    results: result["results"][0]["votes"]
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
                    <Card className="card_layout">
                        <Card.Body>
                                <Card.Header  className="card_h" style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>
                                {<Card.Title>{"Bill: " + result.bill.title}</Card.Title> }
                                <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{result.description}</Card.Text>
                                <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"Latest Action: " + result.bill.latest_action}</Card.Text>
                                <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"Position: Voted " + result.position}</Card.Text>
                                <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"Result: " + result.result + " on " + result.date}</Card.Text>
                            </Card.Header>
                        </Card.Body>
                    </Card>
                ))}
                </>
            );
        }
    }
}

export default Votes;