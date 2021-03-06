import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';

import {PROPUBLICA_API_KEY} from '../../API_keys';
class Statements extends Component {

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
        let member_id = "C001084"
        let congress = "115"

        let url = "https://api.propublica.org/congress/v1/members/" + member_id + "/statements/" + congress + ".json"
        
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
                        <Card className="card_layout">
                            <Card.Body>
                                <Card.Header className="card_h" style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>
                                    {<Card.Title style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"Statement Type: " + result.statement_type}</Card.Title> }
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{result.date}</Card.Text>
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{result.title}</Card.Text>
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"State: " + result.state} </Card.Text>
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"Link to full statement: " + result.url} </Card.Text>
                                    {result.subjects[0] !== undefined && <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{"Subjects: " + result.subjects[0].name}</Card.Text>}
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

export default Statements;