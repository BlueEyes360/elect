import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import {MICROSOFT_API_KEY} from '../../API_keys';

class PoliticalNews extends Component {

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

        let url = "https://api.cognitive.microsoft.com/bing/v7.0/news/?category=" + category
        
        const myHeaders = new Headers({
            'Ocp-Apim-Subscription-Key': MICROSOFT_API_KEY
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
                    results: result["value"]
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

                        {result.ampUrl !== undefined &&
                        <a href={result.ampUrl}>
                            <Card className="card_layout">
                                { result.image !== undefined && <Card.Img variant="top" style={{"height": "350px", "width": "375px", "margin":"10px", "border-radius":"10px"}} src={result.image.thumbnail.contentUrl} /> }
                                <Card.Body>
                                    <Card.Header>
                                        {<Card.Title>{result.name}</Card.Title> }
                                        <Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.description}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.provider.name}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.datePublished}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.ampUrl}</Card.Text>
                                        </Card.Text>
                                    </Card.Header>
                                </Card.Body>
                            </Card>
                        </a>
                        }
                        {result.ampUrl === undefined && result.url !== undefined &&
                        <a href={result.url}>
                            <Card>
                                { result.image !== undefined && <Card.Img variant="top" style={{"height": "350px", "width": "375px", "margin":"10px", "border-radius":"10px"}} src={result.image.thumbnail.contentUrl} /> }
                                <Card.Body>
                                    <Card.Header>
                                        {<Card.Title>{result.name}</Card.Title> }
                                        <Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.description}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.provider.name}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.datePublished}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px"}}>{result.ampUrl}</Card.Text>
                                        </Card.Text>
                                    </Card.Header>
                                </Card.Body>
                            </Card>
                        </a>
                        }
                    </Col>
                ))}
                 <div class="footer-copy">
              	<p>&copy; 2020 Election. All rights reserved | Design by <a href="http://elect.com">Elect</a></p>
			</div>
                </>
            );
        }
    }
}
export default PoliticalNews;