import React from 'react';

import Navbar from 'react-bootstrap/Navbar';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownMenu from 'react-bootstrap/DropdownMenu';
import DropdownItem from 'react-bootstrap/DropdownItem';
import DropdownToggle from 'react-bootstrap/DropdownToggle';

import NavLink from 'react-router-dom/NavLink';

import MediaQuery from 'react-responsive';

import NavigationLinks from './NavigationLinks/NavigationLinks';

import star from '../../assets/election_logo.png';

import './Navigation.css';


const Navigation = (props) => {

    return (
        <Navbar id="main_div" bg="dark" variant="dark">
            <MediaQuery query="(max-device-width: 500px)">
            <Navbar.Brand href="/" className="ml-auto">
                    <img alt="" src={star} 
                        className="d-inline-block align-top"
                        id="brand"
                    />
                  <p>{' ELECT'}</p>  
                </Navbar.Brand>
                <Dropdown>
                    <DropdownToggle id="main_div" variant="dark">Menu</DropdownToggle>
                    <DropdownMenu alignRight className="DropMenu">
                        <DropdownItem>
                            <NavLink exact to="/">Home</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink to="/upcomingElections">Upcoming Elections</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink to="/localContests">Local Contests</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink to="/pollingLocations">Polling Locations</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink to="/localRepresentatives">Local Representatives</NavLink>
                        </DropdownItem>
                        <DropdownItem>
                            <NavLink to="/test">Test</NavLink>
                        </DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                
            </MediaQuery>
            <MediaQuery query="(min-device-width: 500px)">
                <Navbar.Brand href="/">
                    <img alt="" src={star} 
                        className="d-inline-block align-top"
                        id="brand"
                    />
                  <p>{' ELECT'}</p>
                </Navbar.Brand>
                <NavigationLinks />
                {/* <SocialLinks /> */}
            </MediaQuery>
        </Navbar>
    )
}

export default Navigation;