import React from 'react';

import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';

import linkedin from '../../../assets/if_linkedin_social_media_3129285.png';
import facebook from '../../../assets/if_facebook_social_media_3129294.png';
import github from '../../../assets/Octocat.png';
import twitter from '../../../assets/if_twitter_social_media_3129254.png';


const SocialLinks = (props) => {

    return (
        <Nav className="float-sm-right">
            <Nav.Item>
                <Nav.Link href="https://www.linkedin.com/in/rhthompson1/" style={{margin: "0px 0px"}}><Image src={linkedin} className="SocialLinks"/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="http://www.twitter.com/rhth1986" style={{margin: "0px 0px"}}><Image src={twitter} className="SocialLinks"/></Nav.Link>
            </Nav.Item>
            <Nav.Item>
                <Nav.Link href="https://www.facebook.com/profile.php?id=100007442145159" style={{margin: "0px 0px"}}><Image src={facebook} className="SocialLinks"/></Nav.Link>
            </Nav.Item>
            <Nav.Item >
                <Nav.Link href="https://www.github.com/BlueEyes360" style={{margin: "0px 0px"}}><Image src={github} className="SocialLinks"/></Nav.Link>
            </Nav.Item>
        </Nav>

    )
}

export default SocialLinks;