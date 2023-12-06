import React from 'react'
import './About.css'

function About() {
    return (
        <div className='about-box'>
            <h2 className="about-title">About the Library</h2>
            <div className="about-data">
                <div className="about-img">
                    <img src="./assets/images/library.png" alt="" />
                </div>
                <div>
                    <p className="about-text">
                    Welcome to our Local Library Management System – a sophisticated web application designed to elevate
                    your library experience. Our user-friendly platform offers a comprehensive book catalog, allowing you to
                    explore titles, authors, and genres effortlessly. Whether you're searching for a classic novel or a recent
                    release, our catalog is your gateway to a world of literature.<br/>
                        <br/>
                        For library patrons, the system facilitates easy book reservations and provides a personalized account
                        management interface. Track your borrowing history, manage reservations, and get information about due dates
                        and available books. Our responsive design ensures a seamless experience, whether you're
                        accessing the system from a computer, tablet, or smartphone.<br/>
                        <br/>
                        Add new books, update information, and remove outdated titles with ease. User management tools empower  
                        administrators to oversee accounts, activate or deactivate users, and ensure the smooth operation of the library system.<br/>
                        <br/>
                        Discover the future of library services with our Local Library Management System – where literature meets technology,
                        and the joy of reading is just a click away
                    </p>
                </div>
            </div>
        </div>
    )
}

export default About
