import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';

import {MICROSOFT_API_KEY} from '../../../API_keys';

class LocalRepNews extends Component {

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
        let q = "Bernie Sanders"

        if (this.props.name !== undefined)
        {
            q = this.props.name
        }

        let count = "3"
        let offset = "0"
        let mkt = "en-US"
        let safeSearch = "moderate"
        let url = "https://api.cognitive.microsoft.com/bing/v7.0/news/search?" + q.replace(" ", "%20") + "&q=" + q + "&mkt=" + mkt + "&count=" +count + "&offset=" + offset + "&safeSearch=" + safeSearch
        
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
                    <Card className="card_layout">
                        {result.image !== undefined && result.image.thumbnail !== undefined && <Card.Img variant="top" src={result.image.thumbnail.contentUrl} /> }
                            <Card.Body>
                                <Card.Header>
                                    {<Card.Title style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{result.name}</Card.Title> }
                                <Card.Text>
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{result.description}</Card.Text>
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{result.provider.name}</Card.Text>
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}>{result.datePublished}</Card.Text>
                                    <Card.Text style={{"fontFamily": "Times New Roman, Times, serif !important", "margin": "0px !important"}}><a href={result.url}>{result.url}</a></Card.Text>
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

export default LocalRepNews;