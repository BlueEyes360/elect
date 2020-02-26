import React, { Component } from 'react';

import Card from 'react-bootstrap/Card';
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
            images: [],
            state: null,
        }

        this.getImages = this.getImages.bind(this);
    }

    async getImages(result) {
            let url = "https://api.cognitive.microsoft.com/bing/v7.0/images/search?q=" + result.name + "&count=1";
        
            const myHeaders = new Headers({
            'Ocp-Apim-Subscription-Key': MICROSOFT_API_KEY
            });

            const myRequest = new Request(url, {
                method: 'GET',
                headers: myHeaders,
            });

            const response = await fetch(myRequest);
            const json = await response.json();

            setTimeout(() => {this.setState({ images: [...this.state.images, json] })}, 3000)
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
                }, () => {
                    result.value.map(item => 
                        this.getImages(item),
                    );
                })
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
                this.setState({
                    isLoaded: true,
                    error
                }, () => {

                })
            }
        )
    }

    render() {
        let { error, isLoaded, results, images} = this.state;
        console.log(images);
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
                                { images[i] !== undefined && images[i].value[0] !== undefined && <Card.Img variant="top" style={{"height": "250px", "width": "375px", "margin":"10px", "border-radius":"10px"}} src={images[i].value[0].contentUrl} /> }
                                <Card.Body>
                                    <Card.Header className="card_h" style={{"border-style":"solid"}}>
                                        {<Card.Title>{result.name}</Card.Title> }
                                        <Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.description}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.provider.name}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.datePublished}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.ampUrl}</Card.Text>
                                        </Card.Text>
                                    </Card.Header>
                                </Card.Body>
                            </Card>
                        </a>
                        }
                        {result.ampUrl === undefined && result.url !== undefined &&
                        <a href={result.url}>
                            <Card>
                                { result.image !== undefined && <Card.Img variant="top" style={{"height": "250px", "width": "375px", "margin":"10px", "border-radius":"10px"}} src={result.image.thumbnail.contentUrl} /> }
                                <Card.Body>
                                    <Card.Header style={{"border-style":"solid"}}>
                                        {<Card.Title>{result.name}</Card.Title> }
                                        <Card.Text style={{"": "0px"}}>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.description}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.provider.name}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.datePublished}</Card.Text>
                                            <Card.Text style={{"margin-bottom": "0px", "text-align": "justify"}}>{result.ampUrl}</Card.Text>
                                        </Card.Text>
                                    </Card.Header>
                                </Card.Body>
                            </Card>
                        </a>
                        }
                    </Col>
                ))}
                </>
            );
        }
    }
}
export default PoliticalNews;