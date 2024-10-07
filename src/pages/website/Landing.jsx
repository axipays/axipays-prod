import React, { useState } from "react";
import { Link } from "react-router-dom";

import "../styles/website.css"

// Import Files
import Service from "./Services"
import Feature from "./Features";
import Contact from "./Contact";
import Footer from "./Footer";

// icons images
import Company_Logo_short from "../media/image/companyLogo_short.png";
import Right_arrow from "../media/image/right-arrow.png";
import down from "../media/icon/down.png";

import card1 from "../media/image/card1.png";
import card2 from "../media/image/card2.png";
import card3 from "../media/image/card3.png";
import card4 from "../media/image/card4.png";
import card5 from "../media/image/card5lines.gif";

const Landing_Page = () => {
  const [selectedHeader, setSelectedHeader] = useState("home");

  const handleNavClick = (selected) => {
    setSelectedHeader(selected);
  };

  return (
    <div id="body">
      {/* Header Section */}
      <section id="header">
        <div className="header">
          <div className="company_Name">
            <img
              className="company_logo"
              src={Company_Logo_short}
              alt="Axipays brand logo"
            />
            <h3>AxiPays</h3>
          </div>
          <div className="nav">
            <ul>
              {["home", "pricing", "services", "features", "blog", "contact"].map(
                (item) => (
                  <li
                    key={item}
                    className={`${selectedHeader === item ? "active" : ""} ${
                      item === "pricing" ? "pricing-active" : ""
                    }`}
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
              <Link to="/login">Login</Link>
            </button>
            <button className="signup_auth_btn">Sign up</button>
          </div>
        </div>
      </section>

      {/* Landing Page Section */}
      <section id="landingpage">
        <div className="landingpage full_page">
          <div className="countainer">
            <div className="notify-line">
              <div className="outline">
                <p>
                  Connect us to redefine payments - Discover more{" "}
                  <img
                    src={Right_arrow}
                    alt="right arrow icon"
                    className="icon spcl_icon"
                  />
                </p>
              </div>
            </div>
            <div className="main_heading">
              <h1>Connect your business across borders</h1>
              <p>
                With our cutting-edge global payment gateway, you can seamlessly
                process transactions worldwide. <br />
                Expand your reach and offer secure, reliable card payment
                solutions to your business partners across the globe.
              </p>
            </div>
          </div>
          <div className="landingpage-infograph-countainer">
            <img src={card1} alt="card1" className="card1" />
            <img src={card2} alt="card2" className="card2" />
            <img src={card3} alt="card3" className="card3" />
            <img src={card4} alt="card4" className="card4" />
            <img src={card5} alt="card5" className="card5" />
            <div className="card5-text">
              <div className="card5-header">
                <p className="card5-header-first">Text</p>
                <p className="card5-header-second">Aug 2024</p>
                <p className="card5-header-third">
                  Last 28 days <img src={down} alt="down arrow" />
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
        </div>
      </section>

      {/* Service Section */}
      <Service />

      {/* Feature Section */}
      <Feature />

      {/* Blog Section */}
      <section id="blog">
        <div className="blog full_page"></div>
      </section>

      {/* Contact Section */}
      <Contact />

      {/* Footer Section */}
      <Footer />
    </div>
  );
};

export default Landing_Page;
