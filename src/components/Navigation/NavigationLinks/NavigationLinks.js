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
                <NavLink to="/localContests">Local Contests</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/pollingLocations">Polling Locations</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/localRepresentatives">Local Representatives</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/senate">Current Senate Members</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/houseOfReps">Current House Members</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/houseCommittees">House Committees and Members</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/senateCommittees">Senate Committees and Members</NavLink>
            </Nav.Item>
            <Nav.Item>
                <NavLink to="/jointCommittees">Join Committees and Members</NavLink>
            </Nav.Item>
        </Nav>
    )
}

export default NavigationLinks;