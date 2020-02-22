import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';

import Navigation from './components/Navigation/Navigation';
import ExampleAPI from './containers/ExampleAPI/ExampleAPI';
import Home from './components/Home/Home';
import UpcomingElections from './containers/UpcomingElections/UpcomingElections';
import LocalContests from './containers/LocalContests/LocalContests';
import PollingLocations from './containers/PollingLocations/PollingLocations';
import LocalRepresentatives from './containers/LocalRepresentatives/LocalRepresentatives';

import './App.css';

class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            address: null,
        }
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({address: event.target.value});
    }

    changePage() {
        this.setState({homeActive: false});
    }

    return_data = (data) => {
        this.setState(data);
    }

    render() {
        return (
            <BrowserRouter>
                <div className="App">
                    <Navigation />

                    <Route
                        path="/" exact
                        render={(props) => <Home {...props} return_data={this.return_data}/> }
                    />
                    <Route
                        path="/test"
                        render={(props) => <ExampleAPI {...props} address={this.state.address}/> }
                    />
                    <Route
                        path="/upcomingElections"
                        render={(props) => <UpcomingElections {...props} address={this.state.address} /> }
                    />
                    <Route
                        path="/localContests"
                        render={(props) => <LocalContests {...props} address={this.state.address}/> }
                    />
                    <Route
                        path="/pollingLocations"
                        render={(props) => <PollingLocations {...props} address={this.state.address}/> }
                    />
                    <Route
                        path="/localRepresentatives"
                        render={(props) => <LocalRepresentatives {...props} address={this.state.address}/> }
                    />
                </div>
            </BrowserRouter>
        );

    }

}

export default App;
