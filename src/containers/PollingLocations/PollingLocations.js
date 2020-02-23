import React, { Component } from "react";

import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import { StaticGoogleMap, Marker, Path } from "react-static-google-map";

import { GOOGLE_CIVIC_API_KEY } from "../../API_keys";
import { GOOGLE_MAPS_API_KEY } from "../../API_keys";
import { GOOGLE_GEOCODING_API_KEY } from "../../API_keys";

class PollingLocations extends Component {
    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            pollingLocations: null,
            address: null,
            latlong: "6.4488387,3.5496361",
            zoom: "4",
            center: "Lebanon,Kansas",
            noPollingLocs: false
        };
    }

componentDidMount() {
    let address = "1900 Stevens Dr. Richland WA";

    if (this.props.address !== null) {
        address = this.props.address
    }

    let url = "https://www.googleapis.com/civicinfo/v2/voterinfo?key=" + GOOGLE_CIVIC_API_KEY + "&address=" + address.replace(" ", "%20") + "&electionId=2000"

    fetch(url)
    .then(res => res.json())
    .then(
        (result) => {
            if (result["pollingLocations"] === undefined) {
                this.setState({
                    isLoaded: true,
                    noPollingLocs: true
                });
            } else {
                this.setState({
                    isLoaded: true,
                    pollingLocations: result["pollingLocations"],
                });
            }
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

    async Geocoding(loc) {
        let address = loc.address.line1.split(" ").join("+") + "," + loc.address.city + "," + loc.address.state;

        let url = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=" + GOOGLE_GEOCODING_API_KEY;

        const result = await fetch(url);
        const json = await result.json();

        let centerTemp = loc.address.city + "," + loc.address.state;
        let latLong = json.results[0].geometry.location.lat.toString() + "," + json.results[0].geometry.location.lng.toString();
        this.setState({ zoom: "12" });
        this.setState({ center: centerTemp });
        this.setState({ latlong: latLong });
    }

    render() {
        const { error, isLoaded, pollingLocations, noPollingLocs } = this.state;
        if (error) {
            return <div>Error: {error.message}</div>;
        } else if (!isLoaded) {
            return <div>Loading...</div>;
        } else if (noPollingLocs) {
            return <Col xs="12" xl="12">
                    <Card>
                        <Card.Title>No Locations Found</Card.Title>
                        <Card.Subtitle>Google Civic API failed to return locations</Card.Subtitle>
                    </Card>
                </Col>;
        } else {
            return (
                <>
                    <div>
                        <StaticGoogleMap 
                            center={this.state.center}
                            zoom={this.state.zoom}
                            size="600x600"
                            maptype="roadmap"
                            className="PollingLocations"
                            apiKey={GOOGLE_MAPS_API_KEY}
                        >
                        <Marker location={this.state.latlong} color="red" label="P" />
                        </StaticGoogleMap>
                    </div>
                    {pollingLocations.map((loc, i) => (
                        <Col xs={12} xl={12}>
                            <Card onClick={() => this.Geocoding(loc)}>
                                <Card.Body>
                                <Card.Header>
                                    <Card.Title>{loc.address.locationName}</Card.Title>
                                    <Card.Subtitle>{loc.address.line1}</Card.Subtitle>
                                    <Card.Text>
                                    {loc.address.city && loc.address.state && loc.address.zip}
                                    </Card.Text>
                                </Card.Header>
                                <Card.Text>
                                    <Card.Text>{loc.pollingHours}</Card.Text>
                                    <Card.Text>{loc.notes}</Card.Text>
                                </Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </>
            );
        }
    }
}
export default PollingLocations;