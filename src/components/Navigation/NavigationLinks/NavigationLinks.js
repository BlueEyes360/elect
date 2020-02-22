import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { NavLink } from 'react-router-dom';


const NavigationLinks = (props) => {

    return (
        <Nav className="mx-auto">
            <Nav.Item>
                <NavLink exact to="/">Home</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/upcomingElections">Upcoming Elections</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/localContests">Local Contests</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/pollingLocations">Polling Locations</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/localRepresentatives">Local Representatives</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/test">Test</NavLink>
            </Nav.Item>
        </Nav>
    )
}

export default NavigationLinks;