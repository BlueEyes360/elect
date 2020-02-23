import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import Home from './components/Home/Home';
import ExampleAPI from './containers/ExampleAPI/ExampleAPI';
import UpcomingElections from './containers/UpcomingElections/UpcomingElections';
import LocalContests from './containers/LocalContests/LocalContests';
import PollingLocations from './containers/PollingLocations/PollingLocations';
import LocalRepresentatives from './containers/LocalRepresentatives/LocalRepresentatives';
import PoliticalNews from './containers/PoliticalNews/PoliticalNews';
import HouseMembers from './containers/HouseMembers/HouseMembers';
import SenateMembers from './containers/SenateMembers/SenateMembers';
import HouseCommittees from './containers/Committees/HouseCommittees';
import SenateCommittees from './containers/Committees/SenateCommittees';
import JointCommittees from './containers/Committees/JointCommittees';


import './App.css';
class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            error: null,
            isLoaded: false,
            address: null,
        }
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
                    <Route
                        path="/politicalNews"
                        render={(props) => <PoliticalNews {...props}/> }
                    />
                    <Route
                        path="/senate"
                        render={(props) => <SenateMembers {...props}/> }
                    />
                    <Route
                        path="/houseOfReps"
                        render={(props) => <HouseMembers {...props}/> }
                    />
                    <Route
                        path="/houseCommittees"
                        render={(props) => <HouseCommittees {...props}/> }
                    />
                    <Route
                        path="/senateCommittees"
                        render={(props) => <SenateCommittees {...props}/> }
                    />
                    <Route
                        path="/jointCommittees"
                        render={(props) => <JointCommittees {...props}/> }
                    />

                </div>
            </BrowserRouter>
        );

    }

}

export default App;
