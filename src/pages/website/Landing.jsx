import React, { useState,useEffect} from "react";
import { Link } from "react-router-dom";

// css
import "../../styles/pages.css"

// Website Pages
import Service from "./Services.jsx"
import Feature from "./Features.jsx";
import Contact from "./Contact.jsx";
import Footer from "./Footer.jsx";

//icons
import Icon from "../../media/icon/icons.jsx";

//icon-images
import Company_Logo_short from "../../media/image/companyLogo_short.webp";
import card1 from "../../media/image/card1.webp";
import card2 from "../../media/image/card2.webp";
import card3 from "../../media/image/card3.webp";
import card4 from "../../media/image/card4.webp";
import card5 from "../../media/image/card5lines.webp";

const Landing_Page = () => {
    const [selectedHeader, setSelectedHeader] = useState("home");
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
    const [isHovered, setIsHovered] = useState(false);
    const [isAnimating, setIsAnimating] = useState(false);
    const [borderAngle, setBorderAngle] = useState('0.5turn');

    const handleMouseEnter = () => {
        setIsHovered(true);
        setIsAnimating(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        
        const element = document.querySelector('.notify-line');
        const currentAngle = getComputedStyle(element).getPropertyValue('--border-angle');
        setBorderAngle(currentAngle.trim());

        element.classList.add('animate-end');

        element.addEventListener('animationend', handleAnimationEnd, { once: true });
    };

    const handleAnimationEnd = (event) => {
        if (event.animationName === 'rotateGradientBorderEnd') {
            setIsAnimating(false);
        }
    };

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
            setIsMenuOpen(false); 
        };
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const handleNavClick = (selected) => {
        setSelectedHeader(selected);
        setIsMenuOpen(false); 
    };

    return (
        <div className="Website">
            {/* Header Section */}
            {isMobile ? (
                <div className="mobile-header">
                    <div className="moblie-header-head">
                    <div className="mobile-header-left">
                        <img src={Company_Logo_short} alt="Axipays logo" className="company_logo" />
                    </div>
                    <button
                        className="menu-icon"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                    <Icon
                        name="close_fill"  
                        width={20}
                        height={20}
                        color="#ffffff"
                    />
                ) : (
                    <Icon
                        name="menu_open" 
                        width={20}
                        height={20}
                        color="#ffffff"
                    />
                )}
                    </button>
                    </div>
                </div>
            ) : (
                <section id="website_header">
                    <div className="website_header">
                        <div className="company_Name">
                            <img
                                className="company_logo"
                                src={Company_Logo_short}
                                alt="Axipays brand logo"
                            />
                            <h3>Axipays</h3>
                        </div>
                        <div className="nav">
                            <ul>
                                {["home", "pricing", "services", "features", "blog", "contact"].map(
                                    (item) => (
                                        <li
                                            key={item}
                                            className={`${selectedHeader === item ? "active" : ""}`}
                                            onClick={() => handleNavClick(item)}
                                        >
                                            {item.charAt(0).toUpperCase() + item.slice(1)}
                                        </li>
                                    )
                                )}
                            </ul>
                        </div>
                        <div className="auth_btns">
                            <button className="login_auth_btn">
                                <Link to="/auth">Login</Link>
                            </button>
                            <button className="signup_auth_btn">Sign up</button>
                        </div>
                    </div>
                </section>
            )}

            {/* Slide-In Menu for Mobile */}
            {isMobile && isMenuOpen && (
                <div className="slide-menu">
                    <ul>
                        {["home", "pricing", "services", "features", "blog", "contact"].map(
                            (item) => (
                                <li
                                    key={item}
                                    className={`${selectedHeader === item ? "active" : ""}`}
                                    onClick={() => handleNavClick(item)}
                                >
                                    {item.charAt(0).toUpperCase() + item.slice(1)}
                                </li>
                            )
                        )}
                    </ul>
                    <div className="auth_btns">
                        <button className="login_auth_btn">
                            <Link to="/login">Login</Link>
                        </button>
                        <button className="signup_auth_btn">Sign up</button>
                    </div>
                </div>
            )}


            {/* Landing Page Section */}
            <section id="landingpage">
                <div className="landingpage full_page">
                    <div className="countainer">
                        <div  className={`notify-line ${isHovered || isAnimating ? 'hover' : ''} ${!isHovered && isAnimating ? 'animate-end' : ''}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        style={{ '--current-angle': borderAngle }}>
                            <div className="outline">
                                <p>
                                    Connect us to redefine payments - Discover more{" "}
                                    <Icon
                                        name="arrow_right"
                                        width={25}
                                        height={25}
                                        color="white"

                                    // src={Right_arrow}
                                    // alt="right arrow icon"
                                    // className="icon spcl_icon"
                                    />
                                </p>
                            </div>
                        </div>
                        <div className="main_heading">
                            {/* <h1>Connect your business across borders</h1> */}
                            <h1>Your Global Payment Processor</h1>
                            <p>
                                With our cutting-edge global payment gateway, you can seamlessly
                                process transactions worldwide. <br />
                                Expand your reach and offer secure, reliable card payment
                                solutions to your business partners across the globe.
                            </p>
                            <img src={card3} alt="card3" className="landingpage-card3" />
                        </div>
                    </div>
                    
                    <div className="landingpage-infograph-countainer">
    
                        <div className="first-card">
                            <img src={card5} alt="card5" className="landingpage-card5" />
                            <div className="card5-text">
                                <div className="card5-header">
                                    <p className="card5-header-first">Text</p>
                                    <p className="card5-header-second">Aug 2024</p>
                                    <p className="card5-header-third">
                                        Last 28 days <Icon
                                            name="arrow_down"
                                            width={25}
                                            height={25}
                                            color="white"
                                            className="last28daysarrow"
                                        />
                                    </p>
                                </div>
                                <div className="card5-body">
                                    <p>52K</p>
                                </div>
                                <div className="card5-footer">
                                    <p>Marketing campaign effectiveness</p>
                                </div>
                            </div>
                        </div>
                        <div className="second-card">
                            <img src={card1} alt="card1" className="landingpage-card1" />
                            <img src={card2} alt="card2" className="landingpage-card2" />
                        </div>
                        <div className="third-card">    <img src={card4} alt="card4" className="landingpage-card4" /></div>
                
                    </div>
                </div>
            </section>

            {/* Service Section */}
            <Service />

            {/* Feature Section */}
            <Feature />

            {/* Blog Section */}
            {/* <section id="blog">
                <div className="blog full_page"></div>
            </section> */}

            {/* Contact Section */}
            <Contact />

            {/* Footer Section */}
            <Footer />
        </div>
    );
};

export default Landing_Page;