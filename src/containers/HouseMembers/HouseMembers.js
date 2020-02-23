import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import Modal from "react-bootstrap/Modal";
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';

import {PROPUBLICA_API_KEY} from '../../API_keys';

import Representative from '../Representative/Representative';

class HouseMembers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            election: null,
            pollingLocations: null,
            results: null,
            state: null,
            show: false,
            name: "",
            id_num: "",
        }
        this.showModal = this.showModal.bind(this);
        this.handleClose = this.handleClose.bind(this);
        this.handleOpen = this.handleOpen.bind(this);
    }

    handleClose = () => {
        this.setState({show: false})
    }

    handleOpen = () => {
        this.setState({show: true})
    }

    showModal = (first_name, last_name, id) => {
        let cand_data = ""
        let full_name = first_name + " " + last_name;
        this.setState({name: full_name, id_num: id});
        for (var i=0; i < this.state.results.length; i++) {
            if (this.state.results[i].id === id) {
                cand_data = this.state.results[i];
            }
        }
        this.handleOpen()
        this.modal = (
            <>
                <Modal show={true}>
                    <Modal.Body>
                        {this.state.id_num !== "" && this.state.name !== "" && <Representative id_num={this.state.id_num} name={this.state.name} data={cand_data} />}
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="primary" onClick={this.handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </>
        )
    }

    modal = (<>
            </>)

    // Example of an API Call
    componentDidMount() {
        let category = "Politics"
        let senate_count = "116"
        let sitting = "house"
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
                {this.state.show === true && this.modal}
                {results.map((result, i) => (
                    <Col xs={12} xl={12}>
                        <Card className="card_layout" onClick={() => this.showModal(result.first_name, result.last_name, result.id)}>
                            <Card.Body>
                                <Card.Header style={{ 'border-width': 'thin'}}>
                                    {<Card.Title>{result.title + " " + result.first_name + " " + result.last_name}</Card.Title> }
                                    <Card.Text className="card_t">
                                        {result.party === "D" && <Card.Text style={{"margin-bottom": "0px"}}>Democrat</Card.Text>}
                                        {result.party === "R" && <Card.Text style={{"margin-bottom": "0px"}}>Republican</Card.Text>}
                                        <Card.Text style={{"margin-bottom": "0px"}}>{"ID: " + result.id}</Card.Text>
                                        <Card.Text style={{"margin-bottom": "0px"}}>{"Facebook: " + result.facebook_account}</Card.Text>
                                        <Card.Text style={{"margin-bottom": "0px"}}>{result.url}</Card.Text>
                                        <Card.Text style={{"margin-bottom": "0px"}}>{result.state}</Card.Text>
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

export default HouseMembers;