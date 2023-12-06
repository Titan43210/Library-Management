import React from 'react'
import './WelcomeBox.css'

function WelcomeBox() {
    return (
        <div className='welcome-box'>
            <p className='welcome-title'>WELCOME TO LIBRARY</p>
            <p className='welcome-message'>The all-in-one platform to browse your favourite books<br/>
            <span className='welcome-submessage'>What are you waiting for? Register Now!</span></p>
        </div>
    )
}

export default WelcomeBox
