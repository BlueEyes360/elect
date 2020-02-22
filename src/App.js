import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';

import Navigation from './components/Navigation/Navigation';
import ExampleAPI from './containers/ExampleAPI/ExampleAPI';
import Home from './components/Home/Home';
import UpcomingElections from './containers/UpcomingElections/UpcomingElections';
import LocalContests from './containers/LocalContests/LocalContests';
import PollingLocations from './containers/PollingLocations/PollingLocations';
import LocalRepresentatives from './containers/LocalRepresentatives/LocalRepresentatives';

import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="App">
                <Navigation />
                <Route path="/" exact component={Home} />
                <Route path="/test" component={ExampleAPI} />
                <Route path="/upcomingElections" component={UpcomingElections} />
                <Route path="/localContests" component={LocalContests} />
                <Route path="/pollingLocations" component={PollingLocations} />
                <Route path="/localRepresentatives" component={LocalRepresentatives} />
            </div>
        </BrowserRouter>
    );

}

export default App;
