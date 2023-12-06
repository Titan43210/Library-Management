import React from 'react'
import './Footer.css'

import TwitterIcon from '@material-ui/icons/Twitter';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';

function Footer() {
    return (
        <div className='footer'>
            <div>
                <div className='footer-data'>
                    <div className="contact-details">
                        <h1><b>Contact Us</b></h1>
                        <p>Admin</p>
                        <p>Adress:</p>
                        <p>xyz city</p>
                        <p>abc state</p>
                        <p><b>Email:</b>example@gmail.com</p>
                    </div>
                    <div className='librarian-details'>
                        <h1><b>Librarian</b></h1>
                        <p>Name</p>
                        <p>Education</p>
                        <p>Contact: +91 0123456789</p>
                    </div>
                </div>
                <div className="contact-social" >
                    <a href='https://twitter.com/AnkurGupta3107' className='social-icon'><TwitterIcon style={{ fontSize: 40,color:"wheat"}} /></a>
                    <a href='https://www.linkedin.com/in/ankur-gupta-iiitl/' className='social-icon'><LinkedInIcon style={{ fontSize: 40,color:"wheat"}} /></a>
                    <a href='https://github.com/titan43210/' className='social-icon'><GitHubIcon style={{ fontSize: 40,color:"wheat"}} /></a>
                </div>
            </div>
            <div className='copyright-details'>
                <p className='footer-copyright'>&#169; 2023 copyright all right reserved<br /><span>Made by Ankur Gupta</span></p>
            </div>
        </div>
    )
}

export default Footer